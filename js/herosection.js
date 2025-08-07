//  gsap.from("#hero-title", {
//     y: -50,
//     opacity: 0,
//     duration: 1.2,
//     ease: "power3.out"
//   });

//   gsap.from("#hero-subtitle", {
//     y: 30,
//     opacity: 0,
//     duration: 1.2,
//     delay: 0.3,
//     ease: "power3.out"
//   });

//   gsap.from("#hero-btn", {
//     scale: 0.8,
//     opacity: 0,
//     duration: 1,
//     delay: 0.6,
//     ease: "back.out(1.7)"
//   });












function animateHeroSection() {
  const title = document.getElementById("hero-title");
  const subtitle = document.getElementById("hero-subtitle");
  const button = document.getElementById("hero-btn");

  if (!title || !subtitle || !button) {
    console.warn("Hero elements not found. Animation skipped.");
    return;
  }

  // ✅ Force full visibility before animation
  title.style.opacity = "1";
  subtitle.style.opacity = "1";
  button.style.opacity = "1";

  // ✅ Animate with GSAP
  gsap.from(title, {
    y: -50,
    opacity: 0,
    duration: 1.2,
    ease: "power3.out"
  });

  gsap.from(subtitle, {
    y: 30,
    opacity: 0,
    duration: 1.2,
    delay: 0.3,
    ease: "power3.out"
  });

  gsap.from(button, {
    scale: 0.8,
    opacity: 0,
    duration: 1,
    delay: 0.6,
    ease: "back.out(1.7)"
  });
}
document.addEventListener("DOMContentLoaded", () => {
  const popup = document.getElementById("popup");

  if (popup) {
    setTimeout(() => {
      popup.style.display = "none";
      setTimeout(animateHeroSection, 100);
    }, 5000);
  } else {
    animateHeroSection();
  }
});
