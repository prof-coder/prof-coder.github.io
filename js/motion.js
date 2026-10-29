(function () {
  const root = document.documentElement;

  const show = () => {
    root.classList.remove("is-motion");
  };

  if (!root.classList.contains("is-motion")) {
    return;
  }

  const failSafe = window.setTimeout(show, 4000);
  const engine = window.anime;

  if (!engine || typeof engine.animate !== "function" || typeof engine.onScroll !== "function") {
    window.clearTimeout(failSafe);
    show();
    return;
  }

  const { animate, stagger, createTimeline, onScroll } = engine;

  try {
    const hero = document.querySelectorAll(".hero h1, .hero .role, .hero .focus, .hero .lede, .hero .link-row, .hero .status");
    const frame = document.querySelector(".frame");
    const caseLead = document.querySelectorAll(".case > .eyebrow, .case > h1, .case__intro, .case__visit");

    if (hero.length || frame || caseLead.length) {
      const timeline = createTimeline({
        defaults: {
          ease: "out(3)",
          duration: 700,
        },
      });

      if (hero.length) {
        timeline.add(hero, {
          opacity: [0, 1],
          y: [16, 0],
          delay: stagger(70),
        });
      }

      if (caseLead.length) {
        timeline.add(caseLead, {
          opacity: [0, 1],
          y: [16, 0],
          delay: stagger(70),
        });
      }

      if (frame) {
        timeline.add(frame, {
          opacity: [0, 1],
          y: [20, 0],
          duration: 800,
        }, hero.length ? "<<+=120" : 0);
      }
    }

    document.querySelectorAll(".work-card, .skill-row, .about-copy, .glance, .contact-block, .shot, .panel").forEach((target) => {
      animate(target, {
        opacity: [0, 1],
        y: [18, 0],
        duration: 760,
        ease: "out(3)",
        autoplay: onScroll({
          target,
          enter: { target: "top", container: "bottom-=8%" },
        }),
      });
    });

    window.clearTimeout(failSafe);
  } catch (error) {
    window.clearTimeout(failSafe);
    show();
  }
})();
