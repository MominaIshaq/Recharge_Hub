const slides = document.querySelectorAll(".slide");
const langToggle = document.getElementById("langToggle");
const kenburnsToggle = document.getElementById("kenBurnsToggle");
const soundToggle = document.getElementById("soundToggle");
const fullscreenToggle = document.getElementById("fullscreenToggle");
const audio = document.getElementById("backgroundAudio");
const progress = document.querySelector(".progress");
const slideshowContainer = document.querySelector(".slideshow-container");

let currentIndex = 0;
let isFr = true;
let autoSlide;
let isKenburns = false;

function animateTitle(titleEl, text) {
  titleEl.innerHTML = "";
  for (let i = 0; i < text.length; i++) {
    const span = document.createElement("span");
    if (text[i] === " ") {
      span.classList.add("space");
      span.innerHTML = "&nbsp;";
    } else {
      span.textContent = text[i];
      span.style.animationDelay = `${i * 100}ms`;
    }
    titleEl.appendChild(span);
  }
}

function updateSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.remove("active", "kenburns");
    if (i === index) {
      slide.classList.add("active");
      if (isKenburns) slide.classList.add("kenburns");

      const h2 = slide.querySelector("h2");
      const p = slide.querySelector("p");
      const titleText = h2?.getAttribute(isFr ? "data-fr" : "data-en") || "";
      const descText = p?.getAttribute(isFr ? "data-fr" : "data-en") || "";

      if (h2) animateTitle(h2, titleText);
      if (p) p.textContent = descText;
    }
  });
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % slides.length;
  updateSlide(currentIndex);
  resetProgressBar();
}

function prevSlide() {
  currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  updateSlide(currentIndex);
  resetProgressBar();
}

function resetProgressBar() {
  let percent = 0;
  clearInterval(autoSlide);
  progress && (progress.style.width = "0%");
  autoSlide = setInterval(() => {
    percent += 1;
    if (progress) progress.style.width = `${percent}%`;
    if (percent >= 100) {
      nextSlide();
      percent = 0;
    }
  }, 100);
}

function toggleFullscreen() {
  if (!document.fullscreenElement) {
    slideshowContainer?.requestFullscreen();
    slideshowContainer?.classList.add("fullscreen");
  } else {
    document.exitFullscreen();
    slideshowContainer?.classList.remove("fullscreen");
  }
}

document.addEventListener("fullscreenchange", () => {
  if (!document.fullscreenElement) {
    slideshowContainer?.classList.remove("fullscreen");
    if (fullscreenToggle) fullscreenToggle.checked = false;
  } else {
    slideshowContainer?.classList.add("fullscreen");
    if (fullscreenToggle) fullscreenToggle.checked = true;
  }
});

langToggle?.addEventListener("change", () => {
  isFr = !langToggle.checked;
  updateSlide(currentIndex);
});

kenburnsToggle?.addEventListener("change", () => {
  isKenburns = kenburnsToggle.checked;
  updateSlide(currentIndex);
});

soundToggle?.addEventListener("change", () => {
  if (soundToggle.checked) {
    audio.volume = 0.5;
    audio.play();
  } else {
    audio.pause();
  }
});

fullscreenToggle?.addEventListener("change", toggleFullscreen);

// ✅ Safe binding with null checks
const navPrev = document.querySelector(".nav.prev");
const navNext = document.querySelector(".nav.next");

navPrev?.addEventListener("click", prevSlide);
navNext?.addEventListener("click", nextSlide);

// Init
updateSlide(currentIndex);
resetProgressBar();
