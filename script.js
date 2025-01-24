// ==================================================
// Controle do Menu Hambúrguer
// ==================================================

// Seleciona o botão do menu hambúrguer e a lista de navegação
const mobileMenu = document.getElementById('mobile-menu');
const navList = document.getElementById('nav-list');

// Verifica se os elementos existem antes de adicionar os eventos
if (mobileMenu && navList) {
  // Adiciona um evento de clique ao botão do menu hambúrguer
  mobileMenu.addEventListener('click', (event) => {
    event.stopPropagation(); // Impede a propagação do evento para outros elementos
    const isActive = navList.classList.toggle('active'); // Alterna a classe 'active' no menu
    mobileMenu.setAttribute('aria-expanded', isActive); // Atualiza o atributo ARIA para acessibilidade
  });

  // Fecha o menu ao clicar em um link
  const closeMenuOnLinkClick = () => {
    navList.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navList.classList.remove('active'); // Remove a classe 'active' do menu
        mobileMenu.setAttribute('aria-expanded', false); // Atualiza o atributo ARIA
      });
    });
  };

  closeMenuOnLinkClick(); // Chama a função para configurar o fechamento do menu ao clicar em links

  // Fecha o menu ao clicar fora dele
  document.addEventListener('click', (event) => {
    const isClickInsideMenu = navList.contains(event.target) || mobileMenu.contains(event.target);
    if (!isClickInsideMenu) {
      navList.classList.remove('active'); // Fecha o menu se o clique foi fora dele
      mobileMenu.setAttribute('aria-expanded', false); // Atualiza o atributo ARIA
    }
  });

  // Fecha o menu ao rolar a página
  window.addEventListener('scroll', () => {
    navList.classList.remove('active'); // Fecha o menu ao rolar
    mobileMenu.setAttribute('aria-expanded', false); // Atualiza o atributo ARIA
  });
}

// ==================================================
// Botão de Retornar ao Topo
// ==================================================

// Seleciona o botão de retornar ao topo
const backToTopButton = document.getElementById('back-to-top');

if (backToTopButton) {
  // Mostra ou esconde o botão conforme a rolagem da página
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTopButton.style.display = 'flex'; // Mostra o botão após rolar 300px
    } else {
      backToTopButton.style.display = 'none'; // Esconde o botão
    }
  });

  // Adiciona um evento de clique para rolar suavemente ao topo
  backToTopButton.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Rola suavemente para o topo
    });
  });
}

// ==================================================
// Animação de Aparição das Seções
// ==================================================

document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('.section');

  const checkVisibility = () => {
    sections.forEach(section => {
      const sectionTop = section.getBoundingClientRect().top;
      const sectionBottom = section.getBoundingClientRect().bottom;

      // Verifica se a seção está visível na tela
      if (sectionTop < window.innerHeight && sectionBottom > 0) {
        section.classList.add('visible');
      }
    });
  };

  // Verifica a visibilidade das seções ao carregar a página e ao rolar
  checkVisibility();
  window.addEventListener('scroll', checkVisibility);
});

// ==================================================
// Controle da Galeria de Vídeos
// ==================================================

// Seleciona os elementos da galeria de vídeos
const videoGalleryWrapper = document.querySelector('.video-gallery-wrapper');
const prevGalleryButton = document.querySelector('.gallery-button.prev');
const nextGalleryButton = document.querySelector('.gallery-button.next');
const videoGallerySlides = document.querySelectorAll('.video-gallery-slide');
let currentGalleryIndex = 0; // Índice do slide atual

// Verifica se os elementos da galeria existem
if (videoGalleryWrapper && prevGalleryButton && nextGalleryButton && videoGallerySlides.length > 0) {
  // Função para mostrar o slide correspondente ao índice
  const showSlide = (index) => {
    videoGallerySlides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index); // Ativa o slide correspondente ao índice
    });
  };

  // Função para mover a galeria para o próximo ou anterior slide
  const moveGallery = (direction) => {
    if (direction === 'next') {
      currentGalleryIndex = (currentGalleryIndex + 1) % videoGallerySlides.length; // Avança para o próximo slide
    } else if (direction === 'prev') {
      currentGalleryIndex = (currentGalleryIndex - 1 + videoGallerySlides.length) % videoGallerySlides.length; // Volta para o slide anterior
    }
    showSlide(currentGalleryIndex); // Mostra o slide atualizado
  };

  // Adiciona eventos de clique aos botões de navegação
  prevGalleryButton.addEventListener('click', () => moveGallery('prev'));
  nextGalleryButton.addEventListener('click', () => moveGallery('next'));

  // Mostra o slide inicial
  showSlide(currentGalleryIndex);
}

// ==================================================
// Controle do Banner de Cookies
// ==================================================

// Configura o banner de cookies após o carregamento do DOM
document.addEventListener('DOMContentLoaded', () => {
  const cookieConsentBanner = document.getElementById('cookie-consent-banner');
  const acceptCookiesButton = document.getElementById('accept-cookies');
  const declineCookiesButton = document.getElementById('decline-cookies');

  // Verifica se os elementos do banner de cookies existem
  if (cookieConsentBanner && acceptCookiesButton && declineCookiesButton) {
    const hasAcceptedCookies = localStorage.getItem('cookies-accepted'); // Verifica se o usuário já aceitou os cookies

    // Mostra o banner se o usuário ainda não aceitou os cookies
    if (!hasAcceptedCookies) {
      cookieConsentBanner.style.display = 'block';
    }

    // Adiciona evento de clique para aceitar os cookies
    acceptCookiesButton.addEventListener('click', () => {
      localStorage.setItem('cookies-accepted', 'true'); // Armazena a aceitação no localStorage
      cookieConsentBanner.style.display = 'none'; // Esconde o banner
    });

    // Adiciona evento de clique para recusar os cookies
    declineCookiesButton.addEventListener('click', () => {
      localStorage.setItem('cookies-declined', 'true'); // Armazena a recusa no localStorage
      cookieConsentBanner.style.display = 'none'; // Esconde o banner
    });
  }
});
