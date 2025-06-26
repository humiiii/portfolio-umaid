import React, { useRef } from "react";
import AnimatedHeader from "../components/AnimatedHeader";
import { wordsData } from "../constants";
import { useMediaQuery } from "react-responsive";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Words = () => {
  const isMobile = useMediaQuery({ maxWidth: "767px" });
  const aboutText = isMobile
    ? `Let yourself be silently drawn by the 
  strange pull of what you really love
{ Rumi }`
    : `Let yourself be silently drawn by the strange 
    pull of what you really love
{ Rumi }`;

  const wordsRef = useRef([]);

  const isDesktop = useMediaQuery({ minWidth: "48rem" }); //768px

  useGSAP(() => {
    wordsRef.current.forEach((el, i) => {
      if (!el) return;

      gsap.from(el, {
        y: 100,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
        },
      });
    });
  }, []);

  return (
    <section id="words" className="min-h-screen rounded-t-4xl bg-black pb-8">
      <AnimatedHeader
        title={"Words"}
        subTitle={"Behind the scene, Beyond the screen"}
        text={aboutText}
        textColor={"text-white"}
        withScrollTrigger={true}
      />
      {wordsData.map((word, index) => (
        <div
          ref={(el) => (wordsRef.current[index] = el)}
          key={index}
          className="sticky border-t-2 border-white/30 bg-black px-12 pt-6 text-white"
          style={
            isDesktop
              ? {
                  top: `calc(10vh + ${index * 5}em)`,
                  marginBottom: `${(wordsData.length - index - 1) * 5}rem`,
                }
              : { top: 0 }
          }
        >
          <div className="flex items-center justify-center gap-4 font-light">
            <div className="flex flex-col gap-8">
              <h2 className="text-4xl lg:text-5xl">{word.title}</h2>
              <p className="text-xl leading-relaxed tracking-widest text-pretty text-white/60 lg:text-2xl">
                {word.description}
              </p>
              <div className="flex flex-col gap-2 text-2xl text-white/80 sm:gap-4 lg:text-3xl">
                {word.items.map((wordItem, itemIndex) => (
                  <div key={`item-${index}-${itemIndex}`}>
                    <h3 className="flex">
                      <span className="mr-12 text-lg text-white/30">
                        0{itemIndex + 1}
                      </span>
                      {wordItem.title}
                    </h3>
                    {itemIndex < word.items.length - 1 && (
                      <div className="my-4 h-px w-full bg-white/30" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default Words;
