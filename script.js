const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const revealTargets = document.querySelectorAll(".section-heading, .project-card, .about-layout > div, .contact-panel");
if (reduceMotion || !("IntersectionObserver" in window)) {
  revealTargets.forEach((el) => el.classList.add("is-visible"));
} else {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -30px 0px" });
  revealTargets.forEach((el, index) => {
    el.classList.add("reveal");
    el.style.transitionDelay = (index % 4) * 70 + "ms";
    observer.observe(el);
  });
}

const frame = document.getElementById("profileFrame");
if (frame && !reduceMotion && window.matchMedia("(pointer:fine)").matches) {
  const heroVisual = frame.closest(".hero-visual");
  heroVisual.addEventListener("pointermove", (event) => {
    const rect = frame.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    frame.style.transform = `rotateY(${-8 + x * 12}deg) rotateX(${3 - y * 10}deg) translateY(-2px)`;
  }, { passive: true });
  heroVisual.addEventListener("pointerleave", () => {
    frame.style.transform = "rotateY(-8deg) rotateX(3deg)";
  });
}
