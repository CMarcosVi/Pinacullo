(function () {
      const header   = document.getElementById('site-header');
      const btnOpen  = document.getElementById('navToggle');
      const btnClose = document.getElementById('navClose');
      const panel    = document.getElementById('mobileNav');
      const links    = panel.querySelectorAll('.nav-link');

      const openMenu = () => {
        header.classList.add('open');
        document.body.classList.add('no-scroll');
        btnOpen.setAttribute('aria-expanded', 'true');
        panel.hidden = false;
      };
      const closeMenu = () => {
        header.classList.remove('open');
        document.body.classList.remove('no-scroll');
        btnOpen.setAttribute('aria-expanded', 'false');
        panel.hidden = true;
      };

      btnOpen.addEventListener('click', () => {
        const expanded = btnOpen.getAttribute('aria-expanded') === 'true';
        expanded ? closeMenu() : openMenu();
      });
      btnClose.addEventListener('click', closeMenu);
      links.forEach(a => a.addEventListener('click', closeMenu));

      // Fecha com Esc
      window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeMenu();
      });

      // Sombra ao rolar
      const onScroll = () => {
        if (window.scrollY > 2) header.classList.add('is-scrolled');
        else header.classList.remove('is-scrolled');
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();

      // Garante estado correto ao sair do mobile
      const mq = window.matchMedia('(min-width: 960px)');
      mq.addEventListener ? mq.addEventListener('change', () => { if (mq.matches) closeMenu(); })
                          : mq.addListener(() => { if (mq.matches) closeMenu(); });
    })();