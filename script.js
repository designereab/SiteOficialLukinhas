// Controle do Menu Hambúrguer
const mobileMenu = document.getElementById('mobile-menu');
const navList = document.getElementById('nav-list');

if (mobileMenu && navList) {
  mobileMenu.addEventListener('click', (event) => {
    event.stopPropagation();
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

if (backToTopButton) {
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
}

// Controle da Galeria de Vídeos
const videoGalleryWrapper = document.querySelector('.video-gallery-wrapper');
const prevGalleryButton = document.querySelector('.gallery-button.prev');
const nextGalleryButton = document.querySelector('.gallery-button.next');
const videoGallerySlides = document.querySelectorAll('.video-gallery-slide');
let currentGalleryIndex = 0;

if (videoGalleryWrapper && prevGalleryButton && nextGalleryButton && videoGallerySlides.length > 0) {
  const showSlide = (index) => {
    videoGallerySlides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });
  };

  const moveGallery = (direction) => {
    if (direction === 'next') {
      currentGalleryIndex = (currentGalleryIndex + 1) % videoGallerySlides.length;
    } else if (direction === 'prev') {
      currentGalleryIndex = (currentGalleryIndex - 1 + videoGallerySlides.length) % videoGallerySlides.length;
    }
    showSlide(currentGalleryIndex);
  };

  prevGalleryButton.addEventListener('click', () => moveGallery('prev'));
  nextGalleryButton.addEventListener('click', () => moveGallery('next'));

  showSlide(currentGalleryIndex);
}

// Controle do banner de cookies
document.addEventListener('DOMContentLoaded', () => {
const cookieConsentBanner = document.getElementById('cookie-consent-banner');
const acceptCookiesButton = document.getElementById('accept-cookies');

if (cookieConsentBanner && acceptCookiesButton) {
  const hasAcceptedCookies = localStorage.getItem('cookies-accepted');

  if (!hasAcceptedCookies) {
    cookieConsentBanner.style.display = 'block';
  }

  acceptCookiesButton.addEventListener('click', () => {
    localStorage.setItem('cookies-accepted', 'true');
    cookieConsentBanner.style.display = 'none';
  });
}
