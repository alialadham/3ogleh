(function () {
  const LOADER_KEY = "threeOglehLoaderShown";
  setupCartBadge();

  const loader = document.querySelector("[data-loading-screen]");
  const bar = document.querySelector("[data-loading-bar]");
  if (!loader || !bar) return;

  if (sessionStorage.getItem(LOADER_KEY)) {
    loader.remove();
    return;
  }

  let progress = 0;
  const percentage = document.createElement("strong");
  percentage.className = "loading-percentage";
  percentage.setAttribute("aria-live", "polite");
  percentage.textContent = "0%";
  loader.querySelector(".loading-content")?.insertBefore(percentage, bar.parentElement);

  const firstPhase = setInterval(() => {
    progress = Math.min(progress + 1.4, 35);
    updateProgress(progress);

    if (progress >= 35) {
      clearInterval(firstPhase);
      setTimeout(runFinalPhase, 2000);
    }
  }, 42);

  function runFinalPhase() {
    const finalPhase = setInterval(() => {
      progress = Math.min(progress + 5, 100);
      updateProgress(progress);

      if (progress >= 100) {
        clearInterval(finalPhase);
        setTimeout(() => {
          sessionStorage.setItem(LOADER_KEY, "true");
          loader.classList.add("is-hidden");
          setTimeout(() => loader.remove(), 650);
        }, 260);
      }
    }, 30);
  }

  setTimeout(() => {
    if (document.body.contains(loader)) {
      updateProgress(100);
      sessionStorage.setItem(LOADER_KEY, "true");
      loader.classList.add("is-hidden");
      setTimeout(() => loader.remove(), 650);
    }
  }, 6500);

  function updateProgress(value) {
    const rounded = Math.round(value);
    bar.style.width = `${rounded}%`;
    percentage.textContent = `${rounded}%`;
  }

  function setupCartBadge() {
    window.updateCartBadge = updateCartBadge;
    document.querySelectorAll('a[href="/cart"]').forEach((link) => {
      if (!link.querySelector(".cart-count")) {
        const count = document.createElement("span");
        count.className = "cart-count";
        count.setAttribute("aria-label", "Cart item count");
        link.append(" ", count);
      }
    });
    updateCartBadge();
    window.addEventListener("storage", updateCartBadge);
  }

  function updateCartBadge() {
    let cart = [];
    try {
      cart = JSON.parse(localStorage.getItem("3ogleh.cart") || "[]");
    } catch {
      cart = [];
    }
    const total = cart.reduce((sum, item) => sum + Number(item.quantity || 1), 0);
    document.querySelectorAll(".cart-count").forEach((count) => {
      count.textContent = String(total);
      count.hidden = total === 0;
    });
  }
})();
