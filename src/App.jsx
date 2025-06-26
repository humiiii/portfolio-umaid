// App.jsx
import React, { useEffect, useRef, useState } from "react";
import Navbar from "./sections/Navbar";
import Hero from "./sections/Hero";
import Services from "./sections/Services";
import Words from "./sections/Words";
import ReactLenis from "lenis/react";
import About from "./sections/About";
import Works from "./sections/Works";
import Banner from "./sections/Banner";
import Contact from "./sections/Contact";
import { useProgress } from "@react-three/drei";
import gsap from "gsap";

const App = () => {
  const { progress } = useProgress();
  const [isReady, setIsReady] = useState(false);
  const [heroStart, setHeroStart] = useState(false);
  const loaderRef = useRef(null);
  const barRef = useRef(null);

  // Smoothly animate the bar width whenever `progress` changes
  useEffect(() => {
    if (barRef.current) {
      gsap.to(barRef.current, {
        width: `${progress}%`,
        ease: "power1.out", // gentler easing
        duration: 1,
      });
    }
  }, [progress]);

  useEffect(() => {
    if (progress === 100) {
      const timeout = setTimeout(() => {
        gsap.to(loaderRef.current, {
          yPercent: -100,
          duration: 1.8,
          ease: "power3.inOut",
          onComplete: () => {
            setIsReady(true);
            setTimeout(() => setHeroStart(true), 100);
          },
        });
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [progress]);

  // A little poetic phrase instead of plain "Loading"
  // const loadingPhrases = [
  //   "Awakening worlds…",
  //   "Gathering stardust…",
  //   "Shaping dreams…",
  //   "Forging code…",
  //   "Stirring cosmic dust…",
  // ];

  // const phrase =
  //   loadingPhrases[Math.floor((progress / 100) * loadingPhrases.length)];
  const phrase = "Gathering stardust...";

  return (
    <ReactLenis root className="relative min-h-screen w-screen overflow-x-auto">
      {!isReady && (
        <div
          ref={loaderRef}
          className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-black font-light text-white"
        >
          <p className="mb-4 flex animate-pulse flex-col gap-2 text-center text-xl tracking-widest">
            <span>{phrase}</span>
            <span>{Math.floor(progress)}%</span>
          </p>
          <div className="relative h-1 w-60 overflow-hidden rounded bg-white/20">
            <div
              ref={barRef}
              className="absolute top-0 left-0 h-full bg-white"
              style={{ width: `0%` }}
            />
          </div>
        </div>
      )}

      <div
        className={`${isReady ? "opacity-100" : "opacity-0"} transition-opacity duration-1000`}
      >
        <Navbar />
        <Hero start={heroStart} />
        <Services />
        <Words />
        <About />
        <Works />
        <Banner />
        <Contact />
      </div>
    </ReactLenis>
  );
};

export default App;
