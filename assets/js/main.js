const menu = document.getElementById("nav-menu");
const openButton = document.getElementById("nav-toggle");
const closeButton = document.getElementById("nav-close");

function setMenuOpen(open) {
  const wasOpen = menu?.classList.contains("is-open");
  menu?.classList.toggle("is-open", open);
  openButton?.setAttribute("aria-expanded", String(open));
  openButton?.setAttribute(
    "aria-label",
    open ? "Fechar navegação" : "Abrir navegação",
  );
  if (open) menu?.querySelector("a")?.focus();
  else if (wasOpen) openButton?.focus();
}

openButton?.addEventListener("click", () =>
  setMenuOpen(!menu?.classList.contains("is-open")),
);
closeButton?.addEventListener("click", () => setMenuOpen(false));
menu
  ?.querySelectorAll("a")
  .forEach((link) => link.addEventListener("click", () => setMenuOpen(false)));
document.addEventListener("click", (event) => {
  if (
    menu?.classList.contains("is-open") &&
    !menu.contains(event.target) &&
    !openButton?.contains(event.target)
  ) {
    setMenuOpen(false);
  }
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menu?.classList.contains("is-open"))
    setMenuOpen(false);
});
window.matchMedia("(min-width: 651px)").addEventListener("change", (event) => {
  if (event.matches) setMenuOpen(false);
});

document.querySelectorAll(".service__toggle").forEach((button) => {
  button.addEventListener("click", () => {
    const content = document.getElementById(
      button.getAttribute("aria-controls"),
    );
    const expanded = button.getAttribute("aria-expanded") === "true";
    document.querySelectorAll(".service__toggle").forEach((otherButton) => {
      otherButton.setAttribute("aria-expanded", "false");
      otherButton.querySelector(".service__icon").textContent = "＋";
      const otherContent = document.getElementById(
        otherButton.getAttribute("aria-controls"),
      );
      if (otherContent) otherContent.hidden = true;
    });
    if (!expanded && content) {
      button.setAttribute("aria-expanded", "true");
      button.querySelector(".service__icon").textContent = "−";
      content.hidden = false;
    }
  });
});

const header = document.getElementById("header");
const progressBar = document.getElementById("scroll-progress-bar");
const sections = [...document.querySelectorAll("main section[id]")];
const navLinks = [...document.querySelectorAll(".nav__link")];
function updatePageState() {
  header?.classList.toggle("is-scrolled", window.scrollY > 24);
  const current = sections
    .filter((section) => section.getBoundingClientRect().top <= 140)
    .at(-1);
  navLinks.forEach((link) => {
    const active = link.hash === `#${current?.id}`;
    link.classList.toggle("active-link", active);
    if (active) link.setAttribute("aria-current", "location");
    else link.removeAttribute("aria-current");
  });
}
function updateScrollProgress() {
  const scrollableHeight =
    document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0;
  progressBar?.style.setProperty(
    "transform",
    `scaleX(${Math.min(1, Math.max(0, progress))})`,
  );
}
let scrollFrame = 0;
function handleScroll() {
  if (scrollFrame) return;
  scrollFrame = window.requestAnimationFrame(() => {
    updatePageState();
    updateScrollProgress();
    scrollFrame = 0;
  });
}
window.addEventListener("scroll", handleScroll, { passive: true });
window.addEventListener("resize", handleScroll, { passive: true });
updatePageState();
updateScrollProgress();

document.querySelectorAll("[data-year]").forEach((year) => {
  year.textContent = new Date().getFullYear();
});

if (
  "IntersectionObserver" in window &&
  !window.matchMedia("(prefers-reduced-motion: reduce)").matches
) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 },
  );
  document
    .querySelectorAll(
      ".about__copy, .about__focus, .about__workflow article, .section__heading, .work-card, .service-card, .skills__grid article, .testimonial__grid article, .contact__note, .contact__details",
    )
    .forEach((element, index) => {
      element.classList.add("js-reveal");
      if (
        element.matches(
          ".work-card, .service-card, .skills__grid article, .testimonial__grid article",
        )
      ) {
        element.style.transitionDelay = `${(index % 3) * 70}ms`;
      }
      revealObserver.observe(element);
    });
}
