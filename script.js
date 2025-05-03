
document.body.innerHTML = `
  <div class="slider-container">
    <div class="slide active" style="background-image: url('https://plus.unsplash.com/premium_photo-1742353866584-27c87d42da99?w=1200');"></div>
    <div class="slide" style="background-image: url('https://images.unsplash.com/photo-1741964969909-0fa5a7e18201?w=1200');"></div>
    <div class="slide" style="background-image: url('https://images.unsplash.com/photo-1742222168686-55ec5ffd3c81?w=1200');"></div>
    <div class="slide" style="background-image: url('https://images.unsplash.com/photo-1716681864578-f98bf23b293f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aGQlMjBsYXB0b3AlMjB3YWxscGFwZXJzfGVufDB8fDB8fHww');"></div>
    <div class="slide" style="background-image: url('https://plus.unsplash.com/premium_photo-1664008628916-3b72a2136e22?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8aGQlMjBsYXB0b3AlMjB3YWxscGFwZXJzfGVufDB8fDB8fHww');"></div>

    <button class="nav-button prev">&#10094;</button>
    <button class="nav-button next">&#10095;</button>
  </div>
`;


const style = document.createElement('style');
style.textContent = `
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: 'Roboto', sans-serif;
    height: 100vh;
    width: 100vw;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    background-size: cover;
    background-position: center;
    transition: background-image 0.6s ease-in-out;
  }

  body::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    backdrop-filter: blur(2px);
    background-color: rgba(0, 0, 0, 0.2);
    z-index: 0;
  }

  .slider-container {
    position: relative;
    width: 80%;
    height: 80vh;
    overflow: hidden;
    border-radius: 16px;
    box-shadow: 0 11px 24px rgba(0, 0, 0, 0.9);
    z-index: 2;
  }

  .slide {
    position: absolute;
    width: 100%;
    height: 100%;
    background-position: center;
    background-size: cover;
    opacity: 0;
    transition: opacity 1s ease-in-out;
  }

  .slide.active {
    opacity: 1;
  }

  .nav-button {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background-color: gray;
    border: none;
    color: white;
    font-size: 2rem;
    padding: 0.5rem 1rem;
    cursor: pointer;
    border-radius: 50%;
    transition: background-color 0.3s, transform 0.3s;
    z-index: 2;
  }

  .nav-button:hover {
    background-color: black;
    transform: translateY(-50%) scale(1.1);
  }

  .nav-button.prev {
    left: 11px;
  }

  .nav-button.next {
    right: 11px;
  }
`;
document.head.appendChild(style);


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
