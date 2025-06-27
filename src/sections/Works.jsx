import React, { useRef, useState } from "react";
import AnimatedHeader from "../components/AnimatedHeader";
import { projects } from "../constants";
import { MdArrowOutward } from "react-icons/md";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const Works = () => {
  const text = `The alchemy of chaos and vision 
   where hands shape what 
  the soul whispers`;
  const [currentIndex, setCurrentIndex] = useState(null);

  const previewRef = useRef(null);
  const overlayRefs = useRef([]);

  const mouse = useRef({ x: 0, y: 0 });
  const moveX = useRef(null);
  const moveY = useRef(null);

  useGSAP(() => {
    moveX.current = gsap.quickTo(previewRef.current, "x", {
      duration: 1.5,
      ease: "power3.out",
    });
    moveY.current = gsap.quickTo(previewRef.current, "y", {
      duration: 2,
      ease: "power3.out",
    });

    gsap.from("#project", {
      y: 100,
      opacity: 0,
      delay: 0.5,
      duration: 1,
      stagger: 0.3,
      ease: "back.out",
      scrollTrigger: {
        trigger: "#project",
      },
    });
  }, []);

  const handleMouseEnter = (index) => {
    if (window.innerWidth < 768) return;
    setCurrentIndex(index);

    const el = overlayRefs.current[index];
    if (!el) return;

    gsap.killTweensOf(el);
    gsap.fromTo(
      el,
      {
        clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
      },
      {
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
        duration: 0.15,
        ease: "power2.out",
      },
    );

    gsap.to(previewRef.current, {
      opacity: 1,
      scale: 1,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = (index) => {
    if (window.innerWidth < 768) return;
    setCurrentIndex(null);

    const el = overlayRefs.current[index];
    if (!el) return;

    gsap.killTweensOf(el);
    gsap.to(el, {
      clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
      duration: 0.2,
      ease: "power2.in",
    });

    gsap.to(previewRef.current, {
      opacity: 0,
      scale: 0.95,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMouseMove = (e) => {
    if (window.innerWidth < 768) return;
    mouse.current.x = e.clientX + 24;
    mouse.current.y = e.clientY + 24;
    moveX.current(mouse.current.x);
    moveY.current(mouse.current.y);
  };

  return (
    <section id="work" className="flex min-h-screen flex-col">
      <AnimatedHeader
        title={"works"}
        subTitle={"Build. Burnish. Begin again"}
        text={text}
        textColor={"text-black"}
        withScrollTrigger={true}
      />
      <div
        className="relative flex flex-col font-light"
        onMouseMove={handleMouseMove}
      >
        {projects.map((project, index) => (
          <div
            key={project.id}
            id="project"
            className="group relative flex cursor-pointer flex-col gap-1 py-5 md:gap-0"
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={() => handleMouseLeave(index)}
          >
            <a
              href={`${project.href}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {/* overlay */}
              <div
                ref={(el) => {
                  overlayRefs.current[index] = el;
                }}
                className="clip-path absolute inset-0 -z-10 hidden bg-black duration-200 md:block"
              />

              {/* title */}
              <div className="flex justify-between px-10 text-black transition-all duration-500 md:group-hover:px-12 md:group-hover:text-white">
                <h2 className="text-[26px] leading-none lg:text-[32px]">
                  {project.name}
                </h2>
                <MdArrowOutward className="size-5 md:size-6" />
              </div>
              {/* divider */}
              <div className="h-0.5 w-full bg-black/80" />
              {/* framework */}
              <div className="transtion-all flex gap-x-5 px-10 text-xs leading-loose uppercase duration-500 md:text-sm md:group-hover:px-12">
                {project.frameworks.map((framework) => (
                  <p
                    key={framework.id}
                    className="text-black transition-colors duration-500 md:group-hover:text-white"
                  >
                    {framework.name}
                  </p>
                ))}
              </div>
              {/* mobile preview image */}
              <div className="relative flex h-[400px] items-center justify-center px-10 md:hidden">
                <img
                  src={project.bgImage}
                  alt={`${project.name}-bg-image`}
                  className="h-full w-full rounded-md object-cover brightness-[30%]"
                />
                <img
                  src={project.image}
                  alt={`${project.name}-image`}
                  className="absolute rounded-xl bg-center px-14"
                />
              </div>
            </a>
          </div>
        ))}
        {/* desktop Flaoting preview image */}
        <div
          ref={previewRef}
          className="pointer-events-none fixed -top-2/6 left-0 z-50 hidden w-[960px] overflow-hidden border-8 border-black opacity-0 md:block"
        >
          {currentIndex !== null && (
            <img
              src={projects[currentIndex].image}
              alt="preview"
              className="h-full w-full object-cover"
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default Works;
