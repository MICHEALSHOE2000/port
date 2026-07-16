document.documentElement.classList.add("js");

const header = document.querySelector("[data-header]");
const menuButton = document.querySelector("[data-menu]");
const nav = document.querySelector("[data-nav]");

menuButton?.addEventListener("click", () => {
  const isOpen = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!isOpen));
  menuButton.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
  nav?.classList.toggle("is-open", !isOpen);
  document.body.classList.toggle("menu-open", !isOpen);
});

nav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menuButton?.setAttribute("aria-expanded", "false");
    nav.classList.remove("is-open");
    document.body.classList.remove("menu-open");
  });
});

window.addEventListener("scroll", () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 18);
}, { passive: true });

const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px" });

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

document.querySelectorAll("[data-year]").forEach((item) => {
  item.textContent = new Date().getFullYear();
});

const projectForm = document.querySelector("[data-project-form]");
const formStatus = document.querySelector("[data-form-status]");
const submitButton = document.querySelector("[data-submit]");

projectForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  submitButton?.setAttribute("disabled", "");
  formStatus?.classList.remove("is-success", "is-error");
  if (formStatus) formStatus.textContent = "Sending your project details…";

  try {
    const response = await fetch(projectForm.action, {
      method: "POST",
      body: new FormData(projectForm),
      headers: { Accept: "application/json" },
    });

    if (!response.ok) throw new Error("Form submission failed");

    projectForm.reset();
    formStatus?.classList.add("is-success");
    if (formStatus) formStatus.textContent = "Thanks—your project details were sent. I’ll reply by email.";
  } catch (error) {
    formStatus?.classList.add("is-error");
    if (formStatus) formStatus.textContent = "The form could not be sent. Please email me at michealderinto6@gmail.com.";
  } finally {
    submitButton?.removeAttribute("disabled");
  }
});
