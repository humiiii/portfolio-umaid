import React, { useRef, useEffect, useState } from "react";
import { socials } from "../constants";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { CustomEase, SplitText } from "gsap/all";
import Lenis from "lenis";
import { Link } from "react-scroll";

const StaggeredLink = ({ title, to, index, onClick, className, onMouseEnter, onMouseLeave }) => {
  const containerRef = useRef(null);
  const { contextSafe } = useGSAP({ scope: containerRef });

  const handleMouseEnter = contextSafe(() => {
    gsap.to(containerRef.current.querySelectorAll(".primary"), {
      y: "-100%",
      stagger: 0.03,
      duration: 0.4,
      ease: "hop",
      overwrite: true,
    });
    gsap.to(containerRef.current.querySelectorAll(".secondary"), {
      y: "-100%",
      stagger: 0.03,
      duration: 0.4,
      ease: "hop",
      overwrite: true,
    });
    if (onMouseEnter) onMouseEnter();
  });

  const handleMouseLeave = contextSafe(() => {
    gsap.to(containerRef.current.querySelectorAll(".primary"), {
      y: "0%",
      stagger: 0.03,
      duration: 0.4,
      ease: "hop",
      overwrite: true,
    });
    gsap.to(containerRef.current.querySelectorAll(".secondary"), {
      y: "0%",
      stagger: 0.03,
      duration: 0.4,
      ease: "hop",
      overwrite: true,
    });
    if (onMouseLeave) onMouseLeave();
  });

  return (
    <div className="menu-link-wrapper" ref={containerRef}>
      <span className="menu-link-index font-inter">{index < 10 ? `0${index + 1}` : index + 1}</span>
      <Link
        to={to}
        smooth={true}
        duration={1000}
        offset={0}
        onClick={onClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`${className} cursor-pointer inline-block`}
      >
        {title.split("").map((char, i) => (
          <span key={i} className="char-container overflow-hidden relative" style={{ display: "inline-block" }}>
            <span className="char-inner primary block">{char === " " ? "\u00A0" : char}</span>
            <span className="char-inner secondary absolute top-full left-0 block">{char === " " ? "\u00A0" : char}</span>
          </span>
        ))}
      </Link>
    </div>
  );
};

const StaggeredSocial = ({ title, href, className }) => {
  const containerRef = useRef(null);
  const { contextSafe } = useGSAP({ scope: containerRef });

  const onMouseEnter = contextSafe(() => {
    gsap.to(containerRef.current.querySelectorAll(".primary"), {
      y: "-100%",
      stagger: 0.03,
      duration: 0.4,
      ease: "hop",
      overwrite: true,
    });
    gsap.to(containerRef.current.querySelectorAll(".secondary"), {
      y: "-100%",
      stagger: 0.03,
      duration: 0.4,
      ease: "hop",
      overwrite: true,
    });
  });

  const onMouseLeave = contextSafe(() => {
    gsap.to(containerRef.current.querySelectorAll(".primary"), {
      y: "0%",
      stagger: 0.03,
      duration: 0.4,
      ease: "hop",
      overwrite: true,
    });
    gsap.to(containerRef.current.querySelectorAll(".secondary"), {
      y: "0%",
      stagger: 0.03,
      duration: 0.4,
      ease: "hop",
      overwrite: true,
    });
  });

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`${className} inline-block relative`}
      ref={containerRef}
    >
      {title.split("").map((char, i) => (
        <span key={i} className="char-container overflow-hidden relative" style={{ display: "inline-block", height: "1.2em" }}>
          <span className="char-inner primary block">{char === " " ? "\u00A0" : char}</span>
          <span className="char-inner secondary absolute top-full left-0 block">{char === " " ? "\u00A0" : char}</span>
        </span>
      ))}
    </a>
  );
};

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
  const [activeImage, setActiveImage] = useState("/images/me.jpeg");
  const mediaImgRef = useRef(null);

  const handleHover = (imagePath) => {
    if (activeImage === imagePath) return;
    
    gsap.to(mediaImgRef.current, {
      opacity: 0,
      scale: 1.1,
      duration: 0.4,
      ease: "power2.inOut",
      onComplete: () => {
        setActiveImage(imagePath);
        gsap.fromTo(mediaImgRef.current, 
          { opacity: 0, scale: 1.2 },
          { opacity: 0.5, scale: 1, duration: 0.6, ease: "power2.out" }
        );
      }
    });
  };

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

  // ✅ Scroll behavior — hide burger on scroll down, show on scroll up with threshold to avoid jitter
  useEffect(() => {
    let lastScrollY = window.scrollY;
    const threshold = 10; // px
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDiff = Math.abs(currentScrollY - lastScrollY);
      
      if (scrollDiff >= threshold) {
        setShowBurger(currentScrollY <= lastScrollY || currentScrollY < 10);
        lastScrollY = currentScrollY;
      }
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

  const menuItems = ["home", "words", "about", "work", "contact"];

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
          {/* Left Panel: Media */}
          <div className="menu-media-panel" ref={menuMediaWrapperRef}>
            <img 
              src={activeImage} 
              alt="Section Preview" 
              className="menu-media-img"
              ref={mediaImgRef}
            />
          </div>

          {/* Right Panel: Links */}
          <div className="menu-links-panel">
            <div
              className="menu-col flex-1 flex flex-col justify-center"
              ref={(el) => (menuColRefs.current[0] = el)}
            >
                {menuItems.map((section, index) => (
                <div key={index} className="menu-link capitalize">
                  <StaggeredLink
                    to={section}
                    title={section}
                    index={index}
                    onClick={handleMenuToggle}
                    onMouseEnter={() => {
                      // Using the same high-end abstract image for all for now, 
                      // but prepared for specific reveals.
                      handleHover("/images/me.jpeg");
                    }}
                  />
                </div>
              ))}
            </div>

            <div className="menu-footer">
              <div
                className="menu-col"
                ref={(el) => (menuColRefs.current[1] = el)}
              >
                <div className="flex gap-4">
                  {socials.map((social, index) => (
                    <StaggeredSocial
                      key={index}
                      href={social.href}
                      title={social.name}
                      className="text-white/60 hover:text-white transition-colors"
                    />
                  ))}
                </div>
              </div>
              <div
                className="menu-col text-right"
                ref={(el) => (menuColRefs.current[2] = el)}
              >
                <p className="opacity-40 uppercase tracking-widest text-xs mb-1">E-mail</p>
                <p className="text-sm font-medium">muhammadumaid6@gmail.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
