const Hero1 = {
  html: `  <section class="hero">
    <h1>We evolve marketing ecosystems for consumer brands</h1>
    <p>Approach complex data goals with confidence. Seamlessly integrate your marketing, business, and customer data with AI‑powered workflows that grow with your business.</p>

    <div class="actions">
      <button class="btn btn-primary">Book a Demo</button>
      <button class="btn btn-secondary">Get Started Free</button>
    </div>

    <!-- Floating metric / logo cards -->
    <div class="floating-card" style="--delay:0.3s">
      <div class="metric">Rate <span>+58%</span></div>
    </div>
    <div class="floating-card" style="--delay:0.45s">
      <img src="https://dummyimage.com/48x48/ffffff/000.png&text=Ad" alt="Ad Logo" style="width:48px;height:48px;border-radius:0.5rem;" />
    </div>
    <div class="floating-card" style="--delay:0.6s">
      <div class="metric">Traffic</div>
      <canvas width="100" height="40" style="background:rgba(255,255,255,0.05);border-radius:0.25rem;"></canvas>
    </div>
    <div class="floating-card" style="--delay:0.75s">
      <div class="metric">94%<br /><span style="font-size:0.875rem;color:var(--secondary-text);">Data Accuracy</span></div>
    </div>
    <div class="floating-card" style="--delay:0.9s">
      <canvas width="120" height="32" style="background:rgba(255,255,255,0.05);border-radius:0.25rem;"></canvas>
    </div>
  </section>`,
  css: `    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      font-family: "Inter", sans-serif;
    }

    body {
      background: var(--bg-color);
      color: var(--primary-text);
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      overflow-x: hidden;
    }

    .hero {
      position: relative;
      text-align: center;
      padding: 6rem 1.5rem 8rem;
      width: 100%;
      max-width: 1200px;
    }

    .hero::before {
      /* background rings */
      content: "";
      position: absolute;
      inset: 0;
      background: radial-gradient(circle at center, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
      z-index: -1;
      animation: pulse 10s infinite;
    }

    @keyframes pulse {
      0%, 100% { transform: scale(1); opacity: 1; }
      50% { transform: scale(1.15); opacity: 0.6; }
    }

    h1 {
      font-size: clamp(2.5rem, 4vw + 1rem, 4rem);
      line-height: 1.1;
      margin-bottom: 1rem;
      animation: fadeUp 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
      opacity: 0;
    }

    p {
      color: var(--secondary-text);
      font-size: 1.125rem;
      max-width: 620px;
      margin: 0 auto 2.5rem;
      animation: fadeUp 1s 0.2s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
      opacity: 0;
    }

    @keyframes fadeUp {
      to { transform: translateY(0); opacity: 1; }
      from { transform: translateY(20px); opacity: 0; }
    }

    .actions {
      display: flex;
      gap: 1rem;
      justify-content: center;
      flex-wrap: wrap;
      margin-bottom: 4rem;
      animation: fadeUp 1s 0.4s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
      opacity: 0;
    }

    .btn {
      padding: 0.9rem 2rem;
      font-size: 1rem;
      border-radius: 0.5rem;
      border: 2px solid transparent;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .btn-primary {
      background: var(--btn-primary-bg);
      color: var(--btn-primary-text);
    }

    .btn-primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
    }

    .btn-secondary {
      background: var(--btn-secondary-bg);
      color: var(--btn-secondary-text);
      border-color: var(--btn-border);
    }

    .btn-secondary:hover {
      background: rgba(255, 255, 255, 0.08);
    }

    /* Floating cards */
    .floating-card {
      position: absolute;
      background: var(--card-bg);
      color: var(--primary-text);
      border: 1px solid var(--card-outline);
      border-radius: 0.75rem;
      padding: 1rem 1.25rem;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 0.25rem;
      width: 140px;
      backdrop-filter: blur(10px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.6);
      opacity: 0;
      transform: translateY(20px);
      animation: cardIn 1s forwards ease;
    }

    .floating-card:nth-child(1) { top: -40px; left: 0; animation-delay: 0.3s; }
    .floating-card:nth-child(2) { top: 20%; right: -50px; animation-delay: 0.45s; }
    .floating-card:nth-child(3) { bottom: -40px; left: 10%; animation-delay: 0.6s; }
    .floating-card:nth-child(4) { top: 35%; left: -60px; animation-delay: 0.75s; }
    .floating-card:nth-child(5) { bottom: -30px; right: 0; animation-delay: 0.9s; }

    @keyframes cardIn {
      to { opacity: 1; transform: translateY(0); }
    }

    .metric {
      font-weight: 600;
      font-size: 1.25rem;
    }

    .metric span {
      font-size: 0.875rem;
      color: var(--accent);
      margin-left: 0.25rem;
    }

    /* Responsive */
    @media (max-width: 600px) {
      .floating-card { display: none; }
      .actions { flex-direction: column; }
    }`,
  js: `console.log('Hero1 loaded');`,
  php:''
};

const Hero2 = {
  html: `<section class="hero-alt">Hero Section 2</section>`,
  css: `.hero-alt { background: gray; color: black; padding: 2rem; }`,
  js: `console.log('Hero2 loaded');`,
  php:''
};

const Hero3 = {
  html: `
<section class="hero3" id="hero3">
  <div class="hero3-inner">
    <p class="tagline reveal" style="--delay:.1s">Know your true cash terms</p>
    <h1 class="headline reveal" style="--delay:.25s">The modern capital platform</h1>
    <p class="description reveal" style="--delay:.4s">We're eliminating the friction and bias of traditional financing, connecting business builders to quick.</p>
    <div class="buttons reveal" style="--delay:.55s">
      <button class="btn primary">Get Started</button>
      <button class="btn secondary">Contact Sales</button>
    </div>
  </div>
</section>
  `,
  css: `
/* ===== Todo o estilo contido dentro da .hero3 (nenhuma personalização no body) ===== */
.hero3{
  /* Variáveis locais (não globais) */
  --bg1:#003300; --bg2:#001f1f; --accent:#9AF0E3; --white:#fff; --ink:#051d17;
  position:relative; width:100%; min-height:100vh; padding:2rem; overflow:hidden;
  display:grid; place-items:center; text-align:center; perspective:1000px;
  font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
  color:#eaffef;
  background: radial-gradient(circle at top left, var(--bg1), var(--bg2));
}
.hero3-inner{ position:relative; transform-style:preserve-3d; transition: transform .25s ease; }

/* Brilho ambiente */
.hero3::before{
  content:""; position:absolute; inset:-60px; z-index:-1; border-radius:28px;
  background: radial-gradient(600px 200px at 50% -50px, rgba(154,240,227,.18), transparent 60%);
  filter: blur(10px); opacity:.7; transition:opacity .3s ease;
}
.hero3:hover::before{ opacity:1; }

.hero3 .tagline{
  display:inline-block; background:#052b20; color:#b1ffb3; padding:.45rem 1rem; border-radius:20px;
  font-size:.95rem; margin-bottom:1rem; letter-spacing:.2px; box-shadow:0 0 0 1px rgba(255,255,255,.06) inset;
  transition: transform .25s ease, box-shadow .25s ease;
}
.hero3:hover .tagline{ transform: translateZ(30px); box-shadow:0 8px 30px rgba(154,240,227,.15); }

.hero3 .headline{
  font-size: clamp(2rem, 6vw, 4rem); font-weight:800; line-height:1.15; margin-bottom:1rem;
  background: linear-gradient(90deg, #ffffff 0%, #c7ffe6 50%, #ffffff 100%);
  -webkit-background-clip:text; background-clip:text; color:transparent; background-size:200% 100%;
  transition: background-position .8s ease, transform .25s ease;
}
.hero3:hover .headline{ background-position:100% 0; transform: translateZ(40px); }

.hero3 .description{ font-size:1.05rem; color:#d6f6e1; margin-bottom:2rem; }

.hero3 .buttons{ display:flex; justify-content:center; gap:1rem; flex-wrap:wrap; }

.hero3 .btn{
  position:relative; padding:.9rem 2rem; font-size:1rem; border:none; border-radius:28px; cursor:pointer;
  transition: transform .2s ease, box-shadow .2s ease, background .2s ease, color .2s ease;
  will-change: transform; overflow:hidden; isolation:isolate;
}
.hero3 .btn.primary{ background:var(--white); color:#000; }
.hero3 .btn.secondary{ background:#9effb3; color:#003300; }

/* Hover lift + soft glow */
.hero3 .btn::before{
  content:""; position:absolute; inset:-2px; border-radius:inherit; z-index:-1;
  background: radial-gradient(60% 60% at 50% 0%, rgba(154,240,227,.5), transparent 60%);
  opacity:0; transition: opacity .25s ease; filter:blur(10px);
}
.hero3 .btn:hover{ transform: translateY(-3px) scale(1.02); box-shadow:0 10px 30px rgba(0,0,0,.25); }
.hero3 .btn:hover::before{ opacity:1; }
.hero3 .btn:active{ transform: translateY(0) scale(.98); box-shadow:0 4px 14px rgba(0,0,0,.25); }

/* Brilho varrendo no primário */
.hero3 .btn.primary::after{
  content:""; position:absolute; top:0; left:-120%; width:120%; height:100%; pointer-events:none;
  background: linear-gradient(120deg, transparent 20%, rgba(255,255,255,.5) 40%, transparent 60%);
  transform:skewX(-20deg); transition: transform .6s ease;
}
.hero3 .btn.primary:hover::after{ transform: translateX(220%) skewX(-20deg); }

/* ===== Aparição ===== */
.hero3 .reveal{ opacity:0; transform: translateY(18px) scale(.98); }
.hero3 .reveal.show{ animation: hero3-revealUp .7s cubic-bezier(.22,1,.36,1) forwards; }
.hero3 .reveal[data-delay]{ animation-delay: var(--delay, 0s); }
@keyframes hero3-revealUp{ to{ opacity:1; transform: translateY(0) scale(1); } }

/* ===== Responsivo ===== */
@media (max-width: 768px){
  .hero3 .buttons{ flex-direction:column; }
  .hero3 .btn{ width:100%; }
}

/* Ripple */
@keyframes hero3-ripple{ to{ transform:scale(2.4); opacity:0; } }
  `,
  js: `
(function(){
  const boot = () => {
    const host = document.getElementById('hero3') || document.querySelector('.hero3');
    if(!host) return;
    const inner = host.querySelector('.hero3-inner');

    // IntersectionObserver para aparição
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('show'); io.unobserve(e.target); } });
    }, { threshold: .2 });
    host.querySelectorAll('.reveal').forEach(el=> io.observe(el));

    // Tilt 3D suave (preserva outras transformações existentes)
    const onMove = (ev) => {
      const r = host.getBoundingClientRect();
      const x = (ev.clientX - r.left) / r.width;  // 0..1
      const y = (ev.clientY - r.top) / r.height; // 0..1
      const rotY = (x - .5) * 10; // -5..5
      const rotX = (.5 - y) * 8;  // -4..4
      if(inner){
        var base = inner.style.transform || '';
        // remove rotações anteriores para não acumular
        var clean = base.replace(/rotateX\([^)]*\)|rotateY\([^)]*\)/g,'').trim();
        inner.style.transform = (clean + ' rotateX(' + rotX + 'deg) rotateY(' + rotY + 'deg)').trim();
      }
    };
    const onLeave = () => {
      if(inner){
        var base = inner.style.transform || '';
        var clean = base.replace(/rotateX\([^)]*\)|rotateY\([^)]*\)/g,'').trim();
        inner.style.transform = clean;
      }
    };
    host.addEventListener('mousemove', onMove);
    host.addEventListener('mouseleave', onLeave);

    // Ripple nos botões
    host.querySelectorAll('.btn').forEach((btn)=>{
      btn.addEventListener('click', (e)=>{
        const rect = btn.getBoundingClientRect();
        const ripple = document.createElement('span');
        const d = Math.max(rect.width, rect.height);
        ripple.style.position='absolute';
        ripple.style.left=(e.clientX-rect.left-d/2)+'px';
        ripple.style.top=(e.clientY-rect.top-d/2)+'px';
        ripple.style.width=ripple.style.height=d+'px';
        ripple.style.borderRadius='50%';
        ripple.style.background='rgba(154,240,227,.35)';
        ripple.style.transform='scale(0)';
        ripple.style.animation='hero3-ripple .6s ease-out forwards';
        btn.appendChild(ripple);
        ripple.addEventListener('animationend', ()=> ripple.remove());
      });
    });
  };

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', boot);
  } else { boot(); }
})();
  `,
  php: ''
};




export default { Hero1, Hero2, Hero3 };
