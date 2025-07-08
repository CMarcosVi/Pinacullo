document.addEventListener("DOMContentLoaded", () => {
  /* -------------------------------------------------- */
  /* 1) SETUP GSAP & ScrollTrigger                      */
  /* -------------------------------------------------- */
  gsap.registerPlugin(ScrollTrigger);


  /* -------------------------------------------------- */
  /* 3) REVEAL GENÉRICO VIA SCROLLTRIGGER               */
  /* -------------------------------------------------- */
  gsap.utils.toArray("[data-reveal]").forEach((el) => {
    gsap.from(el, {
      y: 40,
      opacity: 0,
      duration: 0.9,
      ease: "power3.out",
      scrollTrigger: {
        trigger: el,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });
  });

  /* -------------------------------------------------- */
  /* 5) PARALLAX SUAVE NA HERO                          */
  /* -------------------------------------------------- */
  gsap.to(".div-title", {
    backgroundPositionY: "40%",
    ease: "none",
    scrollTrigger: {
      trigger: ".div-title",
      scrub: 0.5,
    },
  });

  /* -------------------------------------------------- */
  /* 6) TILT 3D NOS PLANOS DE PREÇO                     */
  /* -------------------------------------------------- */
  gsap.utils.toArray(".plan").forEach((card) => {
    /* Mouse move dentro do card */
    const tilt = (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      gsap.to(card, {
        rotationY: x * 12,
        rotationX: -y * 12,
        transformPerspective: 800,
        duration: 0.4,
      });
    };
    card.addEventListener("mousemove", tilt);
    card.addEventListener("mouseleave", () =>
      gsap.to(card, { rotationY: 0, rotationX: 0, duration: 0.6 })
    );
  });

  /* -------------------------------------------------- */
  /* 7) MENU MOBILE COM ANIMAÇÃO                        */
  /* -------------------------------------------------- */
  const mobileNav = document.getElementById("mobileNav");
  const burger = document.querySelector(".mobile-menu-icon");

  window.toggleMobileMenu = () => {
    const open = mobileNav.classList.contains("show");

    if (!open) {
      // Abrir
      gsap.fromTo(
        mobileNav,
        { autoAlpha: 0, y: -10, display: "flex" },
        { autoAlpha: 1, y: 0, duration: 0.35, ease: "power2.out" }
      );
    } else {
      // Fechar
      gsap.to(mobileNav, {
        autoAlpha: 0,
        y: -10,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => mobileNav.classList.remove("show"),
      });
    }

    mobileNav.classList.toggle("show");
    burger.classList.toggle("open");

    /* ícone “X” animado ------------------------------ */
    const [l1, l2, l3] = burger.children;
    if (burger.classList.contains("open")) {
      gsap.to(l1, { y: 8, rotation: 45, duration: 0.3 });
      gsap.to(l2, { autoAlpha: 0, duration: 0.3 });
      gsap.to(l3, { y: -8, rotation: -45, duration: 0.3 });
    } else {
      gsap.to([l1, l3], { y: 0, rotation: 0, duration: 0.3 });
      gsap.to(l2, { autoAlpha: 1, duration: 0.3 });
    }
  };
});
