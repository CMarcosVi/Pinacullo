function generateWppLink() {
  const number = document.getElementById('wppNumber').value.trim();
  const message = encodeURIComponent(document.getElementById('wppMessage').value.trim());

  if (!number) {
    alert("Por favor, insira o número do WhatsApp.");
    return;
  }

  const link = `https://api.whatsapp.com/send?phone=${number}&text=${message}`;
  const linkElement = document.getElementById('wppResult');
  linkElement.href = link;
  linkElement.textContent = link;

  document.getElementById('copyBtn').style.display = 'inline-block';
  document.getElementById('copyStatus').textContent = '';
}

function copyLink() {
  const link = document.getElementById('wppResult').textContent;
  navigator.clipboard.writeText(link).then(() => {
    document.getElementById('copyStatus').textContent = 'Link copiado com sucesso!';
  }, () => {
    document.getElementById('copyStatus').textContent = 'Falha ao copiar o link.';
  });
}
