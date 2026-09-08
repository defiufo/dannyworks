const root = document.documentElement;
const btn = document.getElementById("themeBtn");
const saved = localStorage.getItem("danny-theme");
if (saved) {
  root.setAttribute("data-theme", saved);
  if (btn) btn.textContent = saved === "light" ? "Dark" : "Light";
}
btn?.addEventListener("click", () => {
  const next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
  if (next === "dark") root.removeAttribute("data-theme");
  else root.setAttribute("data-theme", "light");
  localStorage.setItem("danny-theme", next === "dark" ? "dark" : "light");
  btn.textContent = next === "light" ? "Dark" : "Light";
});

const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();

const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const title = document.querySelector(".hero h1");
if (title && !reduce) {
  const text = title.textContent.trim();
  title.textContent = "";
  [...text].forEach((ch, i) => {
    const wrap = document.createElement("span");
    wrap.className = "word";
    const inner = document.createElement("span");
    inner.textContent = ch;
    inner.style.animationDelay = `${0.08 + i * 0.06}s`;
    wrap.appendChild(inner);
    title.appendChild(wrap);
  });
}

const revealNodes = document.querySelectorAll(
  ".hero-copy > *, .hero-card, .section-label, section h2, .lede, .about-grid > div, .stats article, .now-card, .service-grid article, .work-list article, .sample figure, .cta h2, .cta p, .cta .cta-row"
);
revealNodes.forEach((el, i) => {
  el.classList.add("reveal");
  if (!el.closest(".hero-copy")) {
    el.style.transitionDelay = `${(i % 6) * 0.06}s`;
  }
});

if (reduce) {
  document.querySelectorAll(".reveal").forEach((el) => el.classList.add("in"));
} else {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16, rootMargin: "0px 0px -8% 0px" }
  );
  document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
}

const nav = document.querySelector(".nav");
window.addEventListener(
  "scroll",
  () => {
    nav?.classList.toggle("compact", window.scrollY > 24);
  },
  { passive: true }
);

const orbs = document.querySelectorAll(".orb");
const portrait = document.querySelector(".portrait");
if (!reduce) {
  window.addEventListener(
    "pointermove",
    (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      orbs.forEach((orb, i) => {
        const mag = i === 0 ? 18 : 12;
        orb.style.translate = `${x * mag}px ${y * mag}px`;
      });
      if (portrait) {
        portrait.style.transform = `translateY(-4px) rotateX(${y * -4}deg) rotateY(${x * 5}deg)`;
      }
    },
    { passive: true }
  );
}
