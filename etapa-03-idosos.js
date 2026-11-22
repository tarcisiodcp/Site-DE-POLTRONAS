/* D&E Poltronas | Etapa 03 — idosos e familiares
 * Módulo isolado; deve carregar ANTES de script.js e carrossel.js.
 * Não substitui nenhum arquivo antigo.
 */
(() => {
  'use strict';

  // 1) Terceiro banner. Insere antes da inicialização do carrossel.js.
  const carousel = document.getElementById('deCarousel');
  const slideTrack = carousel?.querySelector('.de-carousel-slides');
  const controls = carousel?.querySelector('.de-carousel-controls');
  if (slideTrack && controls && !document.getElementById('de-slide-idosos')) {
    const n = slideTrack.querySelectorAll('.de-carousel-slide').length;
    const slide = document.createElement('div');
    slide.id = 'de-slide-idosos';
    slide.className = 'de-carousel-slide';
    slide.setAttribute('role', 'group');
    slide.setAttribute('aria-roledescription', 'slide');
    slide.setAttribute('aria-label', `${n + 1} de ${n + 1}`);
    slide.setAttribute('aria-hidden', 'true');
    slide.innerHTML = `
      <picture>
        <source media="(max-width: 640px)" srcset="banner-idosos-mobile.webp" type="image/webp">
        <img src="banner-idosos-desktop.webp"
          alt="Idosa sentada em poltrona elétrica reclinável; locação de poltronas para idosos e recuperação em casa"
          width="1884" height="835" loading="lazy" decoding="async">
      </picture>`;
    slideTrack.appendChild(slide);

    const dot = document.createElement('button');
    dot.type = 'button';
    dot.className = 'de-carousel-dot';
    dot.dataset.deDot = String(n);
    dot.setAttribute('aria-label', `Ir para o banner ${n + 1}`);
    dot.setAttribute('aria-current', 'false');
    controls.insertBefore(dot, controls.querySelector('[data-de-pause]'));

    slideTrack.querySelectorAll('.de-carousel-slide').forEach((item, index) => {
      item.setAttribute('aria-label', `${index + 1} de ${n + 1}`);
    });
  }

  // 2) Seção informativa: sem promessas médicas ou garantias comerciais.
  const situations = document.querySelector('.situations-section');
  if (situations && !document.getElementById('de-idosos')) {
    situations.insertAdjacentHTML('afterend', `
    <section class="de-seniors" id="de-idosos" aria-labelledby="de-seniors-title">
      <div class="container de-seniors-inner">
        <div class="de-seniors-copy">
          <span class="de-seniors-eyebrow">Para idosos e familiares</span>
          <h2 id="de-seniors-title">Mais conforto para quem você ama.</h2>
          <p>A locação de uma poltrona elétrica também pode trazer mais praticidade à rotina de pessoas idosas e de quem cuida delas. Conheça os modelos e converse com nossa equipe sobre o uso em casa.</p>
          <p>Para quem precisa de auxílio ao sentar e levantar, pergunte sobre a <strong>Poltrona Lift</strong> e seus recursos. A escolha depende das necessidades de cada pessoa e das orientações dos profissionais responsáveis.</p>
          <a class="button de-seniors-cta" href="#" data-whatsapp-link>Consultar poltronas para idosos <span aria-hidden="true">↗</span></a>
          <small class="de-seniors-note">Recursos, disponibilidade, condições e região de atendimento devem ser confirmados com a equipe.</small>
        </div>
        <div class="de-seniors-highlights" aria-label="Diferenciais da locação">
          <article class="de-seniors-item"><span class="de-seniors-count" aria-hidden="true">01</span><div><h3>Conforto no descanso</h3><p>Opções de reclinação e apoio para as pernas, conforme o modelo escolhido.</p></div></article>
          <article class="de-seniors-item"><span class="de-seniors-count" aria-hidden="true">02</span><div><h3>Praticidade para a família</h3><p>Locação para uso em casa, com informações sobre utilização e entrega combinadas com a equipe.</p></div></article>
          <article class="de-seniors-item"><span class="de-seniors-count" aria-hidden="true">03</span><div><h3>Opção com sistema Lift</h3><p>Há modelo com mecanismo de auxílio ao movimento de sentar e levantar. Consulte a disponibilidade.</p></div></article>
        </div>
      </div>
    </section>`);
  }

  // 3) Situações de uso: termos novos, sem substituir os existentes.
  const tags = document.querySelector('.situations-section .tag-cloud');
  if (tags && !tags.querySelector('[data-de-senior-tag]')) {
    ['Idosos', 'Familiares e cuidadores'].forEach((name) => {
      const tag = document.createElement('span');
      tag.dataset.deSeniorTag = '';
      tag.textContent = name;
      tags.appendChild(tag);
    });
  }

  // 4) FAQ, inserida antes de script.js conectar os listeners existentes.
  const accordion = document.querySelector('.faq-section .accordion');
  if (accordion && !document.getElementById('de-faq-idosos')) {
    const detail = document.createElement('details');
    detail.id = 'de-faq-idosos';
    detail.innerHTML = `<summary>Vocês alugam poltronas para idosos?</summary><p>Sim. A empresa oferece locação de poltronas elétricas para uso residencial, inclusive para pessoas idosas. Converse com a equipe sobre as necessidades da pessoa, os modelos disponíveis e as condições de locação. O sistema Lift está disponível apenas nos modelos que possuem esse recurso.</p>`;
    accordion.appendChild(detail);
  }
})();
