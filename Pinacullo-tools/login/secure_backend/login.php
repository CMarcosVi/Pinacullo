<?php
require_once __DIR__ . '/env.php';
header('Content-Type: application/json');
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  http_response_code(405);
  exit(json_encode(['success'=>false,'error'=>'Método não permitido']));
}
ini_set('display_errors',0); error_reporting(0);

function sanitize($s){ return htmlspecialchars(strip_tags(trim($s)),ENT_QUOTES,'UTF-8'); }

/* ----------- entrada -------------------------------------------- */
$access   = sanitize($_POST['access'] ?? '');
$password = sanitize($_POST['password'] ?? '');
if (!$access || !$password)
  exit(json_encode(['success'=>false,'error'=>'Preencha todos os campos.']));

/* ----------- DB -------------------------------------------------- */
try{
  $pdo = new PDO(
          "mysql:host={$_ENV['DB_HOST']};dbname={$_ENV['DB_NAME']};charset=utf8mb4",
          $_ENV['DB_USER'], $_ENV['DB_PASS'],
          [PDO::ATTR_ERRMODE=>PDO::ERRMODE_EXCEPTION,
           PDO::ATTR_DEFAULT_FETCH_MODE=>PDO::FETCH_ASSOC]);

  $st = $pdo->prepare('SELECT id,password FROM users WHERE access=:a LIMIT 1');
  $st->execute([':a'=>$access]);
  $user = $st->fetch();
  if (!$user) throw new RuntimeException('Usuário ou senha inválidos.');

  /* --------- ❶ decifra a senha do BD (seu triplo-cripto) ---------
     … mantenha aqui o código RSA → AES → Base64 já implementado … */

  if (!hash_equals($senhaOriginal, $password))
      throw new RuntimeException('Usuário ou senha inválidos.');

  /* --------- ❷ tokens ------------------------------------------- */
  $token_cookie = bin2hex(random_bytes(32));   // HttpOnly
  $token_ls     = bin2hex(random_bytes(32));   // localStorage

  $up = $pdo->prepare('UPDATE users SET cookie=:c, local_storage=:ls WHERE id=:id');
  $up->execute([':c'=>$token_cookie, ':ls'=>$token_ls, ':id'=>$user['id']]);

  /* cookie seguro */
  setcookie('auth_token', $token_cookie, [
    'expires'  => time()+60*60*24*7,
    'path'     => '/',
    'domain'   => $_ENV['COOKIE_DOMAIN'] ?? '',
    'secure'   => true,
    'httponly' => true,
    'samesite' => 'Strict'
  ]);

  echo json_encode(['success'=>true,'token'=>$token_ls]);
}catch(Throwable $e){
  http_response_code(401);
  echo json_encode(['success'=>false,'error'=>$e->getMessage()]);
}
