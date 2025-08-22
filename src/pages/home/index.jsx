import React from "react";
import FooterLinks from "../../components/FooterLinks";
import Hero from "./Hero";
import Features from "./Features";
import UpcomingEvents from "./UpcomingEvents";
import LatestNews from "./LatestNews";
import CTA from "./CTA";

const Home = () => {
  return (
    <div className="relative">
      <div className="bg-flashWhite min-h-screen">
        {/* Hero Section */}
        <Hero />

        {/* Features Section */}
        <Features />

        {/* Upcoming Events */}
        <UpcomingEvents />

        {/* News Section */}
        <LatestNews />

        {/* CTA Section */}
        <CTA />
        {/*Footer Links  */}
        <FooterLinks />
      </div>
    </div>
  );
};

export default Home;
