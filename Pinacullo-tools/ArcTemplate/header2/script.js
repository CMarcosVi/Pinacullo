(function(){
      const nav = document.querySelector('.glass-nav');
      const menu = document.getElementById('navMenu');
      const toggle = document.getElementById('navToggle');
      if(!nav || !menu || !toggle) return;

      // Dispara animações quando a página terminar de carregar
      if(document.readyState === 'complete') document.body.classList.add('is-ready');
      else window.addEventListener('load', () => document.body.classList.add('is-ready'), { once:true });

      // Mobile toggle + acessibilidade
      const onOutside = ev => { if(!nav.contains(ev.target)) close(); };
      const onKey = ev => { if(ev.key === 'Escape') close(); };

      function open(){
        nav.classList.add('open');
        toggle.setAttribute('aria-expanded','true');
        const first = menu.querySelector('a');
        if(first) first.focus({ preventScroll:true });
        document.addEventListener('click', onOutside, true);
        document.addEventListener('keydown', onKey);
      }
      function close(){
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded','false');
        toggle.focus({ preventScroll:true });
        document.removeEventListener('click', onOutside, true);
        document.removeEventListener('keydown', onKey);
      }

      toggle.addEventListener('click', () => nav.classList.contains('open') ? close() : open());

      // Fecha o menu ao sair do breakpoint mobile
      const mq = window.matchMedia('(min-width: 841px)');
      mq.addEventListener('change', e => { if(e.matches) close(); });
    })();