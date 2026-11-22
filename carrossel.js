/* D&E Poltronas - carrossel.js | Reparação da rotação automática
   Arquivo independente. Não altera o script.js original.
   Usa os elementos do index.html já publicado. */
(() => {
  'use strict';
  const carousel = document.getElementById('deCarousel');
  if (!carousel) return;

  const slides = Array.from(carousel.querySelectorAll('.de-carousel-slide'));
  const dots = Array.from(carousel.querySelectorAll('[data-de-dot]'));
  const previous = carousel.querySelector('[data-de-prev]');
  const next = carousel.querySelector('[data-de-next]');
  const pause = carousel.querySelector('[data-de-pause]');
  const status = document.getElementById('deCarouselStatus');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const INTERVAL_MS = 6000;

  if (slides.length < 1) return;
  // Retira o controle de pausa do HTML antigo sem exigir edição do index.html.
  pause?.remove();
  let current = slides.findIndex(slide => slide.classList.contains('is-active'));
  if (current < 0) current = 0;
  let intervalId = null;
  let touchStart = null;

  function showSlide(target, announce = false) {
    current = (target + slides.length) % slides.length;
    for (let i = 0; i < slides.length; i += 1) {
      const active = i === current;
      slides[i].classList.toggle('is-active', active);
      slides[i].setAttribute('aria-hidden', String(!active));
    }
    dots.forEach((dot, i) => {
      dot.classList.toggle('is-active', i === current);
      dot.setAttribute('aria-current', String(i === current));
    });
    if (announce && status) status.textContent = `Banner ${current + 1} de ${slides.length}`;
  }

  function stop() {
    if (intervalId !== null) {
      window.clearInterval(intervalId);
      intervalId = null;
    }
  }
  function start() {
    stop();
    // Respeita preferência de acessibilidade e não roda com a aba oculta.
    if (slides.length > 1 && !reducedMotion.matches && !document.hidden) {
      intervalId = window.setInterval(() => showSlide(current + 1), INTERVAL_MS);
    }
  }
  function goTo(target) {
    showSlide(target, true);
    start();
  }

  previous?.addEventListener('click', () => goTo(current - 1));
  next?.addEventListener('click', () => goTo(current + 1));
  dots.forEach((dot, index) => dot.addEventListener('click', () => goTo(index)));

  carousel.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') { event.preventDefault(); goTo(current - 1); }
    if (event.key === 'ArrowRight') { event.preventDefault(); goTo(current + 1); }
  });

  carousel.addEventListener('touchstart', (event) => {
    if (event.touches.length !== 1) return;
    touchStart = { x: event.touches[0].clientX, y: event.touches[0].clientY };
  }, { passive: true });
  carousel.addEventListener('touchend', (event) => {
    if (!touchStart || !event.changedTouches.length) return;
    const dx = event.changedTouches[0].clientX - touchStart.x;
    const dy = event.changedTouches[0].clientY - touchStart.y;
    touchStart = null;
    if (Math.abs(dx) >= 45 && Math.abs(dx) > Math.abs(dy) * 1.3) {
      goTo(current + (dx < 0 ? 1 : -1));
    }
  }, { passive: true });

  document.addEventListener('visibilitychange', start);
  if (typeof reducedMotion.addEventListener === 'function') {
    reducedMotion.addEventListener('change', start);
  }
  showSlide(current);
  start();
})();
