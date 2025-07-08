/* =========================================================
 * sections.ts – Blocos de conteúdo (HTML/CSS/JS/PHP)
 * ---------------------------------------------------------
 * Cada objeto representa um "fragmento" que pode ser
 * combinado pelo seu gerador. Mantive tudo em template
 * literals (`) para multilinhas, escapando o que fosse
 * necessário. Ajuste os trechos conforme o projeto crescer.
 * =========================================================*/

interface Section {
  html: string;
  css : string;
  js  : string;
  php : string;
}

/* ---------------------------------------------------------
 * Form1 – Hero + formulário com máscaras e envio via PHP
 * ---------------------------------------------------------*/
const Form1: Section = {
  /* ------------------------- HTML ------------------------ */
  html: `
<section class="hero">
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
    <img src="https://dummyimage.com/48x48/ffffff/000.png&text=Ad" alt="Ad Logo" width="48" height="48" style="border-radius:0.5rem;" />
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

  /* ------------------------- CSS ------------------------- */
  css: `/* Estilos específicos do Hero podem ser adicionados aqui */`,

  /* -------------------------- JS ------------------------- */
  js: `/* ---------- utilidades de máscara ---------- */
const maskTel = (value) => {
  // remove tudo que não for dígito
  const nums = value.replace(/\D/g, '').slice(0, 11); // máx. 11 dígitos
  const len  = nums.length;

  if (len <= 2) return '(' + nums;
  if (len <= 7) return '(' + nums.slice(0,2) + ') ' + nums.slice(2);
  return '(' + nums.slice(0,2) + ') ' + nums.slice(2,7) + '-' + nums.slice(7);
};

const maskNome = (value) =>
  value.replace(/[^A-Za-zÀ-ÿ\s]/g, '').replace(/\s{2,}/g, ' ');

/* ---------- aplica máscara ao digitar ---------- */
document.getElementById('tel').addEventListener('input', e => {
  e.target.value = maskTel(e.target.value);
});

document.getElementById('nome').addEventListener('input', e => {
  e.target.value = maskNome(e.target.value);
});

/* ---------- envio do formulário ---------- */
const f   = document.getElementById('form');
const s   = document.getElementById('status');
const btn = f.querySelector('button');

f.addEventListener('submit', async e => {
  e.preventDefault();

  /* --- SANITIZAÇÃO --- */
  const nome  = maskNome(f.nome.value.trim());
  const email = f.email.value.trim().toLowerCase();
  const tel   = maskTel(f.tel.value.trim());

  /* --- VALIDAÇÃO --- */
  const rxNome  = /^[A-Za-zÀ-ÿ\s]{2,60}$/;
  const rxTel   = /^\(\d{2}\) \d{4,5}-\d{4}$/;
  const ok =
    rxNome.test(nome) &&
    f.email.checkValidity() &&
    rxTel.test(tel);

  if (!ok) {
    s.textContent = 'Verifique os campos: formato inválido.';
    s.style.color = 'orange';
    return;
  }

  const payload = { nome, email, tel };

  try {
    btn.disabled = true;
    s.textContent = 'Enviando…';
    s.style.color = 'inherit';

    const res  = await fetch('enviar.php', {
      method : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body   : JSON.stringify(payload)
    });

    const data = await res.json();  // PHP devolve JSON
    console.log('PHP-resp:', data);

    if (data.ok) {
      s.textContent = 'Enviado com sucesso!';
      s.style.color = 'green';
      f.reset();
    } else {
      s.textContent = data.message || 'Falha no envio.';
      s.style.color = 'red';
    }
  } catch (err) {
    console.error(err);
    s.textContent = 'Erro de rede. Tente novamente.';
    s.style.color = 'red';
  } finally {
    btn.disabled = false;
  }
});`,

  /* ------------------------- PHP ------------------------ */
  php: `<?php
declare(strict_types=1);

/* não devolve nada se NÃO for POST ------------------------- */
$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
if ($method !== 'POST') {
    // (GET, DELETE, PUT, etc.) → 204 No Content
    http_response_code(204);
    exit;
}

/* -----------------------------------------------
 *  Daqui para baixo roda apenas quando for POST
 * ----------------------------------------------- */
header('Content-Type: application/json; charset=utf-8');
ini_set('display_errors', 1);            // 0 em produção
error_reporting(E_ALL);

/* lê JSON bruto ------------------------------------------------ */
$payload = json_decode(file_get_contents('php://input'), true) ?? [];
if (!$payload) {
    echo json_encode(['ok'=>false,'message'=>'JSON inválido']); exit;
}

/* sanitização -------------------------------------------------- */
$nome  = preg_replace('/\s{2,}/', ' ',
         preg_replace('/[^A-Za-zÀ-ÿ\s]/u', '', trim($payload['nome']  ?? '')));
$email = filter_var(strtolower(trim($payload['email'] ?? '')), FILTER_SANITIZE_EMAIL);
$tel   = substr(preg_replace('/\D/', '', $payload['tel'] ?? ''), 0, 11);

if (strlen($tel) >= 10) {
    $tel = sprintf('(%s) %s-%s',
        substr($tel,0,2),
        strlen($tel) === 11 ? substr($tel,2,5) : substr($tel,2,4),
        strlen($tel) === 11 ? substr($tel,7,4) : substr($tel,6,4)
    );
}

$rxNome = '/^[A-Za-zÀ-ÿ\s]{2,60}$/u';
$rxTel  = '/^\(\d{2}\) \d{4,5}-\d{4}$/';

if (!preg_match($rxNome,$nome) ||
    !filter_var($email,FILTER_VALIDATE_EMAIL) ||
    !preg_match($rxTel,$tel)) {
    echo json_encode(['ok'=>false,'message'=>'Campos inválidos']); exit;
}

/* monta payload para FormSubmit -------------------------------- */
$form = [
  'nome'      => $nome,
  'email'     => $email,
  'tel'       => $tel,
  '_captcha'  => 'false',
  '_subject'  => 'Nova inscrição pelo site',
  '_template' => 'box'
];

$endpoint = 'https://formsubmit.co/ajax/contato@terapeutasimonerocha.com';

/* POST via cURL ------------------------------------------------ */
$ch = curl_init($endpoint);
curl_setopt_array($ch, [
  CURLOPT_POST            => true,
  CURLOPT_RETURNTRANSFER  => true,
  CURLOPT_FOLLOWLOCATION  => true,
  CURLOPT_TIMEOUT         => 15,
  CURLOPT_POSTFIELDS      => http_build_query($form),
  CURLOPT_HTTPHEADER      => [
    'Content-Type: application/x-www-form-urlencoded',
    'Accept: application/json',
    'X-Requested-With: XMLHttpRequest',
    'Referer: https://terapeutasimonerocha.com/'
  ]
]);

$resp  = curl_exec($ch);
$err   = curl_error($ch);
$code  = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

/* resposta uniforme ------------------------------------------- */
if ($err) {
    echo json_encode(['ok'=>false,'message'=>'cURL erro','info'=>$err]);
} elseif ($code === 200) {
    echo json_encode(['ok'=>true,'message'=>'Enviado via FormSubmit']);
} else {
    echo json_encode(['ok'=>false,'message'=>'FormSubmit falhou','status'=>$code,'resp'=>$resp]);
}
?>`
};

export default { Form1 };
