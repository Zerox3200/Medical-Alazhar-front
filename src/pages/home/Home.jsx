import React from "react";
import FooterLinks from "../../components/FooterLinks";
import Hero from "./Hero";
import Features from "./Features";
// import UpcomingEvents from "./UpcomingEvents";
// import LatestNews from "./LatestNews";
import CTA from "./CTA";
import Breif from "./Breif";
import Testimonials from "./Testimonials";

const Home = () => {
  return (
    <div className="relative">
      <div className="bg-flashWhite min-h-screen">
        <Hero />
        <Breif />
        <Testimonials />
        <Features />
        {/* <UpcomingEvents /> */}
        {/* <LatestNews /> */}
        <CTA />
        <FooterLinks />
      </div>
    </div>
  );
};

export default Home;
