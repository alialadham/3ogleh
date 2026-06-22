const CART_KEY = "3ogleh.cart";

document.addEventListener("DOMContentLoaded", () => {
  renderCartPage();
  updateConfigLinks();
});

function renderCartPage() {
  const list = document.getElementById("cartItems");
  const empty = document.getElementById("cartEmpty");
  const subtotal = document.getElementById("cartSubtotal");
  const total = document.getElementById("cartTotal");
  const checkoutButton = document.getElementById("checkoutButton");
  const items = cartItems();

  if (!list || !empty || !subtotal || !total || !checkoutButton) return;

  if (!items.length) {
    list.innerHTML = "";
    empty.hidden = false;
    checkoutButton.setAttribute("aria-disabled", "true");
    checkoutButton.href = "#";
    subtotal.textContent = formatMoney(0);
    total.textContent = formatMoney(0);
    return;
  }

  empty.hidden = true;
  checkoutButton.removeAttribute("aria-disabled");
  checkoutButton.href = "/checkout";
  list.innerHTML = items.map(cartItemTemplate).join("");

  list.querySelectorAll("[data-qty]").forEach((input) => {
    input.addEventListener("change", () => {
      updateCartItem(input.dataset.qty, { quantity: Math.max(1, Number(input.value || 1)) });
      renderCartPage();
    });
  });

  list.querySelectorAll("[data-remove]").forEach((button) => {
    button.addEventListener("click", () => {
      removeCartItem(button.dataset.remove);
      renderCartPage();
    });
  });

  const sum = cartTotal(items);
  subtotal.textContent = formatMoney(sum);
  total.textContent = formatMoney(sum);
}

function cartItemTemplate(item) {
  const product = findProduct(item.productId);
  if (!product) return "";
  const quantity = Number(item.quantity || 1);
  const line = lineTotal(item);
  const options = itemOptions(item);

  return `
    <article class="cart-item">
      <img src="${productImage(product)}" alt="${escapeHTML(product.name)}" loading="lazy" />
      <div class="cart-item-main">
        <h2>${escapeHTML(product.name)}</h2>
        <p>${escapeHTML(options)}</p>
        <strong>${formatMoney(line)}</strong>
      </div>
      <label class="quantity-control">
        Qty
        <input type="number" min="1" value="${quantity}" data-qty="${escapeAttr(item.key)}" />
      </label>
      <button class="button button-light" type="button" data-remove="${escapeAttr(item.key)}">Remove</button>
    </article>
  `;
}

function cartItems() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY) || "[]");
  } catch {
    return [];
  }
}

function saveCart(items) {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
  window.updateCartBadge?.();
}

function updateCartItem(key, patch) {
  saveCart(cartItems().map((item) => (item.key === key ? { ...item, ...patch } : item)));
}

function removeCartItem(key) {
  saveCart(cartItems().filter((item) => item.key !== key));
}

function findProduct(id) {
  return (window.THREEOGLEH_PRODUCTS || []).find((product) => product.id === id);
}

function productImage(product) {
  return `/assets/products/studio/${product.id}.png`;
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

function cartTotal(items = cartItems()) {
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

function formatMoney(value) {
  return `${Number(value || 0).toLocaleString("en-US", { maximumFractionDigits: 2 })} JOD`;
}

function updateConfigLinks() {
  const config = window.THREEOGLEH_CONFIG || {};
  const whatsapp = config.whatsappNumber || "962798125254";
  document.querySelectorAll("[data-whatsapp-link]").forEach((link) => {
    link.href = `https://wa.me/${whatsapp}`;
  });
}

function escapeHTML(value) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function escapeAttr(value) {
  return escapeHTML(value);
}
