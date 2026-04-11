import Marquee from "../components/Marquee";

const Banner = () => {
  const items = [
    "Innovation",
    "Precision",
    "Trust",
    "Collaboration",
    "Excellence",
  ];
  const items2 = [
    "contact me",
    "contact me",
    "contact me",
    "contact me",
    "contact me",
  ];

  return (
    <section className="mt-16 flex min-h-screen flex-col items-center justify-between gap-12 ">
      <Marquee items={items} />
      <div className="contact-text-responsive overflow-hidden text-center font-light">
        <p>
          “ Let’s build a <br />
          <span className="font-normal">memorable</span> &{" "}
          <span className="italic">inspiring</span> <br />
          web application <span className="text-gold">together</span> “
        </p>
      </div>
      <Marquee
        items={items2}
        reverse={true}
        className="border-y-2 bg-transparent text-black"
        iconClassName="stroke-gold stroke-2 text-primary"
        icon="material-symbols-light:square"
      />
    </section>
  );
};

export default Banner;
