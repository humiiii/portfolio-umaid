import React, { useRef } from "react";
import AnimatedHeader from "../components/AnimatedHeader";
import AnimatedTextLines from "../components/AnimatedTextLines";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const About = () => {
  const text = `I took the one less traveled by and 
  that has made all the difference
    { Robert Frost }`;
  const aboutText1 = `To be nobody but yourself in a world which is doing its best to make you like everybody else means to fight the hardest battle. 
  { E.E. Cummings }`;
  const aboutText2 = `
  From earning a Gold Medal in Advanced Skiing to leading teams in football and cricket championships, my journey blends athletic precision with technical passion. A proud alumnus of Tyndale Biscoe School and Cluster University Srinagar, I’ve cultivated a strong foundation in both academics and extracurricular excellence. My internship at IIT Madras sharpened my skills using React, Next.js, bringing performance-driven apps to life.
`;

  const imgRef = useRef(null);

  useGSAP(() => {
    gsap.to("#about", {
      scale: 0.95,
      scrollTrigger: {
        trigger: "#about",
        start: "bottom 80%",
        end: "bottom 20%",
        scrub: true,
      },
      ease: "power1.inOut",
    });
    gsap.set(imgRef.current, {
      clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)",
    });
    gsap.to(imgRef.current, {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      duration: 2,
      ease: "power4.out",
      scrollTrigger: { trigger: imgRef.current },
    });
  });
  return (
    <section id="about" className="min-h-screen rounded-b-4xl bg-black">
      <AnimatedHeader
        title={"about"}
        subTitle={"Precision meets poetry"}
        text={text}
        textColor={"text-white"}
        withScrollTrigger={true}
      />
      <div className="flex flex-col items-center justify-between gap-16 px-10 pb-16 text-xl font-light tracking-wide text-white/60 md:text-2xl lg:flex-row lg:text-3xl">
        <img
          ref={imgRef}
          className="w-md rounded-3xl"
          src="/portfolio-umaid/images/me.jpg"
          alt="umaid"
        />
        <div className="flex flex-col gap-6 text-justify">
          <AnimatedTextLines
            className={"w-full text-white/90"}
            text={aboutText1}
          />
          <AnimatedTextLines className={"w-full text-lg"} text={aboutText2} />
        </div>
      </div>
    </section>
  );
};

export default About;
