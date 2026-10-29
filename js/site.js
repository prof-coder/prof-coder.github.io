(function () {
  const year = document.getElementById("year");

  if (year) {
    year.textContent = String(new Date().getFullYear());
  }

  const toggle = document.querySelector(".nav-toggle");
  const nav = document.getElementById("site-nav");

  const setOpen = (open) => {
    if (!toggle || !nav) {
      return;
    }

    nav.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    document.body.classList.toggle("nav-open", open);
  };

  if (toggle && nav) {
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

    const desktop = window.matchMedia("(min-width: 900px)");

    if (typeof desktop.addEventListener === "function") {
      desktop.addEventListener("change", () => {
        if (desktop.matches) {
          setOpen(false);
        }
      });
    }
  }

  const sections = [...document.querySelectorAll("main section[id]")];
  const navLinks = nav ? [...nav.querySelectorAll("a")] : [];

  if (sections.length && navLinks.length && "IntersectionObserver" in window) {
    const spy = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        const id = entry.target.id;

        navLinks.forEach((link) => {
          const current = (link.getAttribute("href") || "").endsWith("#" + id);

          if (current) {
            link.setAttribute("aria-current", "true");
          } else {
            link.removeAttribute("aria-current");
          }
        });
      });
    }, { rootMargin: "-45% 0px -45% 0px", threshold: 0.01 });

    sections.forEach((section) => spy.observe(section));
  }

  const shortcut = document.querySelector(".search-toggle kbd");

  if (shortcut && /Mac|iPhone|iPad/.test(navigator.platform)) {
    shortcut.textContent = "\u2318K";
  }

  const sources = [...document.querySelectorAll("[data-command]")];
  const seen = new Set();
  const commands = [];

  sources.forEach((source) => {
    const href = source.getAttribute("href");
    const label = source.getAttribute("data-command");

    if (!href || !label || seen.has(href + label)) {
      return;
    }

    seen.add(href + label);
    commands.push({ href, label });
  });

  const opener = document.getElementById("open-command");

  if (opener && commands.length) {
    const dialog = document.createElement("dialog");
    dialog.id = "command";
    dialog.className = "command";
    dialog.innerHTML = [
      '<div class="command__head">',
      '<h2 id="command-title">Jump to</h2>',
      '<button class="command__close" type="button" value="cancel">Close</button>',
      "</div>",
      '<p class="command__note" id="command-note">Sections, projects, and contact.</p>',
      '<input id="command-input" type="search" placeholder="Type to filter" aria-label="Filter destinations">',
      '<ul id="command-list"></ul>',
      '<p class="command__empty" hidden>No matches</p>'
    ].join("");
    document.body.appendChild(dialog);

    const input = dialog.querySelector("#command-input");
    const list = dialog.querySelector("#command-list");
    const empty = dialog.querySelector(".command__empty");
    const closeButton = dialog.querySelector(".command__close");

    const render = () => {
      const query = input.value.trim().toLowerCase();
      const matches = commands.filter((item) => item.label.toLowerCase().includes(query));
      list.replaceChildren();

      matches.forEach((item) => {
        const li = document.createElement("li");
        const link = document.createElement("a");
        link.href = item.href;
        link.textContent = item.label;
        link.addEventListener("click", () => {
          dialog.close();
        });
        li.appendChild(link);
        list.appendChild(li);
      });

      empty.hidden = matches.length > 0;
    };

    const open = () => {
      input.value = "";
      render();
      dialog.showModal();
      input.focus();
    };

    opener.addEventListener("click", open);
    closeButton.addEventListener("click", () => dialog.close());
    input.addEventListener("input", render);

    document.addEventListener("keydown", (event) => {
      const key = event.key.toLowerCase();

      if ((event.metaKey || event.ctrlKey) && key === "k") {
        event.preventDefault();
        if (dialog.open) {
          dialog.close();
        } else {
          open();
        }
      }
    });
  }

  const copyButton = document.getElementById("copy-email");

  if (copyButton) {
    copyButton.addEventListener("click", async () => {
      const address = copyButton.getAttribute("data-email") || "";

      try {
        await navigator.clipboard.writeText(address);
        copyButton.textContent = "Copied";
      } catch (error) {
        copyButton.textContent = address;
      }

      window.setTimeout(() => {
        copyButton.textContent = "Copy email";
      }, 1600);
    });
  }
})();
