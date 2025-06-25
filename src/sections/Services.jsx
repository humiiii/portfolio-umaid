import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React from "react";

gsap.registerPlugin(ScrollTrigger);

const Services = () => {
  useGSAP(() => {
    gsap.to("#title_service_1", {
      xPercent: 20,
      scrollTrigger: {
        target: "#title_service_1",
        scrub: true,
      },
    });
    gsap.to("#title_service_2", {
      xPercent: -30,
      scrollTrigger: {
        target: "#title_service_2",
        scrub: true,
      },
    });
    gsap.to("#title_service_3", {
      xPercent: 100,
      scrollTrigger: {
        target: "#title_service_3",
        scrub: true,
      },
    });
    gsap.to("#title_service_4", {
      xPercent: -100,
      scrollTrigger: {
        target: "#title_service_4",
        scrub: true,
      },
    });
  });

  return (
    <section className="contact-text-responsive mt-20 mb-42 overflow-hidden text-center leading-snug font-light capitalize">
      <div id="title_service_1" className="">
        <p>architecture</p>
      </div>
      <div
        id="title_service_2"
        className="flex translate-x-16 items-center justify-center gap-4"
      >
        <p className="font-normal">development</p>
        <div className="bg-gold h-1 w-10 md:w-32" />
        <p>deployment</p>
      </div>
      <div
        id="title_service_3"
        className="flex -translate-x-48 items-center justify-center gap-4"
      >
        <p>apis</p>
        <div className="bg-gold h-1 w-10 md:w-32" />
        <p>frontends</p>
        <div className="bg-gold h-1 w-10 md:w-32" />
        <p>scalability</p>
      </div>
      <div id="title_service_4" className="translate-x-48">
        <p>databases</p>
      </div>
    </section>
  );
};

export default Services;
