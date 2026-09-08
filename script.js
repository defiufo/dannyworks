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
