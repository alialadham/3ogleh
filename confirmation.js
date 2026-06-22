const CONFIRMATION_KEY = "3ogleh.lastOrder";

document.addEventListener("DOMContentLoaded", () => {
  const order = readLastOrder();
  const code = new URLSearchParams(window.location.search).get("code") || order?.orderCode || "";

  document.getElementById("confirmationCode").textContent = code || "Order received";

  const emailStatus = document.getElementById("emailStatus");
  if (emailStatus) {
    emailStatus.textContent = order?.emailStatus?.message || "Email sending is not configured yet. Order completed in demo mode.";
  }

  const details = document.getElementById("confirmationDetails");
  if (details && order?.customer) {
    details.innerHTML = `
      <div class="summary-row"><span>Customer</span><strong>${escapeHTML(order.customer.fullName)}</strong></div>
      <div class="summary-row"><span>Billing address</span><strong>${escapeHTML(order.customer.billingAddress)}</strong></div>
      <div class="summary-row"><span>Installation address</span><strong>${escapeHTML(order.customer.installationAddress)}</strong></div>
      <div class="summary-row"><span>Installation time</span><strong>${escapeHTML(order.customer.preferredDate)} · ${escapeHTML(order.customer.preferredTime)}</strong></div>
    `;
  }

  const summary = document.getElementById("confirmationSummary");
  if (summary && order?.items?.length) {
    summary.innerHTML = order.items.map((item) => `
      <div class="summary-row">
        <span>${escapeHTML(item.name)} <small>${escapeHTML(item.options || "")}</small></span>
        <strong>${formatMoney(item.lineTotal)}</strong>
      </div>
    `).join("");
    document.getElementById("confirmationTotal").textContent = formatMoney(order.total);
  }

  const config = window.THREEOGLEH_CONFIG || {};
  const whatsapp = config.whatsappNumber || "962798125254";
  const cliq = config.cliqAliasOrNumber || "";
  const cliqText = document.getElementById("confirmationCliq");
  if (cliqText) {
    cliqText.textContent = cliq
      ? `Use this CliQ number/alias to pay: ${cliq}. Please include ${code} in the transfer note.`
      : "CliQ details will be provided soon.";
  }
  document.querySelectorAll("[data-whatsapp-link]").forEach((link) => {
    link.href = `https://wa.me/${whatsapp}`;
  });
});

function readLastOrder() {
  try {
    return JSON.parse(sessionStorage.getItem(CONFIRMATION_KEY) || "null");
  } catch {
    return null;
  }
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
