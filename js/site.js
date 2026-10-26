(function () {
  const year = document.getElementById("year");

  if (year) {
    year.textContent = String(new Date().getFullYear());
  }

  const toggle = document.querySelector(".nav-toggle");
  const nav = document.getElementById("site-nav");

  if (!toggle || !nav) {
    return;
  }

  const setOpen = (open) => {
    nav.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    document.body.classList.toggle("nav-open", open);
  };

  toggle.addEventListener("click", () => {
    const open = toggle.getAttribute("aria-expanded") !== "true";
    setOpen(open);

    if (open) {
      const firstLink = nav.querySelector("a");

      if (firstLink) {
        firstLink.focus();
      }
    }
  });

  for (const link of nav.querySelectorAll("a")) {
    link.addEventListener("click", () => {
      window.setTimeout(() => {
        setOpen(false);
      }, 0);
    });
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
      setOpen(false);
      toggle.focus();
    }
  });

  const desktop = window.matchMedia("(min-width: 761px)");
  const closeOnDesktop = () => {
    if (desktop.matches) {
      setOpen(false);
    }
  };

  if (typeof desktop.addEventListener === "function") {
    desktop.addEventListener("change", closeOnDesktop);
  }
})();
