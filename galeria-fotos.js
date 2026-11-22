/* ================================================================
   D&E Poltronas | Etapa 02: fotos complementares do acervo
   - Não modifica script.js, style.css nem carrossel.js.
   - Utiliza o modal já existente e suas setas/teclas.
   - FOTOS: correspondência com modelos ainda precisa ser confirmada
     pela empresa. As legendas NÃO afirmam recursos não verificados.
   ================================================================ */
(() => {
  'use strict';

  // O script.js original deve carregar antes deste arquivo.
  if (typeof GALLERY === 'undefined' || !Array.isArray(GALLERY)) return;
  const modal = document.getElementById('galleryModal');
  const modalImage = document.getElementById('modalImage');
  const cards = Array.from(document.querySelectorAll('.product-card .product-image[data-gallery]'));
  if (!modal || !modalImage || cards.length !== 3) return;

  // Cada grupo contém a imagem original e uma foto REAL adicional.
  // OBS.: a associação de foto a modelo é PROVISÓRIA. Verificar com a D&E.
  const grupos = [
    [
      { src: 'poltrona-eletrica.svg', alt: 'Imagem de catálogo da Poltrona Elétrica', caption: 'Poltrona Elétrica · imagem do catálogo' },
      { src: 'foto-poltrona-caramelo.webp', alt: 'Fotografia real de poltrona caramelo do acervo D&E Poltronas', caption: 'Foto real do acervo D&E · Confirme modelo e características pelo WhatsApp' }
    ],
    [
      { src: 'poltrona-lift.svg', alt: 'Imagem de catálogo da Poltrona Lift', caption: 'Poltrona Lift · imagem do catálogo' },
      { src: 'foto-poltrona-marrom.webp', alt: 'Fotografia real de poltrona marrom do acervo D&E Poltronas', caption: 'Foto real do acervo D&E · Confirme modelo e características pelo WhatsApp' }
    ],
    [
      { src: 'poltrona-premium.svg', alt: 'Imagem de catálogo da Poltrona Premium', caption: 'Poltrona Premium · imagem do catálogo' },
      { src: 'foto-poltrona-cinza.webp', alt: 'Fotografia real de poltrona cinza do acervo D&E Poltronas', caption: 'Foto real do acervo D&E · Confirme modelo e características pelo WhatsApp' }
    ]
  ];

  // Estilos isolados da galeria: não altera o modernizacao.css reparado.
  const style = document.createElement('style');
  style.id = 'de-galeria-estilos';
  style.textContent = `
    .de-fotos-badge {position:absolute;bottom:14px;left:14px;z-index:2;
      padding:7px 12px;border-radius:999px;background:rgba(53,41,33,.89);
      color:#fff9ee;font:700 12px/1.3 'DM Sans',system-ui,sans-serif;
      box-shadow:0 3px 10px rgba(0,0,0,.12);pointer-events:none}
    .de-modal-count {margin:8px 0 0;text-align:center;color:#f8eddf;
      font:600 13px/1.4 'DM Sans',system-ui,sans-serif}
    @media(max-width:620px){.de-fotos-badge{left:10px;bottom:10px;font-size:13px}}
  `;
  document.head.appendChild(style);

  const counter = document.createElement('div');
  counter.className = 'de-modal-count';
  counter.setAttribute('aria-live', 'polite');
  counter.textContent = '1 de 2 fotos · Deslize para ver mais';
  modal.querySelector('figure')?.appendChild(counter);

  const findCurrent = () => GALLERY.findIndex(item => item.src === modalImage.getAttribute('src'));
  const refreshCounter = () => {
    const idx = findCurrent();
    if (idx !== -1) counter.textContent = `${idx + 1} de ${GALLERY.length} fotos · Deslize ou use as setas`;
  };
  new MutationObserver(refreshCounter).observe(modalImage, { attributes: true, attributeFilter: ['src'] });

  cards.forEach((button, idx) => {
    button.dataset.deModelo = String(idx);
    button.setAttribute('aria-label', `${button.getAttribute('aria-label') || 'Ver fotos'} · 2 imagens`);
    const badge = document.createElement('span');
    badge.className = 'de-fotos-badge';
    badge.textContent = 'Ver 2 fotos';
    badge.setAttribute('aria-hidden', 'true');
    button.appendChild(badge);

    // O script original usa a fase de bolha. Aqui usamos captura para
    // preparar GALLERY antes que ele abra a imagem do produto.
    button.addEventListener('click', () => {
      GALLERY.splice(0, GALLERY.length, ...grupos[idx].map(item => ({ ...item })));
      button.dataset.gallery = '0';
      counter.textContent = '1 de 2 fotos · Deslize ou use as setas';
    }, { capture: true });
  });

  let startX = null;
  let startY = null;
  modal.addEventListener('touchstart', (event) => {
    if (!event.target.closest('figure') || event.touches.length !== 1) return;
    startX = event.touches[0].clientX;
    startY = event.touches[0].clientY;
  }, { passive: true });
  modal.addEventListener('touchend', (event) => {
    if (startX === null || !event.changedTouches.length) return;
    const dx = event.changedTouches[0].clientX - startX;
    const dy = event.changedTouches[0].clientY - startY;
    startX = startY = null;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.3 && typeof moveGallery === 'function') {
      moveGallery(dx < 0 ? 1 : -1);
    }
  }, { passive: true });

  // Se alguma foto adicional não estiver publicada, não deixa um quadro quebrado.
  modalImage.addEventListener('error', () => {
    if (findCurrent() > 0 && GALLERY[0]) {
      modalImage.src = GALLERY[0].src;
      const caption = document.getElementById('modalCaption');
      if (caption) caption.textContent = 'Foto adicional indisponível no momento';
    }
  });
})();
