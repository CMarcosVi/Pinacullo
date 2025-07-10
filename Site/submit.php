<?php
/**
 * submit.php — Processa JSON {email, phone} e encaminha via FormSubmit.co
 * Segurança aplicada:
 * • HTTPS obrigatório
 * • Apenas POST + Content‑Type application/json
 * • Rate‑limit (15 s) na sessão
 * • CSRF via X‑CSRF‑Token
 * • Sanitização & validação robustas
 * • Envio com cURL para https://formsubmit.co/ajax/commercial@pinacullo.com
 */

declare(strict_types=1);
session_start();

/* ---------- 1. HTTPS ---------- */
if (empty($_SERVER['HTTPS']) || $_SERVER['HTTPS'] !== 'on') {
    http_response_code(400);
    exit(json_encode(['error' => 'HTTPS required']));
}

/* ---------- 2. Método & cabeçalho ---------- */
if ($_SERVER['REQUEST_METHOD'] !== 'POST' ||
    stripos($_SERVER['CONTENT_TYPE'] ?? '', 'application/json') === false) {
    http_response_code(415);
    exit(json_encode(['error' => 'Invalid Content-Type']));
}

/* ---------- 3. Rate‑limit ---------- */
$interval = 15;                 // segundos
if (time() - ($_SESSION['last_submit'] ?? 0) < $interval) {
    http_response_code(429);
    exit(json_encode(['error' => 'Slow down']));
}

/* ---------- 4. CSRF ---------- */
if (!isset($_SESSION['csrf_token'], $_SERVER['HTTP_X_CSRF_TOKEN']) ||
    !hash_equals($_SESSION['csrf_token'], $_SERVER['HTTP_X_CSRF_TOKEN'])) {
    http_response_code(403);
    exit(json_encode(['error' => 'CSRF mismatch']));
}

/* ---------- 5. JSON ---------- */
$payload = json_decode(file_get_contents('php://input'), true, 512, JSON_THROW_ON_ERROR);

$email = filter_var(trim($payload['email'] ?? ''), FILTER_SANITIZE_EMAIL);
$phone = preg_replace('/[^\d\s()+\-]/', '', $payload['phone'] ?? '');

if (!filter_var($email, FILTER_VALIDATE_EMAIL) || strlen($email) > 254) {
    http_response_code(422);
    exit(json_encode(['error' => 'Invalid email']));
}
if (!preg_match('/^[\d\s()+\-]{8,20}$/', $phone)) {
    http_response_code(422);
    exit(json_encode(['error' => 'Invalid phone']));
}

/* ---------- 6. FormSubmit ---------- */
$fsData = http_build_query([
    'Email'    => $email,
    'Telefone' => $phone,
    '_subject' => 'Novo orçamento do site',
    '_captcha' => 'false'
]);

$ch = curl_init('https://formsubmit.co/ajax/commercial@pinacullo.com');
curl_setopt_array($ch, [
    CURLOPT_POST           => true,
    CURLOPT_POSTFIELDS     => $fsData,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_TIMEOUT        => 10,
    CURLOPT_HTTPHEADER     => [
        'Content-Type: application/x-www-form-urlencoded',
        'Accept: application/json'
    ],
    CURLOPT_USERAGENT      => 'PinaculloForm/1.0'
]);

$response = curl_exec($ch);
$code     = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($response === false || $code >= 400) {
    http_response_code(502);
    exit(json_encode(['error' => 'Upstream error']));
}

/* ---------- 7. Sucesso ---------- */
$_SESSION['last_submit'] = time();
header('Content-Type: application/json');
echo $response;
