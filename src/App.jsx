import React from "react";
import Navbar from "./sections/Navbar";
import Hero from "./sections/Hero";
import Services from "./sections/Services";
import Words from "./sections/Words";
import ReactLenis from "lenis/react";
import About from "./sections/About";

const App = () => {
  return (
    <ReactLenis
      root
      className="relative min-h-screen w-screen overflow-x-hidden"
    >
      <Navbar />
      <Hero />
      <Services />
      <Words />
      <About />
    </ReactLenis>
  );
};

export default App;
