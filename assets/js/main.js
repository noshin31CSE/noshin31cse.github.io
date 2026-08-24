/**
* Noshin Portfolio - stable main interactions
* Keeps template behavior but removes conflicting Typed/Waypoint/Isotope logic.
*/

(function () {
  "use strict";

  const header = document.querySelector("#header");
  const headerToggleBtn = document.querySelector(".header-toggle");

  function headerToggle() {
    if (!header || !headerToggleBtn) return;
    header.classList.toggle("header-show");
    headerToggleBtn.classList.toggle("bi-list");
    headerToggleBtn.classList.toggle("bi-x");
  }

  if (headerToggleBtn) {
    headerToggleBtn.addEventListener("click", headerToggle);
  }

  document.querySelectorAll("#navmenu a").forEach(link => {
    link.addEventListener("click", () => {
      if (header && header.classList.contains("header-show")) {
        headerToggle();
      }
    });
  });

  document.querySelectorAll(".navmenu .toggle-dropdown").forEach(toggle => {
    toggle.addEventListener("click", function (e) {
      e.preventDefault();
      this.parentNode.classList.toggle("active");
      if (this.parentNode.nextElementSibling) {
        this.parentNode.nextElementSibling.classList.toggle("dropdown-active");
      }
      e.stopImmediatePropagation();
    });
  });

  const preloader = document.querySelector("#preloader");
  if (preloader) {
    window.addEventListener("load", () => preloader.remove(), { once: true });
  }

  const scrollTop = document.querySelector(".scroll-top");

  function toggleScrollTop() {
    if (!scrollTop) return;
    scrollTop.classList.toggle("active", window.scrollY > 100);
  }

  if (scrollTop) {
    scrollTop.addEventListener("click", e => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  window.addEventListener("load", toggleScrollTop);
  document.addEventListener("scroll", toggleScrollTop, { passive: true });

  function aosInit() {
    if (typeof window.AOS === "undefined") return;
    AOS.init({
      duration: 600,
      easing: "ease-in-out",
      once: true,
      mirror: false
    });
  }

  window.addEventListener("load", aosInit);

  if (typeof window.PureCounter !== "undefined") {
    new PureCounter();
  }

  if (typeof window.GLightbox !== "undefined") {
    GLightbox({ selector: ".glightbox" });
  }

  /* --------------------------------------------------
     PROJECT FILTERS — native, no Isotope dependency
  -------------------------------------------------- */
  const portfolio = document.querySelector("#portfolio");

  if (portfolio) {
    const filterButtons = portfolio.querySelectorAll(".portfolio-filters [data-filter]");
    const portfolioItems = portfolio.querySelectorAll(".portfolio-item");

    filterButtons.forEach(button => {
      button.addEventListener("click", function () {
        const filter = this.dataset.filter || "*";

        filterButtons.forEach(btn => btn.classList.remove("filter-active"));
        this.classList.add("filter-active");

        portfolioItems.forEach(item => {
          const show = filter === "*" || item.matches(filter);
          item.classList.toggle("portfolio-hidden", !show);
        });

        if (typeof window.AOS !== "undefined") {
          setTimeout(() => AOS.refreshHard(), 50);
        }
      });
    });
  }

  function initSwiper() {
    if (typeof window.Swiper === "undefined") return;

    document.querySelectorAll(".init-swiper").forEach(swiperElement => {
      const configEl = swiperElement.querySelector(".swiper-config");
      if (!configEl) return;

      try {
        const config = JSON.parse(configEl.innerHTML.trim());
        new Swiper(swiperElement, config);
      } catch (error) {
        console.warn("Swiper configuration skipped:", error);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  window.addEventListener("load", function () {
    if (!window.location.hash) return;
    const section = document.querySelector(window.location.hash);
    if (!section) return;

    setTimeout(() => {
      const scrollMarginTop = parseInt(getComputedStyle(section).scrollMarginTop) || 0;
      window.scrollTo({
        top: section.offsetTop - scrollMarginTop,
        behavior: "smooth"
      });
    }, 100);
  });

  const navLinks = document.querySelectorAll(".navmenu a");

  function navmenuScrollspy() {
    const position = window.scrollY + 200;

    navLinks.forEach(link => {
      if (!link.hash) return;
      const section = document.querySelector(link.hash);
      if (!section) return;

      const active =
        position >= section.offsetTop &&
        position <= section.offsetTop + section.offsetHeight;

      link.classList.toggle("active", active);
    });
  }

  window.addEventListener("load", navmenuScrollspy);
  document.addEventListener("scroll", navmenuScrollspy, { passive: true });
})();
