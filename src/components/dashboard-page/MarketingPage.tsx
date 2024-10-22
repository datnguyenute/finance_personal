"use client";

import * as React from "react";
import Divider from "@mui/material/Divider";
import Hero from "./components/Hero";
import LogoCollection from "./components/LogoCollection";
import Features from "./components/Features";
import Footer from "./components/Footer";

export default function MarketingPage() {
  return (
    <>
      <Hero />
      <div>
        <LogoCollection />
        <Features />
        <Divider />
        <Footer />
      </div>
    </>
  );
}
