import { React, useRef } from "react";
import AnimatedTextLines from "../components/AnimatedTextLines";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const AnimatedHeader = ({
  subTitle,
  title,
  text,
  textColor,
  withScrollTrigger = false,
}) => {
  const contextRef = useRef(null);
  const headerRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: withScrollTrigger
        ? { trigger: contextRef.current }
        : undefined,
    });

    tl.from(contextRef.current, {
      y: "50vh",
      duration: 1,
      ease: "circ.out",
    });

    tl.from(
      headerRef.current,
      {
        opacity: 0,
        y: 200,
        duration: 1,
        ease: "circ.out",
      },
      "<+0.2",
    );
  }, []);
  return (
    <div ref={contextRef} className="">
      <div style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}>
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
          />
        </div>
      </div>
    </div>
  );
};

export default AnimatedHeader;
