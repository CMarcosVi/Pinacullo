// ======== Módulo: Gerador de Link do WhatsApp ========
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

// ======== Módulo: Gerador de QR Code ========
let qrCode;

function generateQR() {
  const text = document.getElementById("text").value;
  const size = parseInt(document.getElementById("size").value) || 250;
  const color = document.getElementById("color").value || "#000000";
  const bgColor = document.getElementById("bgColor").value || "#ffffff";
  const imageInput = document.getElementById("image");
  const qrcodeContainer = document.getElementById("qrcode-container");
  const downloadButtons = document.getElementById("download-buttons");

  if (!text) {
    alert("Digite um texto ou link para gerar o QR Code.");
    return;
  }

  qrcodeContainer.innerHTML = ""; // Limpa o anterior

  const qrOptions = {
    width: size,
    height: size,
    data: text,
    image: "",
    dotsOptions: {
      color: color,
      type: "rounded"
    },
    backgroundOptions: {
      color: bgColor
    },
    imageOptions: {
      crossOrigin: "anonymous",
      margin: 4
    }
  };

  const createQR = (options) => {
    qrCode = new QRCodeStyling(options);
    qrCode.append(qrcodeContainer);
    downloadButtons.classList.remove("hidden");
  };

  if (imageInput.files && imageInput.files[0]) {
    const reader = new FileReader();
    reader.onload = () => {
      qrOptions.image = reader.result;
      createQR(qrOptions);
    };
    reader.readAsDataURL(imageInput.files[0]);
  } else {
    createQR(qrOptions);
  }
}

function download(format) {
  if (!qrCode) return;
  qrCode.download({ name: "qr-code", extension: format });
}
