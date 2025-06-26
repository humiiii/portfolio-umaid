import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import AnimatedHeader from "../components/AnimatedHeader";
import { socials } from "../constants";
import Marquee from "../components/Marquee";

const Contact = () => {
  const text = `Got a question, how or project Idea?
    WE’D love to hear from you and discus further!`;
  const items = [
    "just imagin, I code",
    "just imagin, I code",
    "just imagin, I code",
    "just imagin, I code",
    "just imagin, I code",
  ];
  useGSAP(() => {
    gsap.from(".social-link", {
      y: 100,
      opacity: 0,
      delay: 0.5,
      duration: 1,
      stagger: 0.3,
      ease: "back.out",
      scrollTrigger: {
        trigger: ".social-link",
      },
    });
  }, []);
  return (
    <section
      id="contact"
      className="flex min-h-screen flex-col justify-between bg-black"
    >
      <div>
        <AnimatedHeader
          subTitle={"You Dream It, I Code it"}
          title={"Contact"}
          text={text}
          textColor={"text-white"}
          withScrollTrigger={true}
        />
        <div className="mb-10 flex px-10 text-[26px] leading-none font-light text-white uppercase lg:text-[32px]">
          <div className="flex w-full flex-col gap-10">
            <div className="social-link">
              <h2>E-mail</h2>
              <div className="my-2 h-px w-full bg-white/30" />
              <p className="text-xl tracking-wider lowercase md:text-2xl lg:text-3xl">
                JohnDoe@gmail.com
              </p>
            </div>
            <div className="social-link">
              <h2>Phone</h2>
              <div className="my-2 h-px w-full bg-white/30" />
              <p className="text-xl lowercase md:text-2xl lg:text-3xl">
                +33 7 12 12 32 12
              </p>
            </div>
            <div className="social-link">
              <h2>Social Media</h2>
              <div className="my-2 h-px w-full bg-white/30" />
              <div className="flex flex-wrap gap-2">
                {socials.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className="tracking-wides text-xs leading-loose uppercase transition-colors duration-200 hover:text-white/80 md:text-sm"
                  >
                    {"{ "}
                    {social.name}
                    {" }"}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Marquee items={items} className="bg-transparent text-white" />
    </section>
  );
};

export default Contact;
