  (function(){
    const widget = document.getElementById('wpp-widget');
    if(!widget) return;

    const WA_ORIGIN = 'https://wa.me'; // domínio fixo (evita URL injection)

    const btn = widget.querySelector('.wpp-button');
    const sheet = widget.querySelector('.wpp-sheet');
    const btnClose = widget.querySelector('.wpp-close');
    const quicks = [...widget.querySelectorAll('.wpp-quick .q')];
    const cta = widget.querySelector('.wpp-cta');
    const alt = widget.querySelector('.wpp-alt');

    let selectedMsg = '';

    function phoneDigits(str){ return (str||'').replace(/\D/g,''); }
    function buildUrl(customText){
      const phone = phoneDigits(widget.dataset.phone || '');
      const baseText = widget.dataset.text || '';
      const text = (customText || selectedMsg || baseText || 'Olá!');
      // constrói URL sempre no domínio permitido
      return `${WA_ORIGIN}/${phone}?text=${encodeURIComponent(text)}`;
    }

    function openSheet(){
      widget.classList.add('open');
      sheet.hidden = false;
      sheet.removeAttribute('inert'); // habilita interação
      btn.setAttribute('aria-expanded','true');
      (quicks[0] || cta).focus({preventScroll:true});
      const url = buildUrl();
      alt.setAttribute('href', url);
      alt.setAttribute('target','_blank');
      alt.setAttribute('rel','nofollow noopener noreferrer');
      alt.setAttribute('referrerpolicy','no-referrer');
      document.addEventListener('click', handleOutside, true);
      document.addEventListener('keydown', onKey);
    }
    function closeSheet(){
      widget.classList.remove('open');
      sheet.hidden = true;
      sheet.setAttribute('inert',''); // impede foco quando fechado
      btn.setAttribute('aria-expanded','false');
      btn.focus({preventScroll:true});
      document.removeEventListener('click', handleOutside, true);
      document.removeEventListener('keydown', onKey);
    }
    function handleOutside(e){ if(!widget.contains(e.target)) closeSheet(); }
    function onKey(e){ if(e.key === 'Escape') closeSheet(); }

    // Efeito ripple no botão
    function ripple(ev){
      const r = btn.getBoundingClientRect();
      const x = ev.clientX - r.left, y = ev.clientY - r.top;
      const s = document.createElement('span');
      s.className='wpp-ripple';
      s.style.left = x + 'px'; s.style.top = y + 'px';
      btn.appendChild(s);
      setTimeout(()=> s.remove(), 500);
    }

    // Tilt sutil com o mouse (apenas desktop)
    let tiltId;
    btn.addEventListener('mousemove', ev=>{
      cancelAnimationFrame(tiltId);
      tiltId = requestAnimationFrame(()=>{
        const b = btn.getBoundingClientRect();
        const cx = b.left + b.width/2, cy = b.top + b.height/2;
        const dx = (ev.clientX - cx)/b.width, dy = (ev.clientY - cy)/b.height;
        btn.style.transform = `translateY(-2px) rotateX(${ -dy*6 }deg) rotateY(${ dx*6 }deg)`;
      });
    });
    btn.addEventListener('mouseleave', ()=>{ btn.style.transform=''; });

    // Ações
    btn.addEventListener('click', (e)=>{ ripple(e); widget.classList.contains('open') ? closeSheet() : openSheet(); });
    btnClose.addEventListener('click', closeSheet);

    quicks.forEach(q=>{
      q.addEventListener('click', ()=>{
        quicks.forEach(i=> i.classList.remove('active'));
        q.classList.add('active');
        selectedMsg = q.dataset.msg || '';
        alt.setAttribute('href', buildUrl(selectedMsg));
      });
    });

    cta.addEventListener('click', ()=>{
      // abre nova aba/janela sem compartilhar referência nem referrer
      const url = buildUrl();
      window.open(url, '_blank', 'noopener,noreferrer');
    });

    // Inicializa estado acessível
    sheet.setAttribute('inert','');
  })();