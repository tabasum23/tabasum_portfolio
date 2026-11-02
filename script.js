
// TABASUM PORTFOLIO - COMPLETE JAVASCRIPT

document.addEventListener("DOMContentLoaded", () => {

  // 1. MOBILE NAVIGATION
  const menuBtn = document.getElementById("menuBtn");
  const navLinks = document.getElementById("navLinks");

  if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("open");

      menuBtn.textContent = isOpen ? "✕" : "☰";
      menuBtn.setAttribute("aria-expanded", String(isOpen));
    });

    document.querySelectorAll(".nav-links a").forEach(link => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuBtn.textContent = "☰";
        menuBtn.setAttribute("aria-expanded", "false");
      });
    });
  }

  // 2. TYPING ANIMATION
  const typingElement = document.getElementById("typing-text");

  const roles = [
    "Java Full Stack Developer",
    "Software Developer",
    "AI & Data Analytics Enthusiast",
    "Computer Science Graduate"
  ];

  if (typingElement) {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      typingElement.textContent = roles[0];
    } else {
      let roleIndex = 0;
      let charIndex = 0;
      let deleting = false;

      function typeText() {
        const currentRole = roles[roleIndex];

        if (deleting) {
          charIndex--;
        } else {
          charIndex++;
        }

        typingElement.textContent =
          currentRole.substring(0, charIndex);

        let delay = deleting ? 45 : 85;

        if (!deleting && charIndex === currentRole.length) {
          deleting = true;
          delay = 1600;
        } else if (deleting && charIndex === 0) {
          deleting = false;
          roleIndex = (roleIndex + 1) % roles.length;
          delay = 350;
        }

        setTimeout(typeText, delay);
      }

      typeText();
    }
  }

  // 3. SCROLL REVEAL ANIMATION
  const revealElements = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.08
    });

    revealElements.forEach(element => observer.observe(element));

  } else {
    revealElements.forEach(element => element.classList.add("show"));
  }

  // 4. ACTIVE NAVIGATION LINK
  const sections = document.querySelectorAll("main section[id]");
  const navItems = document.querySelectorAll(".nav-links a");

  if ("IntersectionObserver" in window) {
    const navObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const currentId = entry.target.id;

          navItems.forEach(link => {
            link.classList.toggle(
              "active",
              link.getAttribute("href") === "#" + currentId
            );
          });
        }
      });
    }, {
      rootMargin: "-25% 0px -60% 0px"
    });

    sections.forEach(section => navObserver.observe(section));
  }

  // 5. CLOSE MENU WHEN RESIZING
  window.addEventListener("resize", () => {
    if (window.innerWidth > 760 && navLinks && menuBtn) {
      navLinks.classList.remove("open");
      menuBtn.textContent = "☰";
      menuBtn.setAttribute("aria-expanded", "false");
    }
  });

});
