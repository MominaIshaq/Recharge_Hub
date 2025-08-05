document.addEventListener("DOMContentLoaded", () => {
  const popup = document.getElementById("offerNotification");

  if (popup) {
    // Show the popup
    popup.style.display = "block";

    // Auto-hide after 5 seconds
    setTimeout(() => {
      popup.style.display = "none";
      animateHeroSection();
    }, 5000);

    // Manual close triggers animation too
    const closeBtn = popup.querySelector("button");
    if (closeBtn) {
      closeBtn.addEventListener("click", () => {
        popup.style.display = "none";
        animateHeroSection();
      });
    }
  } else {
    // If popup not found, still animate hero
    animateHeroSection();
  }
});


function animateHeroSection() {
  const title = document.getElementById("hero-title");
  const subtitle = document.getElementById("hero-subtitle");
  const button = document.getElementById("hero-btn");

  if (title && subtitle && button) {
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
}
