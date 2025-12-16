document.addEventListener('DOMContentLoaded', function () {
    const toggleButton = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.main-nav ul');

    toggleButton.addEventListener('click', function() {
        navMenu.classList.toggle('active');
    });
});

document.addEventListener('DOMContentLoaded', function() {
  const track = document.querySelector('.carousel-track');
  const slides = Array.from(track.children);
  const nextButton = document.querySelector('.carousel-button.next');
  const prevButton = document.querySelector('.carousel-button.prev');
  const indicators = document.querySelectorAll('.carousel-indicator');

  const slideWidth = slides[0].getBoundingClientRect().width;
  const autoSlideDuration = 10000; 
  let slideInterval;

  const setSlidePosition = (slide, index) => {
    slide.style.left = slideWidth * index + 'px';
  };
  slides.forEach(setSlidePosition);

  const moveToSlide = (currentSlide, targetSlide) => {
    track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
    currentSlide.classList.remove('current-slide');
    targetSlide.classList.add('current-slide');
  };

  const updateIndicators = (currentIndex, targetIndex) => {
    indicators[currentIndex].classList.remove('current-slide');
    indicators[targetIndex].classList.add('current-slide');
  };
  
  const nextSlide = () => {
    const currentSlide = track.querySelector('.current-slide');
    let nextSlide = currentSlide.nextElementSibling;
    
    if (!nextSlide) {
        nextSlide = slides[0];
    }
    
    const currentIndex = slides.findIndex(slide => slide === currentSlide);
    const nextIndex = slides.findIndex(slide => slide === nextSlide);
    
    moveToSlide(currentSlide, nextSlide);
    updateIndicators(currentIndex, nextIndex);
  };
  
  const startAutoSlide = () => {
      slideInterval = setInterval(nextSlide, autoSlideDuration);
  };
  
  const stopAutoSlide = () => {
      clearInterval(slideInterval);
  };

  nextButton.addEventListener('click', e => {
      stopAutoSlide(); 
      nextSlide();
      startAutoSlide();
  });

  prevButton.addEventListener('click', e => {
    stopAutoSlide(); 
    
    const currentSlide = track.querySelector('.current-slide');
    let prevSlide = currentSlide.previousElementSibling;
    
    if (!prevSlide) {
        prevSlide = slides[slides.length - 1];
    }

    const currentIndex = slides.findIndex(slide => slide === currentSlide);
    const prevIndex = slides.findIndex(slide => slide === prevSlide);
    
    moveToSlide(currentSlide, prevSlide);
    startAutoSlide();
  });
  
  indicators.forEach((indicator, index) => {
      indicator.addEventListener('click', () => {
          stopAutoSlide();
          const currentSlide = track.querySelector('.current-slide');
          const targetSlide = slides[index];
          const currentIndex = slides.findIndex(slide => slide === currentSlide);
          
          moveToSlide(currentSlide, targetSlide);
          updateIndicators(currentIndex, index);
          startAutoSlide();
      });
  });

  const carouselContainer = document.querySelector('.image-carousel');
  carouselContainer.addEventListener('mouseenter', stopAutoSlide);
  carouselContainer.addEventListener('mouseleave', startAutoSlide);

  startAutoSlide();
});