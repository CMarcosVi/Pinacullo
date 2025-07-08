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


export default { Hero1, Hero2 };
