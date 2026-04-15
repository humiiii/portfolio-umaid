import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React from "react";

gsap.registerPlugin(ScrollTrigger);

const Services = () => {
  const containerRef = React.useRef(null);

  useGSAP(
    () => {
      const isMobile = window.innerWidth < 768;
      const scrubValue = 1; // Adds smoothing/inertia

      gsap.to("#title_service_1", {
        xPercent: isMobile ? 120 : 20,
        force3D: true,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: scrubValue,
        },
      });

      gsap.to("#title_service_2", {
        xPercent: isMobile ? -150 : -30,
        force3D: true,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: scrubValue,
        },
      });

      gsap.to("#title_service_3", {
        xPercent: isMobile ? 150 : 100,
        force3D: true,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: scrubValue,
        },
      });

      gsap.to("#title_service_4", {
        xPercent: isMobile ? -180 : -100,
        force3D: true,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: scrubValue,
        },
      });
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      className="contact-text-responsive mt-20 mb-42 overflow-hidden text-center leading-snug font-light"
    >
      <div id="title_service_1" className="capitalize">
        <p>architecture</p>
      </div>
      <div
        id="title_service_2"
        className="flex translate-x-16 items-center justify-center gap-4 capitalize"
      >
        <p className="font-normal">development</p>
        <div className="bg-gold h-1 w-20 flex-shrink-0 md:h-1 md:w-32" />
        <p>deployment</p>
      </div>
      <div
        id="title_service_3"
        className="flex -translate-x-48 items-center justify-center gap-4"
      >
        <p className="uppercase">api</p>
        <span>s</span>
        <div className="bg-gold h-1 w-20 flex-shrink-0 md:h-1 md:w-32" />
        <p className="font-normal capitalize">frontends</p>
        <div className="bg-gold h-1 w-20 flex-shrink-0 md:h-1 md:w-32" />
        <p className="capitalize">scalability</p>
      </div>
      <div id="title_service_4" className="translate-x-48">
        <p className="capitalize">databases</p>
      </div>
    </section>
  );
};

export default Services;
