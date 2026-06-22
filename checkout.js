const CHECKOUT_CART_KEY = "3ogleh.cart";
const LAST_ORDER_KEY = "3ogleh.lastOrder";

document.addEventListener("DOMContentLoaded", () => {
  setupCheckout();
  updateCheckoutLinks();
});

function setupCheckout() {
  const form = document.getElementById("checkoutForm");
  const cliqPanel = document.getElementById("cliqPanel");
  const cliqValue = document.getElementById("cliqValue");
  const orderCodeField = document.getElementById("orderCode");
  const status = document.getElementById("checkoutStatus");

  if (!form || !cliqPanel || !cliqValue || !orderCodeField) return;

  const orderCode = generateOrderCode();
  orderCodeField.textContent = orderCode;
  renderCheckoutSummary(orderCode);

  const cliq = window.THREEOGLEH_CONFIG?.cliqAliasOrNumber || "";
  cliqValue.textContent = cliq || "CliQ details will be provided soon.";
  document.getElementById("cliqInstruction").textContent = cliq
    ? "Use this CliQ number/alias to pay. Please include your order code in the transfer note."
    : "CliQ details will be provided soon.";
  cliqPanel.hidden = false;

  document.querySelector(".payment-choice")?.addEventListener("click", () => {
    cliqPanel.hidden = false;
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    status.textContent = "";

    const items = checkoutItems();
    if (!items.length) {
      status.textContent = "Your cart is empty.";
      return;
    }

    if (!form.reportValidity()) return;

    const payload = buildCheckoutPayload(form, items, orderCode);
    setSubmitState(true);

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      if (!response.ok || !result.ok) throw new Error(result.message || "Checkout failed");

      const order = {
        ...payload,
        orderCode: result.orderCode,
        emailStatus: result.emailStatus,
        createdAt: new Date().toISOString(),
      };
      sessionStorage.setItem(LAST_ORDER_KEY, JSON.stringify(order));
      localStorage.removeItem(CHECKOUT_CART_KEY);
      window.updateCartBadge?.();
      window.location.href = `/confirmation?code=${encodeURIComponent(result.orderCode)}`;
    } catch (error) {
      status.textContent = error.message || "Checkout failed. Please try again.";
      setSubmitState(false);
    }
  });
}

function buildCheckoutPayload(form, items, orderCode) {
  const data = new FormData(form);
  return {
    orderCode,
    paymentMethod: "CliQ",
    customer: {
      fullName: String(data.get("fullName") || "").trim(),
      email: String(data.get("email") || "").trim(),
      phone: String(data.get("phone") || "").trim(),
      billingAddress: String(data.get("billingAddress") || "").trim(),
      installationAddress: String(data.get("installationAddress") || "").trim(),
      preferredDate: String(data.get("preferredDate") || "").trim(),
      preferredTime: String(data.get("preferredTime") || "").trim(),
      notes: String(data.get("notes") || "").trim(),
    },
    items: items.map(emailLineItem),
    total: checkoutTotal(items),
  };
}

function renderCheckoutSummary(orderCode) {
  const list = document.getElementById("checkoutSummary");
  const total = document.getElementById("checkoutTotal");
  const instruction = document.getElementById("cliqInstruction");
  const items = checkoutItems();

  if (!list || !total || !instruction) return;

  if (!items.length) {
    list.innerHTML = `<p class="empty-note">Your cart is empty.</p>`;
    total.textContent = formatMoney(0);
    return;
  }

  list.innerHTML = items.map((item) => {
    const product = findProduct(item.productId);
    if (!product) return "";
    return `
      <div class="summary-row">
        <span>${escapeHTML(product.name)} <small>${escapeHTML(itemOptions(item))}</small></span>
        <strong>${formatMoney(lineTotal(item))}</strong>
      </div>
    `;
  }).join("");

  total.textContent = formatMoney(checkoutTotal(items));
  if (window.THREEOGLEH_CONFIG?.cliqAliasOrNumber) {
    instruction.textContent = `Use this CliQ number/alias to pay. Please include your order code in the transfer note: ${orderCode}`;
  }
}

function emailLineItem(item) {
  const product = findProduct(item.productId);
  return {
    productId: item.productId,
    name: product?.name || item.productId,
    options: itemOptions(item),
    quantity: Number(item.quantity || 1),
    lineTotal: lineTotal(item),
  };
}

// Unique enough for frontend/server demo checkout. A database can later enforce permanent collision prevention.
function generateOrderCode() {
  const stamp = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const random = Math.random().toString(36).slice(2, 7).toUpperCase();
  return `3OG-${stamp}-${random}`;
}

function checkoutItems() {
  try {
    return JSON.parse(localStorage.getItem(CHECKOUT_CART_KEY) || "[]");
  } catch {
    return [];
  }
}

function findProduct(id) {
  return (window.THREEOGLEH_PRODUCTS || []).find((product) => product.id === id);
}

function lineTotal(item) {
  const product = findProduct(item.productId);
  if (!product) return 0;
  const quantity = Number(item.quantity || 1);
  const weight = Number(item.weight || product.defaults?.weight || 1);
  if (product.unit === "kg") return product.price * weight * quantity;
  if (product.unit === "m2") return product.price * Number(item.area || 1) * quantity;
  return product.price * quantity;
}

function checkoutTotal(items = checkoutItems()) {
  return items.reduce((sum, item) => sum + lineTotal(item), 0);
}

function itemOptions(item) {
  const product = findProduct(item.productId);
  const color = colorName(item.color || "black");
  const parts = [`Color: ${color}`];
  if (product?.unit === "kg") parts.push(`Weight: ${item.weight || product.defaults?.weight || 10}kg`);
  if (product?.unit === "m2") parts.push(`Area: ${item.area || 1}m²`);
  return parts.join(" · ");
}

function colorName(id) {
  const color = (window.THREEOGLEH_COLORS || []).find((entry) => entry.id === id);
  return color ? color.name : id;
}

function setSubmitState(isSubmitting) {
  const button = document.querySelector("#checkoutForm button[type='submit']");
  if (!button) return;
  button.disabled = isSubmitting;
  button.textContent = isSubmitting ? "Placing order..." : "Place order";
}

function updateCheckoutLinks() {
  const config = window.THREEOGLEH_CONFIG || {};
  const whatsapp = config.whatsappNumber || "962798125254";
  document.querySelectorAll("[data-whatsapp-link]").forEach((link) => {
    link.href = `https://wa.me/${whatsapp}`;
  });
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
