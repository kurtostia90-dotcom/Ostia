const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector("#nav-links");

if (menuToggle && navLinks) {
  const closeMenu = () => {
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
    navLinks.classList.remove("is-open");
  };

  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
    navLinks.classList.toggle("is-open", !isOpen);
  });

  navLinks.addEventListener("click", (event) => {
    if (event.target instanceof Element && event.target.closest("a")) {
      closeMenu();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
      closeMenu();
      menuToggle.focus();
    }
  });
}

const screenshotButton = document.querySelector(".screenshot-link");
const imageLightbox = document.querySelector(".image-lightbox");

if (screenshotButton && imageLightbox instanceof HTMLDialogElement) {
  screenshotButton.addEventListener("click", () => {
    imageLightbox.showModal();
  });

  imageLightbox.addEventListener("cancel", (event) => {
    event.preventDefault();
    imageLightbox.close();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && imageLightbox.open) {
      event.preventDefault();
      imageLightbox.close();
    }
  });

  imageLightbox.addEventListener("close", () => {
    screenshotButton.focus();
  });

  imageLightbox.addEventListener("click", (event) => {
    if (event.target === imageLightbox) {
      imageLightbox.close();
    }
  });
}

const year = document.querySelector("#year");
if (year) {
  year.textContent = String(new Date().getFullYear());
}

const typedName = document.querySelector("#typed-name");
const typedNamePeriod = document.querySelector(".hero-period");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

if (typedName) {
  const titles = ["Kurt", "4th-year Student"];
  let titleIndex = 0;
  let characterIndex = titles[titleIndex].length;
  let deleting = true;
  let typewriterTimer;

  const typeNextCharacter = () => {
    const title = titles[titleIndex];
    typedName.classList.toggle("is-long-name", titleIndex === 1);

    if (deleting) {
      typedNamePeriod?.classList.remove("is-visible");
      characterIndex -= 1;
      typedName.textContent = title.slice(0, characterIndex);
      if (characterIndex === 0) {
        deleting = false;
        titleIndex = (titleIndex + 1) % titles.length;
      }
    } else {
      characterIndex += 1;
      typedName.textContent = titles[titleIndex].slice(0, characterIndex);
      if (characterIndex === titles[titleIndex].length) {
        typedNamePeriod?.classList.add("is-visible");
        deleting = true;
        typewriterTimer = window.setTimeout(typeNextCharacter, 1800);
        return;
      }
    }

    typewriterTimer = window.setTimeout(typeNextCharacter, deleting ? 75 : 115);
  };

  const setStaticName = () => {
    window.clearTimeout(typewriterTimer);
    titleIndex = 0;
    characterIndex = titles[0].length;
    deleting = true;
    typedName.textContent = titles[0];
    typedName.classList.remove("is-long-name");
    typedNamePeriod?.classList.add("is-visible");
  };

  if (prefersReducedMotion.matches) {
    setStaticName();
  } else {
    typewriterTimer = window.setTimeout(typeNextCharacter, 1700);
  }

  prefersReducedMotion.addEventListener("change", (event) => {
    if (event.matches) {
      setStaticName();
    } else {
      setStaticName();
      typewriterTimer = window.setTimeout(typeNextCharacter, 1700);
    }
  });
}