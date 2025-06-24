import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const AnimatedTextLines = ({ text, className }) => {
  const lines = text.split("\n").filter((line) => line.trim() !== "");

  const containerRef = useRef(null);
  const linesRef = useRef([]);

  useGSAP(() => {
    if (linesRef.current.length > 0) {
      gsap.from(linesRef.current, {
        y: 100,
        opacity: 0,
        duration: 1,
        ease: "back.out",
        stagger: 0.3,
        scrollTrigger: {
          trigger: linesRef.current,
        },
      });
    }
  });

  return (
    <div ref={containerRef} className={className}>
      {lines.map((line, index) => (
        <span
          key={index}
          ref={(el) => (linesRef.current[index] = el)}
          className="block leading-relaxed tracking-wide text-pretty"
        >
          {line}
        </span>
      ))}
    </div>
  );
};

export default AnimatedTextLines;
