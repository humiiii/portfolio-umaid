// Hero.jsx
import React from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, Float, Lightformer } from "@react-three/drei";
import { Planet } from "../components/Planet";
import { useMediaQuery } from "react-responsive";
import AnimatedHeader from "../components/AnimatedHeader";

const Hero = ({ start }) => {
  const isSmallScreen = useMediaQuery({ maxWidth: 768 });
  const aboutTextBreak = useMediaQuery({ maxWidth: 767 });
  
  // Calculate a dynamic scale for medium and large screens
  const [dynamicScale, setDynamicScale] = React.useState(1);
  const [lockedHeight, setLockedHeight] = React.useState("100svh");
  const lastWidth = React.useRef(typeof window !== "undefined" ? window.innerWidth : 0);

  React.useEffect(() => {
    // Lock height on mobile to prevent address bar jumps
    if (isSmallScreen && typeof window !== "undefined") {
      setLockedHeight(`${window.innerHeight}px`);
    }

    const handleResize = () => {
      const currentWidth = window.innerWidth;
      if (currentWidth !== lastWidth.current) {
        lastWidth.current = currentWidth;
        
        // Only update height on width change if we're on mobile (for orientation shifts)
        if (isSmallScreen) {
          setLockedHeight(`${window.innerHeight}px`);
        }

        if (!isSmallScreen) {
          // Dynamic scaling factor: 1.0 at 1440px, scaling with viewport
          const scale = Math.min(1.2, Math.max(0.7, currentWidth / 1440));
          setDynamicScale(scale);
        }
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isSmallScreen]);

  const planetScale = isSmallScreen ? 0.6 : dynamicScale;

  const aboutText = aboutTextBreak
    ? `But perhaps you hate a thing and it is 
    good, and you love a thing that is 
    bad for you. And Allāh knows, 
    while you know not.
    { QUR'AN 2:216 }`
    : `But perhaps you hate a thing and it is good, 
    and you love a thing that is bad for you. 
    And Allāh knows, while you know not.
    { QUR'AN 2:216 }`;

  return (
    <section
      id="home"
      className="flex flex-col justify-end"
      style={{ height: lockedHeight }}
    >
      <AnimatedHeader
        title="m. umaid"
        subTitle="Allah is the best of planners. { QUR'AN 3:54 }"
        text={aboutText}
        textColor="text-black"
        start={start}
      />

      <figure
        className="absolute inset-0 -z-50"
        style={{ width: "100vw", height: lockedHeight }}
      >
        <Canvas
          shadows={!isSmallScreen}
          camera={{ position: [0, 0, -10], fov: 17.5, near: 1, far: 20 }}
        >
          <ambientLight intensity={0.5} />
          <Float speed={0.5}>
            <Planet scale={planetScale} start={start} isMobile={isSmallScreen} />
          </Float>
          <Environment resolution={isSmallScreen ? 128 : 256}>
            <group rotation={[-Math.PI / 3, 4, 1]}>
              <Lightformer
                form="circle"
                intensity={2}
                position={[0, 5, -9]}
                scale={10}
              />
              <Lightformer
                form="circle"
                intensity={2}
                position={[0, 3, 1]}
                scale={10}
              />
              <Lightformer
                form="circle"
                intensity={2}
                position={[-5, -1, -1]}
                scale={10}
              />
              <Lightformer
                form="circle"
                intensity={2}
                position={[10, 1, 0]}
                scale={16}
              />
            </group>
          </Environment>
        </Canvas>
      </figure>
    </section>
  );
};

export default Hero;
