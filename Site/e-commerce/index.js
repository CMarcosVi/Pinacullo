/* ============================================================
 *  MAIN SCRIPT — Vanilla JS only
 * ============================================================ */
document.addEventListener("DOMContentLoaded", () => {

  /* -------------------------------------------------- */
  /* 1)  NAVBAR MOBILE  (☰)                             */
  /* -------------------------------------------------- */
  const burger   = document.querySelector(".navbar-hamburguer");
  const mobMenu  = document.querySelector(".navbar-mobile-version");
  burger?.addEventListener("click", () => {
    burger.classList.toggle("nav-bar-activate");
    mobMenu?.classList.toggle("open");
    document.body.classList.toggle("no-scroll");
  });

  /* -------------------------------------------------- */
  /* 2)  REVEAL ON SCROLL                              */
  /* -------------------------------------------------- */
  const revealEls = document.querySelectorAll("[data-reveal]");
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add("reveal-visible");
        io.unobserve(e.target);
      }
    });
  }, { threshold: .2 });

  revealEls.forEach(el => {
    el.style.opacity    = "0";
    el.style.transform  = "translateY(40px)";
    io.observe(el);
  });

  /* -------------------------------------------------- */
  /* 3)  PARALLAX BG  (.div-title)                      */
  /* -------------------------------------------------- */
  const divTitle = document.querySelector(".div-title");
  if (divTitle) {
    window.addEventListener("scroll", () => {
      const { top, height } = divTitle.getBoundingClientRect();
      const progress = Math.min(Math.max((window.innerHeight - top) / (window.innerHeight + height), 0), 1);
      divTitle.style.backgroundPositionY = `${progress * 40}%`;   /* 0 → 40 % */
    });
  }

  /* -------------------------------------------------- */
  /* 4)  3D TILT nos planos (.plan)                     */
  /* -------------------------------------------------- */
  document.querySelectorAll(".plan").forEach(card => {
    card.style.transition = "transform 0.4s";
    card.addEventListener("mousemove", e => {
      const r = card.getBoundingClientRect();
      const x =  (e.clientX - r.left) / r.width  - 0.5;
      const y =  (e.clientY - r.top ) / r.height - 0.5;
      card.style.transform = `perspective(800px) rotateY(${x*12}deg) rotateX(${-y*12}deg)`;
    });
    card.addEventListener("mouseleave", () =>
      card.style.transform = "perspective(800px) rotateY(0deg) rotateX(0deg)"
    );
  });

  /* -------------------------------------------------- */
  /* 5)  ÍCONE-BURGER animado (.mobile-menu-icon)       */
  /* -------------------------------------------------- */
  const burgerIcon = document.querySelector(".mobile-menu-icon");
  const mobileNav  = document.getElementById("mobileNav");
  if (burgerIcon && mobileNav) {
    const [l1, l2, l3] = burgerIcon.children;
    const toggle = () => {
      const open = mobileNav.classList.toggle("show");
      burgerIcon.classList.toggle("open");

      mobileNav.style.display   = open ? "flex" : "none";
      mobileNav.style.opacity   = open ? "1"   : "0";
      mobileNav.style.transform = open ? "translateY(0)" : "translateY(-10px)";
      mobileNav.style.transition= "opacity .35s ease, transform .35s ease";

      if (open) {
        l1.style.transform = "translateY(8px) rotate(45deg)";
        l2.style.opacity   = "0";
        l3.style.transform = "translateY(-8px) rotate(-45deg)";
      } else {
        l1.style.transform = l3.style.transform = "translateY(0) rotate(0)";
        l2.style.opacity   = "1";
      }
    };
    burgerIcon.addEventListener("click", toggle);
  }

  /* -------------------------------------------------- */
  /* 6)  ANIMAÇÃO “S E O” (scramble)                    */
  /* -------------------------------------------------- */
  const letters = document.querySelectorAll(".letter");
  const CHARS   = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const STEPS   = 8, STEP_MS = 40, LETTER_DELAY = 300, LOOP_DELAY = 1500;

  const scramble = (span, done) => {
    let i = 0;
    span.classList.remove("done");
    const t = setInterval(() => {
      span.textContent = CHARS[Math.floor(Math.random()*CHARS.length)];
      if (++i >= STEPS) {
        clearInterval(t);
        span.textContent = span.dataset.final;
        span.classList.add("done");
        done?.();
      }
    }, STEP_MS);
  };

  const runScramble = () => {
    let idx = 0;
    (function next() {
      if (idx < letters.length) {
        scramble(letters[idx++], () => setTimeout(next, LETTER_DELAY));
      } else {
        setTimeout(runScramble, LOOP_DELAY);
      }
    })();
  };
  runScramble();

  /* -------------------------------------------------- */
  /* 7)  FLOAT‑IMAGES FOLLOW MOUSE                      */
  /* -------------------------------------------------- */
  const hero  = document.querySelector(".hero");
  const imgs  = document.querySelectorAll(".float-img");
  if (hero && imgs.length) {
    let tgtX = 0, tgtY = 0, curX = 0, curY = 0;
    hero.addEventListener("mousemove", e => {
      const r = hero.getBoundingClientRect();
      tgtX = (e.clientX - r.left) / r.width  - .5;
      tgtY = (e.clientY - r.top ) / r.height - .5;
    });
    hero.addEventListener("mouseleave", () => (tgtX = tgtY = 0));

    const loop = () => {
      curX += (tgtX - curX) * .07;
      curY += (tgtY - curY) * .07;
      imgs.forEach((img, i) => {
        const strength = 40;                       /* deslocamento máx. */
        const depth    = (i + 1.5) / imgs.length;    /* 0…1 */
        img.style.transform = `translate(${curX*strength*depth}px, ${curY*strength*depth}px)`;
      });
      requestAnimationFrame(loop);
    };
    loop();
  }

});