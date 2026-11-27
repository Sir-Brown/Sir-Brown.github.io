(() => {
  const root = document.documentElement;
  const storageKey = "portfolio-theme";
  const themeToggle = document.querySelector("[data-theme-toggle]");
  const menuToggle = document.querySelector("[data-menu-toggle]");
  const nav = document.querySelector("[data-primary-nav]");
  const systemTheme = window.matchMedia("(prefers-color-scheme: light)");

  function applyTheme(theme) {
    root.dataset.theme = theme;
    if (themeToggle) {
      const isLight = theme === "light";
      themeToggle.setAttribute("aria-pressed", String(isLight));
      themeToggle.textContent = isLight ? "Use dark theme" : "Use light theme";
    }
  }

  let savedTheme = null;
  try { savedTheme = localStorage.getItem(storageKey); } catch (_) {}
  applyTheme(savedTheme === "light" || savedTheme === "dark"
    ? savedTheme
    : (systemTheme.matches ? "light" : "dark"));

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
      applyTheme(nextTheme);
      try { localStorage.setItem(storageKey, nextTheme); } catch (_) {}
    });
  }

  systemTheme.addEventListener?.("change", (event) => {
    let preference = null;
    try { preference = localStorage.getItem(storageKey); } catch (_) {}
    if (preference !== "light" && preference !== "dark") {
      applyTheme(event.matches ? "light" : "dark");
    }
  });

  if (menuToggle && nav) {
    menuToggle.addEventListener("click", () => {
      const expanded = menuToggle.getAttribute("aria-expanded") === "true";
      menuToggle.setAttribute("aria-expanded", String(!expanded));
      nav.classList.toggle("is-open", !expanded);
    });
  }

  const year = document.querySelector("[data-current-year]");
  if (year) year.textContent = String(new Date().getFullYear());
})();