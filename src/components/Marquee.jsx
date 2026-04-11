import { Icon } from "@iconify/react";
import gsap from "gsap";
import { useEffect, useRef } from "react";

const Marquee = ({
  items,
  className = "text-white bg-black",
  icon = "mdi:star-four-points",
  iconClassName = "",
  reverse = false,
  speed = 1.3,
}) => {
  const containerRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    if (!trackRef.current) return;

    const track = trackRef.current;
    
    // Total width of one set of items
    // We animate from 0 to -50% because we have two identical sets
    const tl = gsap.to(track, {
      xPercent: reverse ? 0 : -50,
      duration: 30 / speed,
      repeat: -1,
      ease: "none",
      paused: false,
    });

    // Starting position
    if (reverse) {
      gsap.set(track, { xPercent: -50 });
    } else {
      gsap.set(track, { xPercent: 0 });
    }

    return () => {
      tl.kill();
    };
  }, [items, reverse, speed]);

  const MarqueeLine = () => (
    <div className="flex shrink-0 items-center">
      {items.map((text, index) => (
        <span
          key={index}
          className="mx-4 flex items-center px-8"
        >
          <span className="mr-12">{text}</span>
          <Icon icon={icon} className={`${iconClassName}`} />
        </span>
      ))}
    </div>
  );

  return (
    <div
      ref={containerRef}
      className={`relative flex h-20 w-full items-center overflow-hidden font-light whitespace-nowrap uppercase marquee-text-responsive md:h-[100px] ${className}`}
    >
      <div ref={trackRef} className="marquee-track flex w-max shrink-0">
        <MarqueeLine />
        <MarqueeLine />
        <MarqueeLine />
        <MarqueeLine />
      </div>
    </div>
  );
};

export default Marquee;
