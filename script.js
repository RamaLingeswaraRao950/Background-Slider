const slides = document.querySelectorAll('.slide');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const body = document.body;

let currentIndex = 0;
let intervalId;

function updateSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === index);
  });

  const currentSlide = slides[index];
  const bgImage = currentSlide.style.backgroundImage;
  body.style.backgroundImage = bgImage;
}

function showPrevSlide() {
  currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  updateSlide(currentIndex);
}

function showNextSlide() {
  currentIndex = (currentIndex + 1) % slides.length;
  updateSlide(currentIndex);
}

function startAutoplay() {
  intervalId = setInterval(showNextSlide, 5000);
}

function stopAutoplay() {
  clearInterval(intervalId);
}


prevBtn.addEventListener('click', () => {
  showPrevSlide();
  stopAutoplay();
  startAutoplay();
});

nextBtn.addEventListener('click', () => {
  showNextSlide();
  stopAutoplay();
  startAutoplay();
});

document.querySelector('.slider-container').addEventListener('mouseover', stopAutoplay);
document.querySelector('.slider-container').addEventListener('mouseout', startAutoplay);

updateSlide(currentIndex);
startAutoplay();
