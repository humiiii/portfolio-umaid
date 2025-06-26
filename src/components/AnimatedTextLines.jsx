import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const AnimatedTextLines = ({ text, className, start = false }) => {
  const lines = text.split("\n").filter((line) => line.trim() !== "");
  const containerRef = useRef(null);
  const linesRef = useRef([]);

  useGSAP(
    () => {
      if (linesRef.current.length === 0) return;

      // If `start` is true, animate immediately once
      if (start) {
        gsap.from(linesRef.current, {
          y: 100,
          opacity: 0,
          duration: 1,
          ease: "back.out",
          stagger: 0.3,
        });
        return;
      }

      // Otherwise animate on scroll into view
      gsap.from(linesRef.current, {
        y: 100,
        opacity: 0,
        duration: 1,
        ease: "back.out",
        stagger: 0.3,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          once: true,
        },
      });
    },
    // re-run when `start` changes
    [start],
  );

  return (
    <div ref={containerRef} className={className}>
      {lines.map((line, idx) => (
        <span
          key={idx}
          ref={(el) => (linesRef.current[idx] = el)}
          className="block leading-relaxed tracking-wide"
        >
          {line}
        </span>
      ))}
    </div>
  );
};

export default AnimatedTextLines;
