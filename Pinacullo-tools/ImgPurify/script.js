const $ = s => document.querySelector(s);

let originalSize = 0;

/* pré-visualiza tamanho original ao escolher arquivo */
$('#img-in').addEventListener('change', e => {
  const file = e.target.files[0];
  if (!file) return;
  originalSize = file.size;
  $('#stats').hidden = true;
  $('#preview').hidden = true;
});

/* pipeline principal */
$('#process-btn').onclick = async () => {
  const file = $('#img-in').files[0];
  if (!file) return alert('Selecione uma imagem.');

  /* carrega imagem em bitmap para pica */
  const bmp = await createImageBitmap(file);

  /* dimensões destino */
  const w = +$('#img-w').value || bmp.width;
  const h = +$('#img-h').value || Math.round(bmp.height * (w / bmp.width));

  /* canvas destino + resize HQ */
  const canvas = $('#preview');
  canvas.width = w; canvas.height = h;
  await pica().resize(bmp, canvas);        // HQ resize
  canvas.hidden = false;

  /* blob final */
  const fmt = $('#img-fmt').value;
  const q   = fmt === 'image/png' ? undefined : +$('#img-q').value || .8;
  const blob = await new Promise(r => canvas.toBlob(r, fmt, q));

  /* estatísticas */
  const newKB   = (blob.size / 1024).toFixed(1);
  const origKB  = (originalSize || file.size) / 1024;
  const percent = (100 * (1 - blob.size / (originalSize || file.size))).toFixed(1);
  $('#stats').innerHTML =
    `Original: <b>${origKB.toFixed(1)} KB</b><br>
     Final: <b>${newKB} KB</b><br>
     Economia: <b>${percent}%</b>`;
  $('#stats').hidden = false;

  /* download automático */
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `imagem_${w}x${h}.${fmt.split('/')[1]}`;
  a.click();
};