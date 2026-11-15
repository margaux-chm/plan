document.addEventListener('DOMContentLoaded', () => {
  const slides = document.querySelectorAll('.slide');
  const totalSlides = slides.length;
  let currentIndex = 0;

  // Elementos del DOM
  const btnTheme = document.getElementById('btn-theme');
  const btnPresent = document.getElementById('btn-present');
  const btnPrev = document.getElementById('btn-prev');
  const btnNext = document.getElementById('btn-next');
  const btnExit = document.getElementById('btn-exit');
  const slideCounter = document.getElementById('slide-counter');
  const presentCounter = document.getElementById('present-counter');

  // Formatear números (ej. 1 -> "01")
  const formatNumber = (num) => String(num).padStart(2, '0');

  // Actualizar la vista de diapositivas y contadores
  function updateSlides() {
    slides.forEach((slide, index) => {
      slide.classList.toggle('active', index === currentIndex);
    });
    const counterText = `${formatNumber(currentIndex + 1)} / ${formatNumber(totalSlides)}`;
    slideCounter.textContent = counterText;
    presentCounter.textContent = counterText;
  }

  // Navegación
  function nextSlide() {
    if (currentIndex < totalSlides - 1) {
      currentIndex++;
      updateSlides();
    }
  }

  function prevSlide() {
    if (currentIndex > 0) {
      currentIndex--;
      updateSlides();
    }
  }

  // Entrar y salir del modo presentación
  function enterPresentation() {
    document.body.classList.add('presenting');
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen().catch(() => {});
    }
    updateSlides();
  }

  function exitPresentation() {
    document.body.classList.remove('presenting');
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    }
  }

  // Cambiar tema claro / oscuro
  btnTheme.addEventListener('click', () => {
    const html = document.documentElement;
    const isDark = html.getAttribute('data-theme') === 'dark';
    html.setAttribute('data-theme', isDark ? 'light' : 'dark');
    btnTheme.textContent = isDark ? 'Tema oscuro' : 'Tema claro';
  });

  // Eventos de botones
  btnPresent.addEventListener('click', enterPresentation);
  btnExit.addEventListener('click', exitPresentation);
  btnNext.addEventListener('click', nextSlide);
  btnPrev.addEventListener('click', prevSlide);

  // Atajos de teclado
  document.addEventListener('keydown', (e) => {
    if (!document.body.classList.contains('presenting')) return;

    if (e.key === 'ArrowRight' || e.key === ' ') {
      nextSlide();
    } else if (e.key === 'ArrowLeft') {
      prevSlide();
    } else if (e.key === 'Escape') {
      exitPresentation();
    }
  });

  // Inicializar contadores
  updateSlides();
});
