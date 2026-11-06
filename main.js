/* ==========================================================================
   HUGO'S Cafetería · Ignis Studio
   1. Idioma (EN/ES)   2. Menú móvil   3. Scroll suave (Lenis)
   4. Secuencia de frames en canvas   5. Capítulos   6. Animaciones de entrada
   ========================================================================== */
(() => {
  'use strict';
  document.documentElement.classList.remove('no-js');

  const WHATSAPP = '15125550199'; // Número de ejemplo (concepto). Cambiar por el real del cliente.
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced) document.documentElement.classList.add('reduced');

  /* ---------------- 1. Idioma ---------------- */
  const ES = {
    skip: 'Ir al contenido', brandSub: 'CAFETERÍA', navMenu: 'Menú', navStory: 'Historia', navVisit: 'Visitanos',
    order: 'Pedí por adelantado', scroll: 'Deslizá',
    c0script: 'Desde la mesa de Hugo', c0title: 'Café hecho con el corazón.',
    c0text: 'Granos de origen único, tostados en pequeños lotes y molidos en el momento.', c0cta: 'Ver el menú',
    c1title: 'Recién extraído, siempre.', c1text: 'Crema espesa, notas de caramelo y cacao. Esta temporada: Huila, Colombia.',
    c2title: 'Mitad espresso, mitad leche tibia.', c2text: 'El cortado: el sabor de cada mañana en Buenos Aires.',
    c3title: 'La mejor parte de la tarde.', c3text: 'Medialunas de manteca horneadas cada mañana, como en la mesa de mi papá.', c3cta: 'Encontrá tu merienda',
    picksEyebrow: 'Nuestros clásicos', picksTitle: 'Encontrá tu taza', picksLead: 'Lo que te pediríamos en tu primera visita.',
    p2name: 'Medialunas de manteca', p4name: 'Alfajores de maicena', picksCta: 'Ver el menú completo',
    d1: 'Nuestro latte de la casa: doble shot del Huila, Colombia, de esta temporada, con leche cremosa y una rosetta arriba. Suave, con un toque de caramelo, nunca amargo.',
    d1tag: 'Caliente o helado',
    d2: 'La medialuna argentina: más chica, más dulce y pintada con almíbar. Hojaldrada con manteca durante la noche y horneada cada mañana. Mojala en el cortado.',
    d2tag: '2 unidades · del día',
    d3: 'Un tostado como corresponde: jamón, queso derretido y morrón asado, prensado en pan de campo hasta quedar crocante. El desayuno que te banca hasta el almuerzo.',
    d3tag: 'Prensado al momento',
    d4: 'Dos tapitas de maicena que se deshacen en la boca, una capa generosa de dulce de leche y coco rallado en el borde. El sabor de cualquier infancia argentina.',
    d4tag: '2 unidades · dulce de leche',
    storyEyebrow: 'Nuestra historia', storyTitle: 'Un lugar con el nombre de mi papá.',
    story1: 'Mi papá se llamaba Hugo. La mesa de la cocina era el centro de todo: café a la mañana, algo dulce sobre la mesa y gente que iba y venía. Siempre había lugar para uno más.',
    story2: 'Cuando me mudé a Texas, traje esa mesa conmigo. Café de especialidad bien hecho, las facturas con las que crecí y un lugar que se siente como la casa de alguien.',
    s1: 'Horneado en casa', s2: 'Países, una sola mesa', s3: 'Nombre que lo empezó todo',
    menuEyebrow: 'El menú completo', menuTitle: 'Todo lo que hay en la barra',
    m1: 'Café y bebidas', m2: 'Pastelería argentina', m3: 'Sándwiches y tostadas',
    iced: 'Latte helado de caramelo', chipa: 'Chipá · sin gluten', avo: 'Tostada de palta', mila: 'Sándwich de milanesa',
    specialScript: 'Hora de la merienda', specialTitle: 'Hora en familia · mar a vie, 4 a 6 PM', specialText: '20% off en pastelería con cualquier café. Vení con toda la familia.',
    visitEyebrow: 'Muy pronto', visitTitle: 'Sentate con nosotros en Austin.',
    visitLead: 'Pedí para llevar, consultá por catering o simplemente saludá. Respondemos por WhatsApp.',
    waCta: 'Escribinos por WhatsApp', addr: 'La dirección exacta se comparte al pedir o reservar.',
    wk: 'Lun a vie', we: 'Sáb y dom', arg: 'Más adelante. Estamos buscando la esquina ideal para el segundo HUGO\'S.',
    foot: 'Café, facturas y la mesa de Hugo. Cafetería en concepto, todavía no abrió.', madeBy: 'Web por'
  };
  const nodes = [...document.querySelectorAll('[data-i18n]')];
  const EN = {};
  nodes.forEach(n => { EN[n.dataset.i18n] = n.textContent; });
  const WA_TEXT = { en: "Hi HUGO'S! I'd like to ", es: '¡Hola HUGO\'S! Quisiera ' };

  function setLang(lang) {
    const dict = lang === 'es' ? ES : EN;
    nodes.forEach(n => { const v = dict[n.dataset.i18n]; if (v) n.textContent = v; });
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-lang]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.lang === lang)));
    document.querySelectorAll('[data-wa]').forEach(a => {
      a.href = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(WA_TEXT[lang])}`;
      a.target = '_blank'; a.rel = 'noopener';
    });
    try { localStorage.setItem('hugos-lang', lang); } catch (e) {}
  }
  let saved = null;
  try { saved = localStorage.getItem('hugos-lang'); } catch (e) {}
  setLang(saved || ((navigator.language || 'en').startsWith('es') ? 'es' : 'en'));
  document.querySelectorAll('[data-lang]').forEach(b => b.addEventListener('click', () => setLang(b.dataset.lang)));

  /* ---------------- 2. Menú móvil ---------------- */
  const burger = document.getElementById('burger');
  const nav = document.getElementById('nav');
  burger.addEventListener('click', () => {
    const open = burger.getAttribute('aria-expanded') !== 'true';
    burger.setAttribute('aria-expanded', String(open));
    nav.classList.toggle('is-open', open);
  });
  nav.addEventListener('click', e => { if (e.target.closest('a')) { burger.setAttribute('aria-expanded', 'false'); nav.classList.remove('is-open'); } });

  /* ---------------- 6. Animaciones de entrada ---------------- */
  const io = new IntersectionObserver(entries => {
    entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); } });
  }, { rootMargin: '0px 0px -10% 0px' });
  document.querySelectorAll('.reveal').forEach((el, i) => { el.style.transitionDelay = `${(i % 4) * 80}ms`; io.observe(el); });

  /* ---------------- 3. Scroll suave (Lenis) + GSAP ---------------- */
  const motion = !!window.gsap && !reduced;
  if (motion) {
    gsap.registerPlugin(ScrollTrigger);
    if (window.Lenis) {
      const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add(t => lenis.raf(t * 1000));
      gsap.ticker.lagSmoothing(0);
      document.querySelectorAll('a[href^="#"]').forEach(a => a.addEventListener('click', e => {
        const el = document.querySelector(a.getAttribute('href'));
        if (el) { e.preventDefault(); lenis.scrollTo(el, { offset: a.getAttribute('href') === '#top' ? 0 : -60 }); }
      }));
    }
    initFan();
    initAmbient();
  }

  /* ---------------- 8. Ambiente de las otras secciones ----------------
     Luz de ventana que se desplaza, foto con parallax dentro del arco,
     "Hugo" que se desliza y la frase Austin · Buenos Aires que avanza. */
  function initAmbient() {
    const scrub = (trigger, vars) => ({ ease: 'none', ...vars, scrollTrigger: { trigger, start: 'top bottom', end: 'bottom top', scrub: true } });
    gsap.utils.toArray('.amb--light').forEach(el => {
      gsap.fromTo(el, { xPercent: -8, opacity: 0.55 }, scrub(el.parentElement, { xPercent: 12, opacity: 0.9 }));
    });
    const story = document.querySelector('.story');
    gsap.fromTo('.story__arch img', { yPercent: -12 }, scrub(story, { yPercent: 0 }));
    const narrow = window.matchMedia('(max-width: 760px)').matches;
    gsap.fromTo('.story__word', { xPercent: narrow ? -6 : -62 }, scrub(story, { xPercent: narrow ? 0 : -38 }));
    const visit = document.querySelector('.visit');
    gsap.fromTo('.visit__marquee', { xPercent: 0 }, scrub(visit, { xPercent: -28 }));
    gsap.fromTo('.amb--glow', { xPercent: -62, yPercent: -55 }, scrub(visit, { xPercent: -38, yPercent: -45 }));
  }

  /* ---------------- 7. Abanico de platos ----------------
     Mazo → abanico → cada plato pasa al frente con su explicación → vuelve al abanico. */
  function initFan() {
    const section = document.querySelector('.picks');
    const head = section.querySelector('.picks__head');
    const fan = section.querySelector('.fan');
    const cards = gsap.utils.toArray('.fan__card');
    const dishes = gsap.utils.toArray('.dish');
    const cta = section.querySelector('.picks__cta');
    const arch = section.querySelector('.fan__arch');
    const light = section.querySelector('.picks__light');
    // Color del arco según el plato al frente (combina con el fondo de cada foto)
    const ARCH = ['#C9673C', '#E6CFAE', '#3A2418', '#B4532A'];
    const ARCH_BASE = '#D9AE86';
    section.classList.add('is-anim');

    const mm = gsap.matchMedia();
    mm.add({ mobile: '(max-width: 760px)', desktop: '(min-width: 761px)' }, ctx => {
      const { mobile } = ctx.conditions;
      const cw = cards[0].offsetWidth;
      const spread = mobile ? 0.27 : 0.42;           // separación horizontal del abanico
      const ROT = mobile ? [-10, -3.5, 3.5, 10] : [-20, -7, 7, 20];
      const fanX = i => (i - 1.5) * cw * spread;
      const fanY = i => Math.abs(i - 1.5) * cw * 0.06;

      // Estado inicial: mazo apilado, un poco más abajo
      gsap.set(cards, { x: 0, y: cw * 0.2, rotation: i => [-5, -2, 2, 5][i], scale: 0.9, opacity: 1, zIndex: i => i });
      gsap.set(dishes, { autoAlpha: 0, y: mobile ? 16 : 24 });
      gsap.set(cta, { autoAlpha: 0 });
      gsap.set(arch, { scale: 0.7, opacity: 0, transformOrigin: '50% 100%', backgroundColor: ARCH_BASE });

      const tl = gsap.timeline({
        defaults: { ease: 'power2.inOut' },
        scrollTrigger: { trigger: section, start: 'top top', end: mobile ? '+=420%' : '+=520%', pin: section.querySelector('.picks__pin'), scrub: 0.6, anticipatePin: 1 }
      });

      // 1. El mazo se abre en abanico
      tl.to(cards, { x: fanX, y: fanY, rotation: i => ROT[i], scale: 1, duration: 1, stagger: 0.06 });
      tl.to(arch, { scale: 1, opacity: 1, duration: 1, ease: 'power3.out' }, '<');

      // 2. Se va el título y el abanico deja lugar a la explicación
      tl.to(head, { autoAlpha: 0, y: -30, duration: 0.5 }, '+=0.2');
      tl.to(fan, mobile ? { y: -window.innerHeight * 0.16, scale: 0.92, duration: 0.6 } : { x: -window.innerWidth * 0.17, duration: 0.6 }, '<');

      // 3. Cada plato pasa al frente, de uno en uno
      cards.forEach((card, i) => {
        const others = cards.filter(c => c !== card);
        const at = `focus${i}`;
        tl.addLabel(at, i === 0 ? '>' : '>-0.35');
        tl.to(card, { x: 0, y: -cw * (mobile ? 0.12 : 0.18), rotation: 0, scale: mobile ? 1.06 : 1.14, opacity: 1, zIndex: 10, duration: 0.7, ease: 'power3.out' }, at);
        tl.to(others, { opacity: 0.5, scale: 0.94, duration: 0.5 }, at);
        tl.to(arch, { backgroundColor: ARCH[i], duration: 0.6, ease: 'power1.inOut' }, at);
        tl.to(dishes[i], { autoAlpha: 1, y: 0, duration: 0.5, ease: 'power2.out' }, `${at}+=0.2`);
        tl.to({}, { duration: 0.9 }); // pausa para leer
        // vuelve a su lugar en el abanico
        tl.to(dishes[i], { autoAlpha: 0, y: mobile ? -12 : -18, duration: 0.4 });
        tl.to(card, { x: fanX(i), y: fanY(i), rotation: ROT[i], scale: 1, zIndex: i, duration: 0.6 }, '<');
      });

      // 4. Final: abanico completo al centro, título y botón al menú
      tl.to(cards, { opacity: 1, scale: 1, duration: 0.5 }, '>-0.2');
      tl.to(fan, { x: 0, y: 0, scale: 1, duration: 0.7 }, '<');
      tl.to(arch, { backgroundColor: ARCH_BASE, duration: 0.6 }, '<');
      tl.to(head, { autoAlpha: 1, y: 0, duration: 0.5 }, '<0.2');
      tl.to(cta, { autoAlpha: 1, duration: 0.4 }, '<0.1');
      tl.to({}, { duration: 0.4 });

      // La luz de la ventana se desplaza despacio durante toda la escena, como el sol de la tarde
      tl.fromTo(light, { xPercent: -6, opacity: 0.6 }, { xPercent: 12, opacity: 0.95, ease: 'none', duration: tl.duration() }, 0);

      return () => { gsap.set([cards, dishes, cta, head, fan, arch, light], { clearProps: 'all' }); };
    });
  }

  const stage = document.querySelector('.stage');
  const chapters = [...document.querySelectorAll('.chapter')];
  const dots = [...document.querySelectorAll('.progress li')];
  const loader = document.getElementById('loader');
  const loaderBar = document.getElementById('loaderBar');
  const hideLoader = () => loader.classList.add('is-done');

  const setName = () => (window.innerWidth / window.innerHeight < 1 ? 'mobile' : 'desktop');

  /* Versión estática para quien prefiere menos movimiento */
  function goStatic() {
    stage.classList.add('is-static');
    chapters.forEach((c, i) => c.style.setProperty('--kf', `url(img/kf-${setName()}-${i + 1}.webp)`));
    hideLoader();
  }

  fetch('atlas/manifest.json').then(r => r.json()).then(manifest => {
    if (reduced || !window.gsap) return goStatic();
    const set = setName();
    initSequence(manifest[set], set);
  }).catch(goStatic);

  /* ---------------- 4. Secuencia de frames ----------------
     Los frames vienen agrupados de a 4 por lámina (2x2) para que el sitio
     tenga pocos archivos. frame i → lámina floor(i/4), celda i%4. */
  function initSequence(cfg, set) {
    const canvas = document.getElementById('stageCanvas');
    const ctx = canvas.getContext('2d');
    const total = cfg.count;
    const per = cfg.per;
    const sheetCount = Math.ceil(total / per);
    const sheets = new Array(sheetCount);
    const src = s => `atlas/${set}/${String(s + 1).padStart(4, '0')}.webp`;
    let current = -1;

    // Orden de carga: lámina del primer frame, las de los 4 frames clave y después el resto
    const order = [...new Set([0, ...cfg.keys.map(k => Math.floor(k / per))])];
    for (let s = 0; s < sheetCount; s++) if (!order.includes(s)) order.push(s);
    const firstBatch = Math.min(sheetCount, 10);
    let loaded = 0, started = 0;
    const PARALLEL = 4;
    function next() {
      if (started >= order.length) return;
      const s = order[started++];
      const img = new Image();
      img.decoding = 'async';
      img.onload = img.onerror = () => {
        sheets[s] = img.naturalWidth ? img : null;
        loaded++;
        if (loaded <= firstBatch) loaderBar.style.width = `${(loaded / firstBatch) * 100}%`;
        if (loaded === firstBatch) hideLoader();
        if (s === 0 || s === Math.floor(target / per)) render(true);
        next();
      };
      img.src = src(s);
    }
    for (let p = 0; p < PARALLEL; p++) next();
    const has = i => i >= 0 && i < total && !!sheets[Math.floor(i / per)];
    setTimeout(hideLoader, 4000); // por si la conexión es lenta, no bloquear

    // Canvas nítido según la pantalla (máximo 2x)
    let headerH = 0;
    function resize() {
      headerH = document.getElementById('header').offsetHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(canvas.clientWidth * dpr);
      canvas.height = Math.round(canvas.clientHeight * dpr);
      render(true);
    }

    // Dibuja el frame más cercano que ya esté cargado (efecto "cover")
    let target = 0;
    function render(force) {
      let i = target;
      if (!has(i)) {
        for (let d = 1; d < total; d++) {
          if (has(i - d)) { i = i - d; break; }
          if (has(i + d)) { i = i + d; break; }
        }
      }
      if (!has(i) || (i === current && !force)) return;
      current = i;
      const sheet = sheets[Math.floor(i / per)];
      const cell = i % per;
      const fw = cfg.w, fh = cfg.h;
      const img = { naturalWidth: fw, naturalHeight: fh };
      // El frame ocupa el área debajo del header, así las palabras gigantes no se cortan
      const cw = canvas.width, ch = canvas.height;
      const top = headerH * (canvas.width / canvas.clientWidth);
      const ah = ch - top;
      const s = Math.max(cw / img.naturalWidth, ah / img.naturalHeight);
      const w = img.naturalWidth * s, h = img.naturalHeight * s;
      ctx.fillStyle = '#EFE6D6';
      ctx.fillRect(0, 0, cw, top);
      ctx.drawImage(sheet, (cell % 2) * fw, Math.floor(cell / 2) * fh, fw, fh, (cw - w) / 2, top + (ah - h) / 2, w, h);
    }

    // Mapa scroll → frame con "descansos" en cada palabra gigante
    const k = cfg.keys;
    const P = [0, 0.07, 0.31, 0.38, 0.62, 0.69, 0.93, 1];
    const F = [k[0], k[0], k[1], k[1], k[2], k[2], k[3], k[3]];
    function frameAt(p) {
      for (let s = 1; s < P.length; s++) {
        if (p <= P[s]) {
          const t = (p - P[s - 1]) / (P[s] - P[s - 1] || 1);
          return Math.round(F[s - 1] + (F[s] - F[s - 1]) * t);
        }
      }
      return k[3];
    }

    /* ---------------- 5. Capítulos ---------------- */
    const WINDOWS = [[-1, 0.17], [0.24, 0.46], [0.53, 0.77], [0.84, 2]];
    let activeCh = 0;
    function updateChapters(p) {
      const idx = WINDOWS.findIndex(([a, b]) => p >= a && p <= b);
      chapters.forEach((c, i) => c.classList.toggle('is-active', i === idx));
      const near = p < 0.2 ? 0 : p < 0.5 ? 1 : p < 0.8 ? 2 : 3;
      if (near !== activeCh) { activeCh = near; dots.forEach((d, i) => d.classList.toggle('is-active', i === near)); }
      stage.classList.toggle('is-scrolled', p > 0.02);
    }

    ScrollTrigger.create({
      trigger: stage, start: 'top top', end: 'bottom bottom', scrub: true,
      onUpdate: self => { target = frameAt(self.progress); render(); updateChapters(self.progress); }
    });

    // Si la pantalla cambia de horizontal a vertical, recargar con el set correcto
    window.addEventListener('resize', () => {
      const now = window.innerWidth / window.innerHeight < 1 ? 'mobile' : 'desktop';
      if (now !== set) location.reload(); else resize();
    });
    resize();
    ScrollTrigger.refresh();
  }
})();
