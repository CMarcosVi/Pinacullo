/* =====================================================
 * staticFiles.ts – Boilerplate SEO-ready para o gerador
 * =====================================================
 * Este arquivo define o conteúdo "estático" que será
 * injetado pelo ARC‑Generator sempre que um novo projeto
 * for criado. Modifique com cautela: as strings aqui
 * presentes são fonte única para os templates gerados.
 * -----------------------------------------------------*/

/**
 * Conteúdo-base que virá “pré-carregado” na tela /arc-generator.
 * Edite aqui para mudar o boilerplate global do projeto.
 */
export interface StaticDefaults {
  wrapper : string; // HTML com placeholder <!-- CONTENT -->
  robots  : string;
  htaccess: string;
  cssBase : string; // trechos que SEMPRE vão antes do css gerado
  jsBase  : string; // trechos que SEMPRE vão antes do js gerado
  php: string;
}

const staticFiles: StaticDefaults = {
  /* =================================================
   * 1) HTML WRAPPER – estrutura semântica + SEO prontos
   *    ➜ Substitua os placeholders (<!-- … -->) antes de publicar
   * =================================================*/
  wrapper: `<!DOCTYPE html>
<html lang="pt-BR" prefix="og: http://ogp.me/ns#">
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <title><!-- Máx. 60 carac. — ex.: “Título da Página | Marca” --></title>
  <meta name="description" content="<!-- 155‑160 carac. — resumo persuasivo da página -->">
  <meta name="robots" content="index,follow">

  <!-- Ícones & tema -->
  <link rel="icon" href="favicon-32.png" sizes="32x32">
  <link rel="apple-touch-icon" href="apple-touch-icon.png">
  <meta name="theme-color" content="#000000">

  <!-- Canonical → evita conteúdo duplicado -->
  <link rel="canonical" href="https://www.seusite.com.br/">

  <!-- Open Graph / LinkedIn / Facebook -->
  <meta property="og:locale"        content="pt_BR">
  <meta property="og:type"          content="website">
  <meta property="og:site_name"     content="Nome da Marca">
  <meta property="og:title"         content=""><!-- Ajuste dinamicamente -->
  <meta property="og:description"   content=""><!-- Ajuste dinamicamente -->
  <meta property="og:url"           content="https://www.seusite.com.br/">
  <meta property="og:image"         content="https://www.seusite.com.br/og-image.jpg">
  <meta property="og:image:width"   content="1200">
  <meta property="og:image:height"  content="630">

  <!-- Twitter Card -->
  <meta name="twitter:card"        content="summary_large_image">
  <meta name="twitter:site"        content="@usuario">
  <meta name="twitter:title"       content=""><!-- Ajuste dinamicamente -->
  <meta name="twitter:description" content=""><!-- Ajuste dinamicamente -->
  <meta name="twitter:image"       content="https://www.seusite.com.br/og-image.jpg">

  <!-- Performance – preload do CSS crítico -->
  <link rel="preload" href="styles.css" as="style" onload="this.rel='stylesheet'">
  <noscript><link rel="stylesheet" href="styles.css"></noscript>

  <!-- Schema.org – dados estruturados básicos (WebSite) -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type"   : "WebSite",
    "name"    : "Nome da Marca",
    "url"     : "https://www.seusite.com.br/",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://www.seusite.com.br/busca?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  }
  </script>
</head>
<body>

  <!-- CONTENT -->

  <script src="scripts.js" defer></script>
</body>
</html>`,

  /* =================================================
   * 2) robots.txt – indexação e Sitemap
   * =================================================*/
  robots: `User-agent: *
Allow: /
Sitemap: https://www.seusite.com.br/sitemap.xml`,

  /* =================================================
   * 3) .htaccess – segurança & performance básicas
   * =================================================*/
  htaccess: `# ————————————————————————————————
# .htaccess – recomendações básicas
# ————————————————————————————————

# 3.1) Desabilita listagem de diretório
Options -Indexes

# 3.2) Força HTTPS (comentado se não for usar SSL)
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteCond %{HTTPS} !=on
  RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
</IfModule>

# 3.3) Headers de segurança essenciais
<IfModule mod_headers.c>
  Header set X-Content-Type-Options "nosniff"
  Header set X-Frame-Options "SAMEORIGIN"
  Header set X-XSS-Protection "1; mode=block"
  Header set Referrer-Policy "strict-origin-when-cross-origin"
</IfModule>

# 3.4) Compressão Gzip/Deflate
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/css application/javascript application/json
</IfModule>`,

  /* =================================================
   * 4) CSS base – reset simples + variáveis
   * =================================================*/
  cssBase: `/* ===== CSS base – reset + variáveis ===== */
:root {
  --font-stack : system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  --color-bg   : #fff;
  --color-text : #111;
}
*, *::before, *::after { box-sizing: border-box; }
body {
  margin: 0;
  font-family: var(--font-stack);
  background : var(--color-bg);
  color      : var(--color-text);
  line-height: 1.5;
}`,

  /* =================================================
   * 5) JS base – pequenos utilitários
   * =================================================*/
  jsBase: `// ===== JS base =====
document.addEventListener('DOMContentLoaded', () => {
  console.log('Template carregado');
  const yearEl = document.getElementById('ano');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
});`,
php:'',
};

export default staticFiles;
