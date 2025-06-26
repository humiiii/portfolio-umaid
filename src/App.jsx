import React, { useEffect, useState } from "react";
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

const App = () => {
  const { progress } = useProgress();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (progress === 100) {
      setIsReady(true);
    }
  }, [progress]);
  return (
    <ReactLenis root className="relative min-h-screen w-screen overflow-x-auto">
      {!isReady && (
        <div className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-black font-light text-white transition-opacity duration-700">
          <p className="mb-4 animate-pulse text-xl tracking-widest">
            Loading {Math.floor(progress)}%
          </p>
          <div className="relative h-1 w-60 overflow-hidden rounded bg-white/20">
            <div
              className="absolute top-0 left-0 h-full bg-white transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      )}
      <div
        className={`${
          isReady ? "opacity-100" : "opacity-0"
        } transition-opacity duration-1000`}
      >
        <Navbar />
        <Hero />
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
