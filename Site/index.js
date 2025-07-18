
const CIRCLE_MOUSE = document.querySelector('.circle-pointer-mouse');
const LINK_NAV_BAR = document.querySelectorAll('.link-nav-bar')
const VALUE_INPUT_YES = document.querySelector('.value-yes');
const LIST_TECNOLOGIS_SELECT = document.querySelector('.tecnologis-list')
const TECNOLOGIS_USED = document.querySelectorAll('.tecnologis')
const SERVICE_LIST = document.querySelectorAll('.service')
const MOVING_IMG_MOUSE = document.getElementById("Moving");

const TITLE_ANIMATION = document.getElementById("title")
const PREV_BTN = document.getElementById("btn-prev");
const NEXT_BTN = document.getElementById("btn-next");
const SERVICE_CONTAINER = document.querySelector(".list-servies");
const SERVICE = document.querySelectorAll("service");
const SCROLL_CONTAINER = document.querySelector('.scroll-container');
const SERVICE_LOADING = document.querySelector('.loading-projects')
const SERVICE_LOADING_TEXT = document.querySelector('.text-loading')
const SERVICES_LIST = document.querySelectorAll(".service-type-2");
const TECNOLOGIS_LIST = document.querySelectorAll(".tecnologis-used");


const CONTAINER_FRONT_END = document.getElementsByClassName("front-end-container")[0]; // Acessando o primeiro elemento
const TITLE_FRONT_END = document.getElementById("title-front-end");

const CONTAINER_BACK_END = document.getElementsByClassName("back-end-container")[0]; // Acessando o primeiro elemento
const TITLE_BACK_END = document.getElementById("title-back-end");

const CONTAINER_OUTHERS = document.getElementsByClassName("outher-container")[0]; // Acessando o primeiro elemento
const TITLE_OUTHER_TECH = document.getElementById("title-outhers");

const SECTION_TECH = document.getElementById("tecnologys");
const TECHNOLOGY_LISTS_1 = document.querySelectorAll(".list-tecn-tecnologys1");
const TECHNOLOGY_LISTS_2 = document.querySelectorAll(".list-tecn-tecnologys2");
const TECHNOLOGY_LISTS_3 = document.querySelectorAll(".list-tecn-tecnologys3");

const isElementCentered = (el) => {
    const rect = el.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    const elementCenter = rect.top + rect.height / 2;
    return elementCenter >= windowHeight * 0.05 - 10 && elementCenter <= windowHeight * 0.9 + 10;
};




const handleScroll = () => {
    if (isElementCentered(CONTAINER_FRONT_END)) {
        TITLE_FRONT_END.classList.add("animation-title");
        TITLE_FRONT_END.style.setProperty("--before-animation", "animation-slider-shadow 1.5s linear both");
        TECHNOLOGY_LISTS_1.forEach(list => {
            list.classList.add("start-animation");
        });
    }
    if (isElementCentered(CONTAINER_BACK_END)) {
        TITLE_BACK_END.classList.add("animation-title");
        TITLE_BACK_END.style.setProperty("--before-animation", "animation-slider-shadow 1.5s linear both");
        TECHNOLOGY_LISTS_2.forEach(list => {
            list.classList.add("start-animation");
        });
    }
    if (isElementCentered(CONTAINER_OUTHERS)) {
        TITLE_OUTHER_TECH.classList.add("animation-title");
        TITLE_OUTHER_TECH.style.setProperty("--before-animation", "animation-slider-shadow 1.5s linear both");
        TECHNOLOGY_LISTS_3.forEach(list => {
            list.classList.add("start-animation");
        });
    }
};

window.addEventListener("scroll", handleScroll);


window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    const containerHeight = SCROLL_CONTAINER.offsetHeight;
    const opacityLossFactor = 0.0013;
    let opacity = 1 - (scrollPosition * opacityLossFactor);
    opacity = Math.max(0, opacity);
    SCROLL_CONTAINER.style.opacity = opacity;
});


SERVICES_LIST.forEach((element) => {
    element.addEventListener("mouseover", () => {
        CIRCLE_MOUSE.style.borderColor = "#000"; 
    })
    element.addEventListener("mouseout", () => {
        CIRCLE_MOUSE.style.borderColor = "#fff"; 
    })
});

TECNOLOGIS_LIST.forEach((element) => {
    element.addEventListener("mouseover", () => {
        CIRCLE_MOUSE.style.borderColor = "#000"; 
    })
    element.addEventListener("mouseout", () => {
        CIRCLE_MOUSE.style.borderColor = "#fff"; 
    })
});
TECNOLOGIS_USED.forEach((element) => {
    element.addEventListener("click", () => {
        element.classList.toggle('select-tecnologi');
    });
    element.addEventListener("mouseover", () => {
        CIRCLE_MOUSE.style.borderColor = element.classList.contains('select-tecnologi') ? "#000" : "#fff";
    });
    element.addEventListener("mouseout", () => {
        CIRCLE_MOUSE.style.borderColor = "#fff"; 
    });
});
SERVICE_LIST.forEach((element) => {
    element.addEventListener("mouseover", () => {
        if(element.classList.contains('select-service')){
            CIRCLE_MOUSE.style.borderColor = "#000"; 
        }
    })
    element.addEventListener("mouseout", () => {
        if(element.classList.contains('select-service')){
            CIRCLE_MOUSE.style.borderColor = "#fff"; 
        }
    })
})


document.addEventListener("mousemove", (ev) => {
    const positionX = (window.innerWidth / -90 - ev.x) / 70;
    const positionY = (window.innerHeight / 2 - ev.y) / 50; 

    MOVING_IMG_MOUSE.style.transform = `translate(${positionX}px, ${positionY}px)`;
    TITLE_ANIMATION.style.transform = `translate(${positionX}px, ${positionY}px)`
});


document.addEventListener('mousemove', (event) => {
    // Atualiza a posição do círculo com base nas coordenadas do mouse
    CIRCLE_MOUSE.style.left = `${event.pageX}px`;
    CIRCLE_MOUSE.style.top = `${event.pageY}px`;
});
/*
LINK_NAV_BAR.forEach(element => {
    element.addEventListener('mouseover', () => {
        CIRCLE_MOUSE.style.display = 'none'
    })
    element.addEventListener('mouseout', () => {
        CIRCLE_MOUSE.style.display = 'block'
    })
});
*/
const targetAnimation = () => {
    TITLE_ANIMATION.style.animation = "animation-tec-text 6s infinite linear"
    TITLE_ANIMATION.children[0].style.animation = "animation-tec-text 5s infinite linear";
    TITLE_ANIMATION.children[1].style.animation = "animation-tec-text 4s infinite linear";
    TITLE_ANIMATION.children[2].style.animation = "animation-tec-text 3s infinite linear";
}
setTimeout(targetAnimation, 5000)
/* =========================  SOBRE – ANIMAÇÃO DE DIGITAÇÃO  ========================= */
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

/* ======================  PROJETOS — JS  ====================== */
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

/* =========  APPEAR ON SCROLL  ========= */
/* =========  SLIDE ON SCROLL + GRUPOS  ========= */
const opts = {threshold:0.25};            // 25 % visível já conta
  const io = new IntersectionObserver((entries, obs)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('show');
        obs.unobserve(entry.target);        // remove se quiser animar só 1x
      }
    });
  }, opts);

  document.querySelectorAll('.slide-up, .slide-down, .slide-left, .slide-right, .slider-opacity')
          .forEach(el=>io.observe(el));

/* --------- NAVBAR HAMBÚRGUER --------- */

// === NAVBAR SCRIPT ===
const burger = document.querySelector('.burger');
const nav    = document.querySelector('.nav-links');

burger.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  burger.setAttribute('aria-expanded', open);
  burger.children[0].style.transform = open ? 'rotate(45deg) translateY(8px)' : '';
  burger.children[1].style.opacity    = open ? '0' : '';
  burger.children[2].style.transform = open ? 'rotate(-45deg) translateY(-8px)' : '';
});

// Dropdown
const dropBtn  = document.querySelector('.drop-btn');
const dropMenu = document.querySelector('.dropdown-menu');
dropBtn.addEventListener('click', () => {
  const visible = dropMenu.style.display === 'flex';
  dropMenu.style.display = visible ? 'none' : 'flex';
  dropBtn.setAttribute('aria-expanded', !visible);
});
document.addEventListener('click', e=>{
  if(!e.target.closest('.dropdown')){
    dropMenu.style.display='none';
    dropBtn.setAttribute('aria-expanded','false');
  }
});


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
