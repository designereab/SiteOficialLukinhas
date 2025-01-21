// Controle do Menu Hambúrguer
const mobileMenu = document.getElementById('mobile-menu');
const navList = document.getElementById('nav-list');

if (mobileMenu && navList) {
  mobileMenu.addEventListener('click', (event) => {
    event.stopPropagation(); // Impede que o clique se propague para o documento
    const isActive = navList.classList.toggle('active');
    mobileMenu.setAttribute('aria-expanded', isActive);
  });

  // Fechar o menu ao clicar em um link
  const closeMenuOnLinkClick = () => {
    navList.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navList.classList.remove('active');
        mobileMenu.setAttribute('aria-expanded', false);
      });
    });
  };

  closeMenuOnLinkClick();

  // Fechar o menu ao clicar fora dele
  document.addEventListener('click', (event) => {
    const isClickInsideMenu = navList.contains(event.target) || mobileMenu.contains(event.target);
    if (!isClickInsideMenu) {
      navList.classList.remove('active');
      mobileMenu.setAttribute('aria-expanded', false);
    }
  });

  // Fechar o menu ao rolar a página
  window.addEventListener('scroll', () => {
    navList.classList.remove('active');
    mobileMenu.setAttribute('aria-expanded', false);
  });
}

// Botão de retornar ao topo
const backToTopButton = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    backToTopButton.style.display = 'flex';
  } else {
    backToTopButton.style.display = 'none';
  }
});

backToTopButton.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// Controle da Galeria de Vídeos
const videoGalleryWrapper = document.querySelector('.video-gallery-wrapper');
const prevGalleryButton = document.querySelector('.gallery-button.prev');
const nextGalleryButton = document.querySelector('.gallery-button.next');
const videoGallerySlides = document.querySelectorAll('.video-gallery-slide');
let currentGalleryIndex = 0;

// Função para mostrar o slide atual
const showSlide = (index) => {
  videoGallerySlides.forEach((slide, i) => {
    slide.classList.toggle('active', i === index);
  });
};

// Função para mover a galeria
const moveGallery = (direction) => {
  if (direction === 'next') {
    currentGalleryIndex = (currentGalleryIndex + 1) % videoGallerySlides.length;
  } else if (direction === 'prev') {
    currentGalleryIndex = (currentGalleryIndex - 1 + videoGallerySlides.length) % videoGallerySlides.length;
  }
  showSlide(currentGalleryIndex);
};

// Eventos para os botões de navegação
prevGalleryButton.addEventListener('click', () => moveGallery('prev'));
nextGalleryButton.addEventListener('click', () => moveGallery('next'));

// Mostrar o primeiro slide ao carregar a página
showSlide(currentGalleryIndex);

// Controle do banner de cookies
const cookieConsentBanner = document.getElementById('cookie-consent-banner');
const acceptCookiesButton = document.getElementById('accept-cookies');

// Verifica se o usuário já aceitou os cookies
const hasAcceptedCookies = localStorage.getItem('cookies-accepted');

if (!hasAcceptedCookies) {
  cookieConsentBanner.style.display = 'flex'; // Mostra o banner se o usuário não aceitou
}

// Função para aceitar os cookies
acceptCookiesButton.addEventListener('click', () => {
  localStorage.setItem('cookies-accepted', 'true'); // Armazena o consentimento
  cookieConsentBanner.style.display = 'none'; // Esconde o banner
});
