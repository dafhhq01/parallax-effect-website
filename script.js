/* DOM READY STATE */
window.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("gsap-ready");
});

gsap.registerPlugin(ScrollTrigger);

/* SCROLL LOCK HANDLER */
function disableScroll() {
  // Lock scroll without removing visual scrollbar
  document.body.classList.add("lock-scroll");
}

function enableScroll() {
  // Unlock scroll after intro animation finishes
  document.body.classList.remove("lock-scroll");

  // Refresh ScrollTrigger to recalculate pin & parallax positions
  ScrollTrigger.refresh();
}

// Lock scroll immediately on load
disableScroll();

/* GLOBAL EASING PRESET */
const smoothBrake = "power3.out";

/* INITIAL STATE SETUP */
gsap.set(".sky", { scale: 1.3 });
gsap.set(".base-platform", { scale: 1.3 });
gsap.set(".porsche-text", { opacity: 0, y: 120 });
gsap.set(".car-hero", { y: -2300 });
gsap.set(".flower-left", { y: 1000 });
gsap.set(".flower-right", { x: -350, y: 1000, scale: 1.6 });

/* INTRO ANIMATION */
const introTL = gsap.timeline({
  delay: 0,
  onComplete: enableScroll,
});

introTL
  .to(
    ".sky",
    {
      scale: 1,
      duration: 1.5,
      ease: "power2.out",
    },
    0
  )
  .to(
    ".base-platform",
    {
      scale: 1,
      duration: 1.5,
      ease: "power2.out",
    },
    0
  )
  .to(
    ".porsche-text",
    {
      opacity: 1,
      y: 120,
      duration: 1.5,
      ease: smoothBrake,
    },
    0
  )
  .to(
    ".car-hero",
    {
      y: 0,
      duration: 1.5,
      ease: smoothBrake,
    },
    0
  )
  .to(
    ".flower-left",
    {
      y: 100,
      duration: 1.5,
      ease: smoothBrake,
    },
    0
  )
  .to(
    ".flower-right",
    {
      x: -350,
      y: 10,
      scale: 1.6,
      duration: 1.5,
      ease: smoothBrake,
    },
    0
  );

/* SCROLL-BASED ANIMATION */
introTL.add(() => {
  const scrollTL = gsap.timeline({
    scrollTrigger: {
      trigger: ".parallax-scene",
      start: "top top",
      end: "+=200%", // Extended scroll space
      scrub: 1.5,
      pin: true,

      // Snap behavior for controlled scroll landing
      snap: {
        snapTo: 1,
        duration: 1,
        delay: 0.1,
        ease: "power2.inOut",
      },
    },
  });

  scrollTL
    // Flowers move upward fastest
    .to(".flower-left, .flower-right", { y: -1500, duration: 1 }, 0)

    // Base platform moves upward at medium speed
    .to(".base-platform", { y: -1000, duration: 1.2 }, 0)

    // Car moves upward slower with scale effect
    .to(".car-hero", { y: -800, scale: 0.8, duration: 1.3 }, 0)

    // Porsche text & sky remain static

    // Page 2 content enters from bottom
    .to(".page2-content", { y: "0%", duration: 0.65 }, 0)
    .to(".next-bg", { duration: 0.65 }, 0)
    .to(".next-text", { y: -20, duration: 0.65 }, 0);
});
