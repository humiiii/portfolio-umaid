import React, { useRef } from "react";
import AnimatedTextLines from "../components/AnimatedTextLines";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const AnimatedHeader = ({
  subTitle,
  title,
  text,
  textColor,
  start = false,
  withScrollTrigger = false,
}) => {
  const contextRef = useRef(null);
  const headerRef = useRef(null);

  useGSAP(
    () => {
      // if start===true, play immediately, once
      if (start) {
        const tl = gsap.timeline();
        tl.from(contextRef.current, {
          y: "50vh",
          duration: 1,
          ease: "circ.out",
        });
        tl.from(
          headerRef.current,
          { opacity: 0, y: 200, duration: 1, ease: "circ.out" },
          "<+0.2",
        );
        return;
      }

      if (withScrollTrigger) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: contextRef.current,
            start: "top 80%",
            once: true,
          },
        });
        tl.from(contextRef.current, {
          y: "50vh",
          duration: 1,
          ease: "circ.out",
        });
        tl.from(
          headerRef.current,
          { opacity: 0, y: 200, duration: 1, ease: "circ.out" },
          "<+0.2",
        );
      }
    },
    // Re-run this effect any time `start` or `withScrollTrigger` changes
    [start, withScrollTrigger],
  );

  return (
    <div ref={contextRef}>
      <div style={{ clipPath: "polygon(0 0,100% 0,100% 100%,0 100%)" }}>
        <div
          ref={headerRef}
          className="flex flex-col justify-center gap-12 pt-16 sm:gap-16"
        >
          <p
            className={`px-10 text-sm font-light tracking-[0.2rem] ${textColor} uppercase sm:tracking-[0.5rem]`}
          >
            {subTitle}
          </p>
          <div className="px-10">
            <h1
              className={`banner-text-responsive flex flex-col flex-wrap gap-12 ${textColor} pb-1 uppercase sm:gap-16 sm:pb-0 md:block`}
            >
              {title}
            </h1>
          </div>
        </div>
      </div>
      <div className={`relative px-10 ${textColor}`}>
        <div className="absolute inset-x-0 border-t-2" />
        <div className="py-12 text-end sm:py-16">
          <AnimatedTextLines
            className="value-text-responsive font-light uppercase"
            text={text}
            start={start}
          />
        </div>
      </div>
    </div>
  );
};

export default AnimatedHeader;
