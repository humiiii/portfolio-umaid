import gsap from "gsap";
import { CustomEase, SplitText } from "gsap/all";
import Lenis from "lenis";

document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(CustomEase, SplitText);
  CustomEase.create("hop", ".87,.0,.13,1");

  const lenis = new Lenis();

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);

  const textContainers = document.querySelectorAll(".menu-col");
  let splitTextByContainer = [];

  textContainers.forEach((container) => {
    const textElements = container.querySelectorAll("a,p");
    let containerSplits = [];

    textElements.forEach((element) => {
      const split = SplitText.create(element, {
        type: "lines",
        mask: "lines",
        linesClass: "line",
      });
      containerSplits.push(split);

      gsap.set(split.lines, { y: "-110%" });
    });
    splitTextByContainer.push(containerSplits);
  });

  const menuToggleBtn = document.querySelector(".menu-toggle-btn");
  const menuOverlay = document.querySelector(".menu-overlay");
  const menuOverlayContainer = document.querySelector(".menu-overlay-content");
  const menuMediaWrapper = document.querySelector(".menu-media-wrapper");
  const copyContainers = document.querySelector(".menu-col");
  const menuToggleLable = document.querySelector(".menu-toggle-label p");
  const hamburgerIcon = document.querySelector(".menu-hamburger-icon");

  let isMenuOpen = false;
  let isAnimating = false;

  menuToggleBtn.addEventListener("click", () => {
    if (isAnimating) return;

    if (!isMenuOpen) {
      isAnimating = true;
      lenis.stop();

      const tl = gsap.timeline();

      tl.to(menuToggleLable, {
        y: "-110%",
        duration: 1,
        ease: "hop",
      })
        .to(
          menuOverlay,
          {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            duration: 1,
            ease: "hop",
          },
          "<",
        )
        .to(
          menuOverlayContainer,
          {
            yPercent: 0,
            duration: 1,
            ease: "hop",
          },
          "<",
        )
        .to(
          menuMediaWrapper,
          {
            opacity: 1,
            duration: 0.75,
            ease: "power2.out",
            delay: 0.5,
          },
          "<",
        );

      splitTextByContainer.forEach((containerSplits) => {
        const copyLines = containerSplits.flatMap((split) => split.lines);
        tl.to(
          copyLines,
          {
            y: "0%",
            duration: 2,
            ease: "hop",
            stagger: -0.075,
          },
          -0.15,
        );
      });
      hamburgerIcon.classList.add("active");

      tl.call(() => {
        isAnimating = false;
      });
      isMenuOpen = true;
    } else {
      isAnimating = true;

      hamburgerIcon.classList.remove("active");
      const tl = gsap.timeline();

      tl.to(container, {
        y: "0svh",
        duration: 1,
        ease: "hop",
      })
        .to(
          menuOverlay,
          {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
            duration: 1,
            ease: "hop",
          },
          "<",
        )
        .to(
          menuOverlayContainer,
          {
            yPercent: -50,
            duration1,
            ease: "hop",
          },
          "<",
        )
        .to(
          menuToggleLable,
          {
            y: "0%",
            duration: 1,
            ease: "hop",
          },
          "<",
        )
        .to(
          copyContainers,
          {
            opacity: 0.25,
            duration: 1,
            ease: "hop",
          },
          "<",
        );

      tl.call(() => {
        splitTextByContainer.forEach((containerSplits) => {
          const copyLines = containerSplits.flatMap((split) => split.lines);
          gsap.set(copyLines, { y: "-110%" });
        });

        gsap.set(copyContainers, { opacity: 1 });
        gsap.set(menuMediaWrapper, { opacity: 0 });

        isAnimating = false;
        lenis.start();
      });
      isMenuOpen = false;
    }
  });
});
