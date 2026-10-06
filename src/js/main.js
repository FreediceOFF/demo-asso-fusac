// Menu mobile, boutons « Copier » et filtre de la page Formation
const burger = document.getElementById("burger");
const nav = document.getElementById("nav");
if (burger && nav) {
  burger.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    burger.setAttribute("aria-expanded", open);
  });
}

document.querySelectorAll(".copy").forEach((b) => {
  b.addEventListener("click", () => {
    const text = b.dataset.copy;
    const done = () => { b.textContent = "Copié"; setTimeout(() => (b.textContent = "Copier"), 1600); };
    const select = () => {
      const r = document.createRange(); r.selectNodeContents(b.previousElementSibling || b.parentNode);
      const s = getSelection(); s.removeAllRanges(); s.addRange(r);
    };
    try { navigator.clipboard.writeText(text).then(done, select); } catch (e) { select(); }
  });
});

const chips = document.querySelectorAll(".chip[data-y]");
chips.forEach((c) => c.addEventListener("click", () => {
  chips.forEach((x) => x.setAttribute("aria-pressed", x === c));
  document.querySelectorAll(".sem").forEach((s) => {
    s.hidden = !(c.dataset.y === "Tout" || s.dataset.y === c.dataset.y);
  });
}));
