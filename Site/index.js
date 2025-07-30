/* ============================================================
 *      MOBILE NAVBAR
 * ============================================================ */
const MOBILE_NAVBAR_HAMBURGUER = document.querySelector('.navbar-hamburguer');
const MOBILE_NAVBAR = document.querySelector('.navbar-mobile-version');
const OVERLAY_LINKS = MOBILE_NAVBAR.querySelectorAll('a');
const MOVING_IMG_MOUSE = document.getElementById("Moving");
const TITLE_ANIMATION = document.getElementById("title")
/* abre/fecha o menu e bloqueia/desbloqueia o scroll */
function toggleMenu() {
  MOBILE_NAVBAR_HAMBURGUER.classList.toggle('nav-bar-activate'); // anima o ícone
  MOBILE_NAVBAR.classList.toggle('open');                        // mostra/oculta overlay
  document.body.classList.toggle('no-scroll');                   // trava/destrava scroll
}

/* clique no ícone ☰ */
MOBILE_NAVBAR_HAMBURGUER.addEventListener('click', toggleMenu);

/* clique em QUALQUER link dentro do overlay fecha o menu */
OVERLAY_LINKS.forEach(link => link.addEventListener('click', toggleMenu));
document.addEventListener("mousemove", (ev) => {
    const positionX = (window.innerWidth / -90 - ev.x) / 70;
    const positionY = (window.innerHeight / 2 - ev.y) / 50; 

    MOVING_IMG_MOUSE.style.transform = `translate(${positionX}px, ${positionY}px)`;
    TITLE_ANIMATION.style.transform = `translate(${positionX}px, ${positionY}px)`
});
document.addEventListener("DOMContentLoaded", () => {
  const typer = document.querySelector(".typer");
  if (!typer) return;

  const fullText = typer.dataset.text.trim();
  const cursor = typer.querySelector(".cursor");
  let i = 0;

  function type() {
    if (i < fullText.length) {
      // Evita quebrar linhas manualmente: ^ representa quebra forçada
      typer.insertBefore(document.createTextNode(fullText[i] === "\n" ? "\n" : fullText[i]), cursor);
      i++;
      setTimeout(type, 25); // velocidade (ms) da digitação
    } else {
      cursor.remove(); // remove o cursor ao terminar
    }
  }

  type();
});
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".project-card");

  /* IntersectionObserver = anima cada card ao entrar 30 % na viewport */
  const io = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);           // anima só 1x
        }
      });
    },
    { threshold: 0.3 }
  );

  cards.forEach(card => io.observe(card));
});
const opts = {threshold:0.25};            // 25 % visível já conta
  const io = new IntersectionObserver((entries, obs)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('show');
        obs.unobserve(entry.target);        // remove se quiser animar só 1x
      }
    });
  }, opts);

  document.querySelectorAll('.slide-up, .slide-down, .slide-left, .slide-right, .slider-opacity').forEach(el=>io.observe(el));

/* =====================  FORMULÁRIO – ENVIO SEGURO  ===================== */
(() => {
  "use strict";
  const form       = document.querySelector(".contact-form");
  if (!form) return;

  const phoneInput = document.getElementById("telefone");
  const emailInput = document.getElementById("email");

  const MAX_EMAIL_LEN = 254;
  const PHONE_PATTERN = /^[\d\s()+\-]{8,20}$/;
  const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
  const SUBMIT_URL    = "submit.php";
  const INTERVAL_MS   = 15_000;  // 15 s entre envios
  let   lastSubmit    = 0;

  const sanitize   = str => str.replace(/[^\x20-\x7E]+/g, "").trim();
  const isValidEmail = email => email.length <= MAX_EMAIL_LEN && EMAIL_PATTERN.test(email);
  const isValidPhone = tel   => PHONE_PATTERN.test(tel);
  const alertErr   = msg => { alert(msg); console.warn(msg); };

  form.addEventListener("submit", async ev => {
    ev.preventDefault();

    if (Date.now() - lastSubmit < INTERVAL_MS) return alertErr("Aguarde alguns segundos antes de enviar de novo.");
    const email = sanitize(emailInput.value);
    const phone = sanitize(phoneInput.value);

    if (!isValidEmail(email)) return alertErr("E-mail inválido.");
    if (!isValidPhone(phone)) return alertErr("Telefone inválido.");

    const csrf = document.querySelector("meta[name='csrf-token']")?.content || window.csrfToken || "";

    try {
      const resp = await fetch(SUBMIT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Requested-With": "XMLHttpRequest",
          "X-CSRF-Token": csrf
        },
        credentials: "same-origin",
        body: JSON.stringify({ email, phone })
      });
      if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
      alert("Orçamento solicitado com sucesso!");
      form.reset();
      lastSubmit = Date.now();
    } catch (err) {
      console.error(err);
      alertErr("Falha no envio. Tente novamente.");
    }
  });
})();
