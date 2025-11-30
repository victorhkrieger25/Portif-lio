// script.js - Otimizado para Victor Krieger Portfolio

// Scroll reveal das seções (usando IntersectionObserver para performance)
document.addEventListener("DOMContentLoaded", () => {
  const scrollElements = document.querySelectorAll(".scroll-reveal");
  if (scrollElements.length === 0) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          observer.unobserve(entry.target); // Para de observar após ativar
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -50px 0px" }
  );

  scrollElements.forEach((el) => observer.observe(el));
});

// Fade-in sequencial da navbar
window.addEventListener("DOMContentLoaded", () => {
  const navItems = document.querySelectorAll(".nav-list li");
  navItems.forEach((item, index) => {
    item.style.animation = `navbarFadeIn 0.45s forwards`;
    item.style.animationDelay = `${0.12 * index}s`;
  });
});

// Menu hamburger (drawer mobile) - Simplificado
(() => {
  const hamburger = document.querySelector('.hamburger');
  const drawer = document.querySelector('.drawer');
  if (!hamburger || !drawer) return;

  const toggleMenu = () => {
    const isOpen = drawer.classList.contains('open');
    hamburger.classList.toggle('active', !isOpen);
    hamburger.setAttribute('aria-expanded', !isOpen);
    drawer.classList.toggle('open', !isOpen);
    drawer.classList.toggle('closed', isOpen);
    drawer.setAttribute('aria-hidden', isOpen);
    document.body.style.overflow = isOpen ? '' : 'hidden';
  };

  hamburger.addEventListener('click', toggleMenu);

  // Fecha ao clicar em link ou fora
  drawer.addEventListener('click', (e) => {
    if (e.target.tagName === 'A' || e.target.closest('li')) toggleMenu();
  });

  // Fecha com Esc
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) toggleMenu();
  });

  // Fecha se redimensionar para desktop
  window.addEventListener('resize', () => {
    if (window.innerWidth > 950 && drawer.classList.contains('open')) toggleMenu();
  });
})();

// Efeito de digitação para ".servi"
document.addEventListener("DOMContentLoaded", () => {
  const element = document.querySelector('.servi');
  if (!element) return;

  const text = element.textContent;
  element.textContent = '';
  let index = 0;

  const type = () => {
    if (index < text.length) {
      element.textContent += text.charAt(index);
      index++;
      setTimeout(type, 100); // Velocidade da digitação
    }
  };
  type();
});

// Navegação suave para links internos
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Script WhatsApp (consolidado e validado)
document.getElementById("btnWhatsApp").addEventListener("click", () => {
  const nome = document.getElementById("nome").value.trim();
  const mensagem = document.getElementById("mensagem").value.trim();

  if (!mensagem) {
    alert("Digite uma mensagem antes de enviar.");
    return;
  }

  const numero = "5547989135878";
  const texto = `Olá, meu nome é ${nome || "Visitante"}.%0A%0A${mensagem}`;
  window.open(`https://wa.me/${numero}?text=${texto}`, "_blank");
});