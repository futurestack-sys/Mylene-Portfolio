// Portfolio interactions: mobile menu, active navigation, reveal motion, and email form.
document.documentElement.classList.add("js");

const menuToggle = document.querySelector(".menu-toggle");
const primaryNav = document.querySelector(".primary-nav");
const navLinks = document.querySelectorAll(".nav-link");

function closeMenu() {
  if (!menuToggle || !primaryNav) return;
  menuToggle.setAttribute("aria-expanded", "false");
  primaryNav.classList.remove("is-open");
  document.body.classList.remove("menu-open");
}

if (menuToggle && primaryNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    primaryNav.classList.toggle("is-open", !isOpen);
    document.body.classList.toggle("menu-open", !isOpen);
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      closeMenu();
      const href = link.getAttribute("href");
      if (!href || !href.startsWith("#")) return;
      const target = document.querySelector(href);
      if (!target) return;
      // Keep native anchor navigation, but make sure the destination is exposed.
      target.classList.add("is-navigation-target");
      target.querySelectorAll(".reveal").forEach((item) => item.classList.add("is-visible"));
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth >= 760) closeMenu();
  });
}

// Highlight the section currently in view.
const sections = document.querySelectorAll("main section[id]");
if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => {
        const active = link.getAttribute("href") === `#${entry.target.id}`;
        link.classList.toggle("active", active);
      });
    });
  }, { rootMargin: "-35% 0px -55% 0px" });

  sections.forEach((section) => sectionObserver.observe(section));
}

// Fade sections in as they enter the viewport. Reduced-motion preferences are respected in CSS.
const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

// The form uses mailto, so no backend or external form service is needed.
// Replace this address with the email address you actually use.
const contactForm = document.querySelector("#contact-form");
const formFeedback = document.querySelector("#form-feedback");
const contactEmail = "futurestack22@gmail.com";

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(contactForm);
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const message = String(formData.get("message") || "").trim();

    if (!name || !email || !message) {
      formFeedback.textContent = "Please complete all fields before continuing.";
      return;
    }

    const subject = encodeURIComponent(`Portfolio message from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nReply email: ${email}\n\n${message}`);
    formFeedback.textContent = "Opening your email app. If it does not open, email me directly.";
    window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`;
  });
}

// Keep the copyright year current automatically.
const yearElement = document.querySelector("#year");
if (yearElement) yearElement.textContent = new Date().getFullYear();



// Project category filters.
document.querySelectorAll("[data-project-filter]").forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.projectFilter;
    document.querySelectorAll("[data-project-filter]").forEach((item) => {
      const active = item === button;
      item.classList.toggle("is-active", active);
      item.setAttribute("aria-pressed", String(active));
    });
    document.querySelectorAll("[data-project-category]").forEach((card) => {
      const categories = (card.dataset.projectCategory || "").split(/\s+/);
      card.hidden = filter !== "all" && !categories.includes(filter);
    });
  });
});

// Add only certificates that you have genuinely earned.
const certificates = [
  {
    title: "Thesis Preparation with the Use of Trending Tools and Industry Practices",
    issuer: "Biliran Province State University — School of Technology and Computer Studies, Computer Science Society",
    date: "October 6–7, 2025",
    category: "other",
    description: "Certificate of completion for the seminar-workshop held at the Biliran Province State University Student Center.",
    image: "assets/certificates/thesis-preparation-trending-tools.png",
    url: "assets/certificates/thesis-preparation-trending-tools-original.pdf",
    downloadUrl: "assets/certificates/thesis-preparation-trending-tools-original.pdf"
  },
  {
    title: "Less Hassle, More Hustle — Integrated OS",
    issuer: "Integrated Office Solutions, Inc.",
    date: "November 21, 2025",
    category: "other",
    description: "Certificate of participation for a session focused on time management, productivity, and personal and professional well-being.",
    image: "assets/certificates/less-hassle-more-hustle-integrated-os.jpg",
    url: "assets/certificates/less-hassle-more-hustle-integrated-os.jpg"
  },
  {
    title: "Introduction to AI Literacy and Responsible Use",
    issuer: "Mapúa University and Achieve",
    date: "September 14, 2026",
    category: "other",
    description: "Completed the Class of 2026 micro-credentials course on AI literacy and responsible use.",
    url: "assets/certificates/class-of-2026-issued.pdf",
    image: "assets/certificates/class-of-2026-issued.jpeg",
    downloadUrl: "assets/certificates/class-of-2026-issued.pdf"
  }
];

const certificateGrid = document.querySelector("#certificate-grid");
const certificateEmpty = document.querySelector("#certificate-empty");

function renderCertificates(filter = "all") {
  if (!certificateGrid) return;
  const visible = certificates.filter((item) => filter === "all" || item.category === filter);
  certificateGrid.replaceChildren();
  if (certificateEmpty) certificateEmpty.hidden = visible.length > 0;

  visible.forEach((item) => {
    const card = document.createElement("article");
    card.className = "certificate-card is-visible";
    const preview = document.createElement("button");
    preview.type = "button";
    preview.className = "certificate-preview certificate-modal-trigger";
    preview.setAttribute("aria-label", `Enlarge certificate: ${item.title}`);

    if (item.image) {
      const image = document.createElement("img");
      image.src = item.image;
      image.alt = `Preview of ${item.title}`;
      image.loading = "lazy";
      preview.append(image);
    } else {
      const placeholder = document.createElement("span");
      placeholder.className = "certificate-placeholder";
      placeholder.setAttribute("aria-hidden", "true");
      placeholder.textContent = "✦";
      preview.append(placeholder);
    }

    const content = document.createElement("div");
    content.className = "certificate-content";
    const title = document.createElement("h3"); title.textContent = item.title;
    const issuer = document.createElement("p"); issuer.className = "certificate-issuer"; issuer.textContent = item.issuer;
    const date = document.createElement("p"); date.className = "credential-date"; date.textContent = item.date;
    const description = document.createElement("p"); description.textContent = item.description;
    const actions = document.createElement("div"); actions.className = "certificate-actions";
    const view = document.createElement("button");
    view.type = "button"; view.className = "button button-outline button-small certificate-modal-trigger";
    view.textContent = "View Certificate";
    const target = item.url || item.image;
    if (target) {
      view.dataset.certificateUrl = target;
      preview.dataset.certificateUrl = target;
    } else {
      view.disabled = true;
      view.title = "No certificate file available to view.";
    }
    actions.append(view);
    if (item.downloadUrl) {
      const original = document.createElement("a");
      original.className = "button button-quiet button-small";
      original.href = item.downloadUrl;
      original.target = "_blank";
      original.rel = "noopener noreferrer";
      original.textContent = "Open Original PDF";
      actions.append(original);
    }
    content.append(title, issuer, date, description, actions);
    card.append(preview, content);
    certificateGrid.append(card);
  });
}
renderCertificates();

document.querySelectorAll("[data-certificate-filter]").forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.certificateFilter;
    document.querySelectorAll("[data-certificate-filter]").forEach((item) => {
      const active = item === button;
      item.classList.toggle("is-active", active);
      item.setAttribute("aria-pressed", String(active));
    });
    renderCertificates(filter);
  });
});

// Add verified awards, workshops, memberships, volunteer work, or leadership entries here.
const credentials = [
  {
    title: "Introduction to AI Literacy and Responsible Use",
    type: "Academic certificate",
    date: "September 14, 2026",
    description: "Completed the Class of 2026 micro-credentials course on AI literacy and responsible use, issued by Mapúa University through Achieve.",
    icon: "★"
  },
  {
    title: "Thesis Preparation with the Use of Trending Tools and Industry Practices",
    type: "Workshop certificate",
    date: "October 6–7, 2025",
    description: "Certificate of completion for the seminar-workshop held at the Biliran Province State University Student Center.",
    icon: "★"
  },
  {
    title: "Less Hassle, More Hustle — Integrated OS",
    type: "Workshop certificate",
    date: "November 21, 2025",
    description: "Certificate of participation for a session focused on time management, productivity, and personal and professional well-being.",
    icon: "★"
  }
];

const credentialsGrid = document.querySelector("#credentials-grid");
const credentialsEmpty = document.querySelector("#credentials-empty");
if (credentialsGrid) {
  credentialsGrid.replaceChildren();
  if (credentialsEmpty) credentialsEmpty.hidden = credentials.length > 0;
  credentials.forEach((item) => {
    const card = document.createElement("article"); card.className = "credential-card is-visible";
    const icon = document.createElement("span"); icon.className = "credential-icon";
    icon.setAttribute("aria-hidden", "true"); icon.textContent = item.icon || "✦";
    const content = document.createElement("div"); content.className = "credential-card-content";
    const title = document.createElement("h3"); title.textContent = item.title;
    const type = document.createElement("p"); type.className = "certificate-issuer"; type.textContent = item.type;
    const date = document.createElement("p"); date.className = "credential-date"; date.textContent = item.date;
    const description = document.createElement("p"); description.textContent = item.description;
    content.append(title, type, date, description); card.append(icon, content); credentialsGrid.append(card);
  });
}

// Accessible preview modal for project screenshots and certificate images.
const mediaModal = document.querySelector("#media-modal");
const mediaModalTitle = document.querySelector("#media-modal-title");
const mediaModalContent = document.querySelector("#media-modal-content");
const modalClose = document.querySelector(".modal-close");

function openMediaModal(title, node) {
  if (!mediaModal || !mediaModalContent) return;
  mediaModalTitle.textContent = title || "Preview";
  mediaModalContent.replaceChildren(node);
  if (typeof mediaModal.showModal === "function") mediaModal.showModal();
  else mediaModal.setAttribute("open", "");
}

document.querySelectorAll(".gallery-trigger").forEach((button) => {
  button.addEventListener("click", () => {
    const preview = button.cloneNode(true);
    preview.classList.remove("gallery-trigger");
    preview.disabled = true;
    openMediaModal(button.dataset.galleryTitle, preview);
  });
});

document.addEventListener("click", (event) => {
  const trigger = event.target.closest(".certificate-modal-trigger");
  if (!trigger) return;
  const card = trigger.closest(".certificate-card");
  const image = card?.querySelector(".certificate-preview img");
  const url = trigger.dataset.certificateUrl || trigger.closest(".certificate-preview")?.dataset.certificateUrl;
  if (!url) return;
  if (image) {
    const enlarged = document.createElement("img");
    enlarged.src = image.src; enlarged.alt = image.alt;
    openMediaModal(card.querySelector("h3")?.textContent || "Certificate preview", enlarged);
  } else {
    window.open(url, "_blank", "noopener,noreferrer");
  }
});

if (modalClose && mediaModal) {
  modalClose.addEventListener("click", () => mediaModal.close());
  mediaModal.addEventListener("click", (event) => {
    if (event.target === mediaModal) mediaModal.close();
  });
}

const printResumeButton = document.querySelector("#print-resume");
if (printResumeButton) printResumeButton.addEventListener("click", () => window.print());
