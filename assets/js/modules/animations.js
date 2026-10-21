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
