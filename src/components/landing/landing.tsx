"use client";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Footer from "./components/Footer";

const Landing = () => {
  return (
    <>
      <Hero />
      <div>
        <Features />
        <Footer />
      </div>
    </>
  );
};

export default Landing;
