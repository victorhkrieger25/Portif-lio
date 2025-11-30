// script.js

// Scroll reveal das seções (otimizado para performance)
document.addEventListener("DOMContentLoaded", () => {
  const scrollElements = document.querySelectorAll(".scroll-reveal");
  if (scrollElements.length === 0) return; // Evita processamento desnecessário se não houver elementos

  const observerOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target); // Para de observar após ativar, economizando recursos
      }
    });
  }, observerOptions);

  scrollElements.forEach(el => observer.observe(el));
});

// Fade-in sequencial navbar (executa ao carregar DOM)
window.addEventListener("DOMContentLoaded", () => {
  const navItems = document.querySelectorAll(".nav-list li");
  if (navItems.length === 0) return;

  navItems.forEach((item, index) => {
    item.style.animation = `navbarFadeIn 0.45s forwards`;
    item.style.animationDelay = `${0.12 * index}s`;
  });
});

// Menu hambúrguer (drawer) - Simplificado e com tratamento de erros
(() => {
  const html = document.documentElement;
  const hamburger = document.querySelector('.hamburger');
  const navList = document.querySelector('#nav-list');

  if (!hamburger || !navList) {
    console.warn("Elementos do menu hambúrguer não encontrados. Verifique o HTML.");
    return;
  }

  // Cria overlay se não existir
  let overlay = document.querySelector('.overlay-dim');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.className = 'overlay-dim';
    document.body.appendChild(overlay);
  }

  // Cria drawer se não existir
  let drawer = document.querySelector('.drawer');
  if (!drawer) {
    drawer = document.createElement('nav');
    drawer.className = 'drawer closed';
    drawer.setAttribute('aria-hidden', 'true');
    // Clona os links do nav-list
    const clone = navList.cloneNode(true);
    clone.classList.remove('nav-list');
    clone.id = '';
    // Remove animações duplicadas
    clone.querySelectorAll('li').forEach(li => li.style.animation = '');
    drawer.appendChild(clone);
    document.body.appendChild(drawer);
  }

  // Estado inicial
  drawer.classList.add('closed');
  hamburger.setAttribute('aria-expanded', 'false');

  // Funções para abrir/fechar
  const openMenu = () => {
    hamburger.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    drawer.classList.remove('closed');
    drawer.classList.add('open');
    drawer.setAttribute('aria-hidden', 'false');
    html.classList.add('nav-open');
    overlay.style.opacity = '1';
    overlay.style.pointerEvents = 'auto';
    document.body.style.overflow = 'hidden';
    // Foco no primeiro link
    const first = drawer.querySelector('a, button');
    if (first) first.focus();
  };

  const closeMenu = () => {
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    drawer.classList.remove('open');
    drawer.classList.add('closed');
    drawer.setAttribute('aria-hidden', 'true');
    html.classList.remove('nav-open');
    overlay.style.opacity = '0';
    overlay.style.pointerEvents = 'none';
    document.body.style.overflow = '';
    hamburger.focus();
  };

  // Eventos
  hamburger.addEventListener('click', () => {
    if (drawer.classList.contains('open')) closeMenu();
    else openMenu();
  });

  overlay.addEventListener('click', closeMenu);

  // Fechar ao clicar em link/botão no drawer
  drawer.addEventListener('click', (e) => {
    const target = e.target;
    if (target.tagName === 'A' || (target.tagName === 'BUTTON' && target.closest('li'))) {
      closeMenu();
    }
  });

  // Esc para fechar
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) {
      closeMenu();
    }
  });

  // Fechar se redimensionar para desktop
  window.addEventListener('resize', () => {
    if (window.innerWidth > 950 && drawer.classList.contains('open')) {
      closeMenu();
    }
  });
})();

const typingElement = document.querySelector('.servi');
const text = typingElement.dataset.text;
let index = 0;

function type() {
  if(index < text.length) {
    typingElement.textContent += text.charAt(index);
    index++;
    setTimeout(type, 100); // velocidade da digitação
  }
}

document.addEventListener("DOMContentLoaded", () => {
  type();
});


document.getElementById("btnWhatsApp").addEventListener("click", () => {
  const nome = document.getElementById("nome").value.trim();
  const mensagem = document.getElementById("mensagem").value.trim();

  const numero = "5547989135878"; // <-- seu número AQUI

  if (mensagem === "") {
    alert("Digite uma mensagem antes de enviar.");
    return;
  }

  const textoFinal = `Olá, meu nome é ${nome || "Visitante"}.%0A%0A${mensagem}`;

  window.open(`https://wa.me/${numero}?text=${textoFinal}`, "_blank");
});
