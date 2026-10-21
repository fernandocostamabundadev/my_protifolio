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
