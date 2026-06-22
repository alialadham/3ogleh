const http = require("http");
const fs = require("fs");
const path = require("path");

const root = __dirname;
const port = Number(process.env.PORT || 3000);

const routes = {
  "/": "index.html",
  "/products": "index.html",
  "/shop": "index.html",
  "/cart": "cart.html",
  "/checkout": "checkout.html",
  "/about": "about.html",
  "/confirmation": "confirmation.html",
};

const contentTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
};

const publicConfig = {
  ownerPhone: process.env.NEXT_PUBLIC_OWNER_PHONE || "",
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "",
  cliqAliasOrNumber: process.env.NEXT_PUBLIC_CLIQ_ALIAS_OR_NUMBER || "",
  instagramUrl: process.env.NEXT_PUBLIC_INSTAGRAM_URL || "",
};

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url || "/", `http://${req.headers.host}`);

  if (req.method === "GET" && url.pathname === "/config.js") {
    send(res, 200, "application/javascript; charset=utf-8", `window.THREEOGLEH_CONFIG = ${JSON.stringify(publicConfig)};`);
    return;
  }

  if (req.method === "POST" && url.pathname === "/api/checkout") {
    await handleCheckout(req, res);
    return;
  }

  if (req.method !== "GET" && req.method !== "HEAD") {
    send(res, 405, "text/plain; charset=utf-8", "Method not allowed");
    return;
  }

  const fileName = routes[url.pathname] || decodeURIComponent(url.pathname.slice(1));
  const staticRoot = url.pathname.startsWith("/images/") ? path.join(root, "public") : root;
  const filePath = path.normalize(path.join(staticRoot, fileName));

  if (!filePath.startsWith(staticRoot)) {
    send(res, 403, "text/plain; charset=utf-8", "Forbidden");
    return;
  }

  fs.readFile(filePath, (error, data) => {
    if (error) {
      send(res, 404, "text/plain; charset=utf-8", "Not found");
      return;
    }

    if (req.method === "HEAD") {
      send(res, 200, contentTypes[path.extname(filePath)] || "application/octet-stream", "");
      return;
    }

    send(res, 200, contentTypes[path.extname(filePath)] || "application/octet-stream", data);
  });
});

async function handleCheckout(req, res) {
  try {
    const body = await readJSON(req);
    const order = normalizeOrder(body);
    const emailStatus = await sendOrderEmails(order);

    send(res, 200, "application/json; charset=utf-8", JSON.stringify({
      ok: true,
      orderCode: order.orderCode,
      emailStatus,
    }));
  } catch (error) {
    send(res, 400, "application/json; charset=utf-8", JSON.stringify({
      ok: false,
      message: error.message || "Checkout failed",
    }));
  }
}

function readJSON(req) {
  return new Promise((resolve, reject) => {
    let raw = "";
    req.on("data", (chunk) => {
      raw += chunk;
      if (raw.length > 1_000_000) {
        reject(new Error("Request too large"));
        req.destroy();
      }
    });
    req.on("end", () => {
      try {
        resolve(JSON.parse(raw || "{}"));
      } catch {
        reject(new Error("Invalid JSON"));
      }
    });
    req.on("error", reject);
  });
}

function normalizeOrder(body) {
  const required = ["fullName", "email", "phone", "billingAddress", "installationAddress", "preferredDate", "preferredTime"];
  for (const key of required) {
    if (!String(body.customer?.[key] || "").trim()) {
      throw new Error(`Missing ${key}`);
    }
  }

  if (!Array.isArray(body.items) || body.items.length === 0) {
    throw new Error("Cart is empty");
  }

  return {
    orderCode: String(body.orderCode || "").trim() || generateOrderCode(),
    createdAt: new Date().toISOString(),
    customer: body.customer,
    items: body.items,
    total: Number(body.total || 0),
    paymentMethod: "CliQ",
    cliqAliasOrNumber: publicConfig.cliqAliasOrNumber,
  };
}

// Unique enough for demo checkout without a database. Supabase can later enforce collision checks permanently.
function generateOrderCode() {
  const stamp = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const random = Math.random().toString(36).slice(2, 7).toUpperCase();
  return `3OG-${stamp}-${random}`;
}

async function sendOrderEmails(order) {
  const { RESEND_API_KEY, EMAIL_FROM, OWNER_EMAIL } = process.env;
  if (!RESEND_API_KEY || !EMAIL_FROM || !OWNER_EMAIL) {
    return {
      configured: false,
      message: "Email sending is not configured yet. Order completed in demo mode.",
    };
  }

  try {
    const customerEmail = buildCustomerEmail(order);
    const ownerEmail = buildOwnerEmail(order);
    const [customerResult, ownerResult] = await Promise.all([
      sendResendEmail({
        from: EMAIL_FROM,
        to: order.customer.email,
        subject: `3ogleh order ${order.orderCode}`,
        html: customerEmail,
      }),
      sendResendEmail({
        from: EMAIL_FROM,
        to: OWNER_EMAIL,
        subject: `New 3ogleh order ${order.orderCode}`,
        html: ownerEmail,
      }),
    ]);

    return {
      configured: true,
      customerEmail: customerResult.ok,
      ownerEmail: ownerResult.ok,
      message: customerResult.ok && ownerResult.ok
        ? "Confirmation emails sent."
        : "Order completed, but one or more emails failed to send.",
    };
  } catch {
    return {
      configured: true,
      customerEmail: false,
      ownerEmail: false,
      message: "Order completed, but email delivery failed.",
    };
  }
}

async function sendResendEmail(payload) {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  return { ok: response.ok, status: response.status };
}

function buildCustomerEmail(order) {
  return emailLayout(`
    <h1>Thank you, ${escapeHTML(order.customer.fullName)}</h1>
    <p>Your 3ogleh order has been received.</p>
    <p><strong>Order code:</strong> ${escapeHTML(order.orderCode)}</p>
    ${orderItemsHTML(order)}
    <p><strong>Total:</strong> ${formatMoney(order.total)}</p>
    <p><strong>CliQ payment:</strong> Use ${escapeHTML(order.cliqAliasOrNumber || "the CliQ details provided by 3ogleh")} to pay. Please include ${escapeHTML(order.orderCode)} in the transfer note.</p>
    <p><strong>Billing address:</strong> ${escapeHTML(order.customer.billingAddress)}</p>
    <p><strong>Installation address:</strong> ${escapeHTML(order.customer.installationAddress)}</p>
    <p><strong>Preferred installation:</strong> ${escapeHTML(order.customer.preferredDate)} at ${escapeHTML(order.customer.preferredTime)}</p>
    <p><strong>Phone:</strong> ${escapeHTML(order.customer.phone)}</p>
    <p><strong>WhatsApp/contact:</strong> ${escapeHTML(publicConfig.whatsappNumber || publicConfig.ownerPhone || "3ogleh support")}</p>
  `);
}

function buildOwnerEmail(order) {
  return emailLayout(`
    <h1>New order alert</h1>
    <p><strong>Order code:</strong> ${escapeHTML(order.orderCode)}</p>
    <p><strong>Customer:</strong> ${escapeHTML(order.customer.fullName)}</p>
    <p><strong>Email:</strong> ${escapeHTML(order.customer.email)}</p>
    <p><strong>Phone:</strong> ${escapeHTML(order.customer.phone)}</p>
    <p><strong>Billing address:</strong> ${escapeHTML(order.customer.billingAddress)}</p>
    <p><strong>Installation address:</strong> ${escapeHTML(order.customer.installationAddress)}</p>
    <p><strong>Preferred installation:</strong> ${escapeHTML(order.customer.preferredDate)} at ${escapeHTML(order.customer.preferredTime)}</p>
    ${orderItemsHTML(order)}
    <p><strong>Total:</strong> ${formatMoney(order.total)}</p>
    <p><strong>Order notes:</strong> ${escapeHTML(order.customer.notes || "None")}</p>
    <p><strong>Timestamp:</strong> ${escapeHTML(order.createdAt)}</p>
  `);
}

function orderItemsHTML(order) {
  const rows = order.items.map((item) => `
    <tr>
      <td>${escapeHTML(item.name)}</td>
      <td>${escapeHTML(item.options || "-")}</td>
      <td>${escapeHTML(String(item.quantity))}</td>
      <td>${formatMoney(item.lineTotal)}</td>
    </tr>
  `).join("");

  return `
    <table cellpadding="8" cellspacing="0" border="1" style="border-collapse:collapse;border-color:#ddd;width:100%;margin:18px 0;">
      <thead><tr><th align="left">Product</th><th align="left">Options</th><th align="left">Qty</th><th align="left">Total</th></tr></thead>
      <tbody>${rows}</tbody>
    </table>
  `;
}

function emailLayout(content) {
  return `
    <div style="font-family:Arial,sans-serif;color:#111;line-height:1.5;max-width:720px;margin:auto;">
      ${content}
      <p style="color:#555;margin-top:28px;">3ogleh | عقلة</p>
    </div>
  `;
}

function formatMoney(value) {
  return `${Number(value || 0).toLocaleString("en-US", { maximumFractionDigits: 2 })} JOD`;
}

function escapeHTML(value) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function send(res, status, type, body) {
  res.writeHead(status, { "Content-Type": type });
  res.end(body);
}

server.listen(port, () => {
  console.log(`3ogleh site running at http://127.0.0.1:${port}`);
});
