// ========================================
// CONFIGURAÇÕES DA EMPRESA
// ALTERE OS DADOS ABAIXO
// ========================================
const COMPANY = {
  name: "D&E Poltronas",
  phone: "62 99139-2645",
  whatsapp: "5562991392645",
  address: "Av. Madrid, Qd.174 - Lt.20 - Jardim Europa, 74330-550",
  city: "Cidade/UF Goiania-GO",
  hours: "08h as 18h",
  instagram: "https://www.instagram.com/deepoltronas/"
};

const WHATSAPP_NUMBER = COMPANY.whatsapp;
const WHATSAPP_MESSAGE = "Olá! Gostaria de saber mais sobre o aluguel das poltronas para pós-operatório.";

// ========================================
// CONFIGURAÇÕES DE PRODUTOS / GALERIA
// ========================================
const GALLERY = [
  { src: "poltrona-eletrica.svg", alt: "Poltrona elétrica reclinável", caption: "Poltrona Elétrica" },
  { src: "poltrona-lift.svg", alt: "Poltrona elétrica Lift", caption: "Poltrona Lift" },
  { src: "poltrona-premium.svg", alt: "Poltrona premium reclinável", caption: "Poltrona Premium" }
];

// ========================================
// HEADER / MENU MOBILE
// ========================================
const siteHeader = document.getElementById("siteHeader");
const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.getElementById("mainNav");

window.addEventListener("scroll", () => {
  siteHeader.classList.toggle("scrolled", window.scrollY > 8);
}, { passive: true });

menuToggle?.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("is-open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

mainNav?.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("is-open");
    menuToggle?.setAttribute("aria-expanded", "false");
  });
});

// ========================================
// DADOS DA EMPRESA NO HTML
// ========================================
document.querySelectorAll("[data-company-name]").forEach(el => el.textContent = COMPANY.name);
document.querySelectorAll("[data-company-address]").forEach(el => el.textContent = COMPANY.address);
document.querySelectorAll("[data-company-city]").forEach(el => el.textContent = COMPANY.city);
document.querySelectorAll("[data-company-hours]").forEach(el => el.textContent = COMPANY.hours);

document.querySelectorAll("[data-company-phone]").forEach(el => {
  el.textContent = COMPANY.phone || "Telefone não informado";
});

document.querySelectorAll("[data-phone-link]").forEach(el => {
  if (COMPANY.phone) {
    const digits = COMPANY.phone.replace(/\D/g, "");
    el.href = `tel:${digits}`;
  } else {
    el.href = "#";
  }
});

document.querySelectorAll("[data-instagram-link]").forEach(el => {
  if (COMPANY.instagram) {
    el.href = COMPANY.instagram;
    el.target = "_blank";
    el.rel = "noopener noreferrer";
  } else {
    el.href = "#";
  }
});

document.getElementById("currentYear").textContent = new Date().getFullYear();

// ========================================
// WHATSAPP
// ========================================
function buildWhatsAppUrl(productName = "") {
  if (!WHATSAPP_NUMBER || WHATSAPP_NUMBER.includes("X")) return "#";
  const extra = productName ? ` Tenho interesse na ${productName}.` : "";
  const message = `${WHATSAPP_MESSAGE}${extra}`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

document.querySelectorAll("[data-whatsapp-link]").forEach(link => {
  link.href = buildWhatsAppUrl(link.dataset.product || "");
  if (link.href !== "#") {
    link.target = "_blank";
    link.rel = "noopener noreferrer";
  }
});

// ========================================
// GALERIA / MODAL
// ========================================
const galleryModal = document.getElementById("galleryModal");
const modalImage = document.getElementById("modalImage");
const modalCaption = document.getElementById("modalCaption");
let currentGalleryIndex = 0;

function openGallery(index) {
  currentGalleryIndex = index;
  const item = GALLERY[currentGalleryIndex];
  modalImage.src = item.src;
  modalImage.alt = item.alt;
  modalCaption.textContent = item.caption;
  galleryModal.classList.add("is-open");
  galleryModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeGallery() {
  galleryModal.classList.remove("is-open");
  galleryModal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

function moveGallery(direction) {
  currentGalleryIndex = (currentGalleryIndex + direction + GALLERY.length) % GALLERY.length;
  openGallery(currentGalleryIndex);
}

document.querySelectorAll("[data-gallery]").forEach(button => {
  button.addEventListener("click", () => openGallery(Number(button.dataset.gallery)));
});

document.querySelector(".modal-close")?.addEventListener("click", closeGallery);
document.querySelector(".modal-prev")?.addEventListener("click", () => moveGallery(-1));
document.querySelector(".modal-next")?.addEventListener("click", () => moveGallery(1));

galleryModal?.addEventListener("click", event => {
  if (event.target === galleryModal) closeGallery();
});

document.addEventListener("keydown", event => {
  if (!galleryModal.classList.contains("is-open")) return;
  if (event.key === "Escape") closeGallery();
  if (event.key === "ArrowLeft") moveGallery(-1);
  if (event.key === "ArrowRight") moveGallery(1);
});

// ========================================
// FAQ: comportamento natural do <details>
// ========================================
document.querySelectorAll(".accordion details").forEach(item => {
  item.addEventListener("toggle", () => {
    if (!item.open) return;
    document.querySelectorAll(".accordion details").forEach(other => {
      if (other !== item) other.removeAttribute("open");
    });
  });
});
