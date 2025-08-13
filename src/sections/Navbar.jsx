import React, { useRef, useEffect, useState } from "react";
import { socials } from "../constants";
import gsap from "gsap";
import { CustomEase, SplitText } from "gsap/all";
import Lenis from "lenis";

const Navbar = () => {
  // Refs for DOM elements
  const menuToggleBtnRef = useRef(null);
  const menuOverlayRef = useRef(null);
  const menuOverlayContentRef = useRef(null);
  const menuMediaWrapperRef = useRef(null);
  const menuToggleLabelRef = useRef(null);
  const hamburgerIconRef = useRef(null);
  const menuColRefs = useRef([]);

  // State
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showBurger, setShowBurger] = useState(true);

  // Store split text instances
  const splitTextByContainerRef = useRef([]);
  const lenisRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(CustomEase, SplitText);
    CustomEase.create("hop", ".87,.0,.13,1");

    // ✅ Set initial hidden state so menu doesn't flash on reload
    gsap.set(menuOverlayRef.current, {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
    });
    gsap.set(menuOverlayContentRef.current, { yPercent: -50 });
    gsap.set(menuMediaWrapperRef.current, { opacity: 0 });

    // Lenis smooth scroll
    const lenis = new Lenis();
    lenisRef.current = lenis;
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // SplitText for menu items
    const initializeSplitText = () => {
      splitTextByContainerRef.current = [];
      menuColRefs.current.forEach((container) => {
        if (!container) return;
        const textElements = container.querySelectorAll("a, p");
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
        splitTextByContainerRef.current.push(containerSplits);
      });
    };
    const timeoutId = setTimeout(initializeSplitText, 100);

    return () => {
      clearTimeout(timeoutId);
      lenis.destroy();
      splitTextByContainerRef.current.forEach((containerSplits) => {
        containerSplits.forEach((split) => split.revert());
      });
    };
  }, []);

  // ✅ Scroll behavior — hide burger on scroll down, show on scroll up
  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setShowBurger(currentScrollY <= lastScrollY || currentScrollY < 10);
      lastScrollY = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMenuToggle = () => {
    if (isAnimating) return;

    if (!isMenuOpen) {
      setIsAnimating(true);
      lenisRef.current.stop();

      const tl = gsap.timeline();
      tl.to(menuToggleLabelRef.current, {
        y: "-110%",
        duration: 1,
        ease: "hop",
      })
        .to(
          menuOverlayRef.current,
          {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            duration: 1,
            ease: "hop",
          },
          "<",
        )
        .to(
          menuOverlayContentRef.current,
          {
            yPercent: 0,
            duration: 1,
            ease: "hop",
          },
          "<",
        )
        .to(
          menuMediaWrapperRef.current,
          {
            opacity: 1,
            duration: 0.75,
            ease: "power2.out",
            delay: 0.5,
          },
          "<",
        );

      splitTextByContainerRef.current.forEach((containerSplits) => {
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

      hamburgerIconRef.current.classList.add("active");

      tl.call(() => {
        setIsAnimating(false);
      });

      setIsMenuOpen(true);
    } else {
      setIsAnimating(true);
      hamburgerIconRef.current.classList.remove("active");

      const tl = gsap.timeline();
      tl.to(menuOverlayRef.current, {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
        duration: 1,
        ease: "hop",
      })
        .to(
          menuOverlayContentRef.current,
          {
            yPercent: -50,
            duration: 1,
            ease: "hop",
          },
          "<",
        )
        .to(
          menuToggleLabelRef.current,
          {
            y: "0%",
            duration: 1,
            ease: "hop",
          },
          "<",
        )
        .to(
          menuColRefs.current,
          {
            opacity: 0.25,
            duration: 1,
            ease: "hop",
          },
          "<",
        );

      tl.call(() => {
        splitTextByContainerRef.current.forEach((containerSplits) => {
          const copyLines = containerSplits.flatMap((split) => split.lines);
          gsap.set(copyLines, { y: "-110%" });
        });
        gsap.set(menuColRefs.current, { opacity: 1 });
        gsap.set(menuMediaWrapperRef.current, { opacity: 0 });
        setIsAnimating(false);
        lenisRef.current.start();
      });

      setIsMenuOpen(false);
    }
  };

  return (
    <nav className="navbar">
      <div className="menu-bar">
        <div
          className="menu-toggle-btn ml-auto"
          ref={menuToggleBtnRef}
          onClick={handleMenuToggle}
          style={{
            clipPath: showBurger ? "inset(0 0 0 0)" : "inset(0 100% 0 0)",
            transition: "clip-path 0.3s ease",
          }}
        >
          <div className="menu-toggle-label">
            <p ref={menuToggleLabelRef}>Menu</p>
          </div>
          <div className="menu-hamburger-icon" ref={hamburgerIconRef}>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
      <div className="menu-overlay" ref={menuOverlayRef}>
        <div className="menu-overlay-content" ref={menuOverlayContentRef}>
          <div className="menu-media-wrapper" ref={menuMediaWrapperRef}>
            <img src="/portfolio-umaid/images/me.jpg" alt="" />
          </div>
          <div className="menu-content-wrapper">
            <div className="menu-content-main">
              <div
                className="menu-col"
                ref={(el) => (menuColRefs.current[0] = el)}
              >
                {["home", "words", "about", "work", "contact"].map(
                  (section, index) => (
                    <div key={index} className="menu-link capitalize">
                      <a onClick={handleMenuToggle} href={`#${section}`}>
                        {section}
                      </a>
                    </div>
                  ),
                )}
              </div>
              <div
                className="menu-col"
                ref={(el) => (menuColRefs.current[1] = el)}
              >
                {socials.map((social, index) => (
                  <div className="menu-tag" key={index}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {`{ ${social.name} }`}
                    </a>
                  </div>
                ))}
              </div>
            </div>
            <div className="menu-footer">
              <div
                className="menu-col"
                ref={(el) => (menuColRefs.current[2] = el)}
              >
                <p>E-mail</p>
                <p>muhammadumaid6@gmail.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
