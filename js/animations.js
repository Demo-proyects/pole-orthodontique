/**
 * animations.js — v2
 * Reemplaza IX3 de Webflow con GSAP puro.
 * Fix: guards en cada animación para evitar "target not found"
 *      y elementos que quedan con opacity:0 al fallar.
 */

(function () {
  "use strict";

  gsap.registerPlugin(ScrollTrigger, SplitText);

  // ── Añadir clase que desbloquea visibility:hidden del CSS de Webflow ──
  document.documentElement.classList.add("w-mod-ix3");

  // ── Helper: SplitText seguro ──
  function safeSplit(el, options) {
    try {
      const split = new SplitText(el, options);
      const result = options.type === "chars" ? split.chars : split.words;
      if (!result || result.length === 0) {
        split.revert();
        return null;
      }
      return result;
    } catch (e) {
      return null;
    }
  }

  // ─────────────────────────────────────────────────────────────────────────
  // HERO ANIMATIONS (on load)
  // ─────────────────────────────────────────────────────────────────────────
  function initHeroAnimations() {
    const tl = gsap.timeline();

    // Hero background: scale 1.5 → 1
    const heroBg = document.querySelectorAll("[hero-bg-element]");
    if (heroBg.length) {
      gsap.set(heroBg, { scale: 1.5 });
      tl.to(heroBg, { scale: 1, duration: 3, ease: "power2.out" }, 0);
    }

    // Navbar: entra desde arriba
    const navbar = document.querySelector(".navbar3_component");
    if (navbar) {
      gsap.set(navbar, { opacity: 0, y: "-101%" });
      tl.to(navbar, { opacity: 1, y: "0%", duration: 1, ease: "power2.out" }, 1.5);
    }

    // Hero title — split chars
    document.querySelectorAll("[hero-title]").forEach((el) => {
      const chars = safeSplit(el, { type: "chars", charsClass: "gsap_split_char" });
      if (!chars) {
        gsap.set(el, { opacity: 0, y: "30px" });
        tl.to(el, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, 1.5);
        return;
      }
      gsap.set(chars, { opacity: 0, y: "101%" });
      tl.to(chars, { opacity: 1, y: "0%", stagger: { amount: 0.5 }, ease: "power2.out" }, 1.5);
    });

    // Hero sub-title — split chars
    document.querySelectorAll("[hero-sub-title]").forEach((el) => {
      const chars = safeSplit(el, { type: "chars", charsClass: "gsap_split_char" });
      if (!chars) {
        gsap.set(el, { opacity: 0, y: "30px" });
        tl.to(el, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, 2);
        return;
      }
      gsap.set(chars, { opacity: 0, y: "101%" });
      tl.to(chars, { opacity: 1, y: "0%", stagger: { amount: 0.5 }, ease: "power2.out" }, 2);
    });

    // Hero description — split words
    document.querySelectorAll("[hero-description]").forEach((el) => {
      const words = safeSplit(el, { type: "words", wordsClass: "gsap_split_word" });
      if (!words) {
        gsap.set(el, { opacity: 0, y: "20px" });
        tl.to(el, { opacity: 1, y: 0, duration: 0.75, ease: "power2.out" }, 2.5);
        return;
      }
      gsap.set(words, { opacity: 0, y: "101%" });
      tl.to(words, { opacity: 1, y: "0%", duration: 0.75, stagger: { amount: 0.5 }, ease: "power2.out" }, 2.5);
    });

    // Hero button group
    const heroBtns = document.querySelectorAll("[hero-button-group]");
    if (heroBtns.length) {
      gsap.set(heroBtns, { opacity: 0, y: "30px" });
      tl.to(heroBtns, { opacity: 1, y: "0%", duration: 0.75, stagger: { amount: 0.5 }, ease: "power2.out" }, 3.25);
    }
  }

  // ─────────────────────────────────────────────────────────────────────────
  // NAVBAR BG — scrub en scroll
  // ─────────────────────────────────────────────────────────────────────────
  function initNavbarScrollBg() {
    const navBg = document.querySelector(".navbar3_bg");
    if (!navBg) return;
    gsap.set(navBg, { height: "0%" });
    gsap.to(navBg, {
      height: "100%",
      ease: "none",
      scrollTrigger: {
        start: "top+=88 top",
        end: "top+=176 top",
        scrub: true,
      },
    });
  }

  // ─────────────────────────────────────────────────────────────────────────
  // SCROLL ANIMATIONS
  // ─────────────────────────────────────────────────────────────────────────

  function initTitleAnimations() {
    document.querySelectorAll("[ani-el-title]").forEach((el) => {
      const chars = safeSplit(el, { type: "chars", charsClass: "gsap_split_char" });
      if (!chars) {
        gsap.set(el, { opacity: 0, x: 20 });
        gsap.to(el, {
          opacity: 1, x: 0, ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 80%", toggleActions: "play none none none" },
        });
        return;
      }
      gsap.set(chars, { opacity: 0, x: "1rem" });
      gsap.to(chars, {
        opacity: 1, x: 0,
        stagger: { amount: 0.5 },
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 75%", toggleActions: "play none none none" },
      });
    });
  }

  function initDescriptionAnimations() {
    document.querySelectorAll("[ani-el-description]").forEach((el) => {
      const words = safeSplit(el, { type: "words", wordsClass: "gsap_split_word" });
      if (!words) {
        gsap.set(el, { opacity: 0, y: 20 });
        gsap.to(el, {
          opacity: 1, y: 0, ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 80%", toggleActions: "play none none none" },
        });
        return;
      }
      gsap.set(words, { opacity: 0, y: "101%" });
      gsap.to(words, {
        opacity: 1, y: "0%",
        stagger: { amount: 0.25 },
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 75%", toggleActions: "play none none none" },
      });
    });
  }

  function initButtonAnimations() {
    document.querySelectorAll("[ani-el-button]").forEach((el) => {
      gsap.set(el, { opacity: 0, y: 30 });
      gsap.to(el, {
        opacity: 1, y: 0,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 80%", toggleActions: "play none none none" },
      });
    });
  }

  function initLineAnimations() {
    document.querySelectorAll(".header_line").forEach((el) => {
      gsap.set(el, { width: "0%" });
      gsap.to(el, {
        width: "100%",
        duration: 1,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 75%", toggleActions: "play none none none" },
      });
    });
  }

  function initListAnimations() {
    document.querySelectorAll("[ani-el-list]").forEach((el) => {
      const children = Array.from(el.children);
      if (!children.length) return;
      gsap.set(children, { opacity: 0, y: 40 });
      gsap.to(children, {
        opacity: 1, y: 0,
        stagger: { amount: 0.5 },
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 75%", toggleActions: "play none none none" },
      });
    });
  }

  function initPolygoneAnimations() {
    document.querySelectorAll("[ani-el-polygone]").forEach((el) => {
      gsap.set(el, { scale: 0, rotation: 90, transformOrigin: "center center" });
      gsap.to(el, {
        scale: 1, rotation: 0,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 90%", toggleActions: "play none none none" },
      });
    });
  }

  // ─────────────────────────────────────────────────────────────────────────
  // NAVBAR MOBILE MENU
  // ─────────────────────────────────────────────────────────────────────────
  function initNavbarMobile() {
  if (window.innerWidth > 991) return;  // ← esta línea
  const menuBtn = document.querySelector("[nav-menu-btn]");
  const navMenu = document.querySelector(".navbar3_menu");

    let isOpen = false;
    gsap.set(navMenu, { height: 0, opacity: 0, overflow: "hidden" });

    menuBtn.addEventListener("click", () => {
      isOpen = !isOpen;
      gsap.to(navMenu, {
        height: isOpen ? "auto" : 0,
        opacity: isOpen ? 1 : 0,
        duration: isOpen ? 0.4 : 0.3,
        ease: isOpen ? "power2.out" : "power2.in",
      });
      document.body.classList.toggle("overflow-hidden", isOpen);
    });
  }

  // ─────────────────────────────────────────────────────────────────────────
  // DROPDOWNS DESKTOP
  // ─────────────────────────────────────────────────────────────────────────
  function initDropdowns() {
    const pairs = [
      { toggle: ".navbar3_dropdown-toggle", list: ".navbar3_dropdown-list" },
      { toggle: ".navbar-dropdown4_toggle", list: ".navbar-dropdown4_dropdown-list" },
    ];

    pairs.forEach(({ toggle, list }) => {
      document.querySelectorAll(toggle).forEach((btn) => {
        const dropdown = btn.parentElement.querySelector(list);
        const chevron = btn.querySelector(".dropdown-chevron");
        if (!dropdown) return;

        gsap.set(dropdown, { opacity: 0, y: "0.75rem", pointerEvents: "none", display: "block" });

        btn.addEventListener("mouseenter", () => {
          gsap.to(dropdown, { opacity: 1, y: 0, duration: 0.3, ease: "power2.out", pointerEvents: "auto" });
          if (chevron) gsap.to(chevron, { rotation: 180, duration: 0.3 });
        });

        btn.addEventListener("mouseleave", () => {
          gsap.to(dropdown, { opacity: 0, y: "0.75rem", duration: 0.2, ease: "power2.in", pointerEvents: "none" });
          if (chevron) gsap.to(chevron, { rotation: 0, duration: 0.3 });
        });
      });
    });
  }

  // ─────────────────────────────────────────────────────────────────────────
  // INIT
  // ─────────────────────────────────────────────────────────────────────────
  function init() {
    initHeroAnimations();
    //initNavbarScrollBg();
    initTitleAnimations();
    initDescriptionAnimations();
    initButtonAnimations();
    initLineAnimations();
    initListAnimations();
    initPolygoneAnimations();
    //initNavbarMobile();
    //initDropdowns();

    window.addEventListener("load", () => ScrollTrigger.refresh());
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();