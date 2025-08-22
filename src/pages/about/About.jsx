import React from "react";
import Hero from "./Hero";
import DeanMessage from "./DeanMEssage";
import HeadCMEMessage from "./HeadCMEMessage";
import Vision from "./Vision";
import FooterLinks from "../../components/FooterLinks";
import History from "./History";

const About = () => {
  return (
    <div className="min-h-screen bg-flashWhite">
      {/* Hero Section */}
      <Hero />

      {/* Dean’s Message */}
      <DeanMessage />

      {/* Head of CME Message */}
      <HeadCMEMessage />

      {/* Faculty Vision */}
      <Vision />

      {/* History Section */}
      <History />

      {/*Footer Links  */}
      <FooterLinks />
    </div>
  );
};

export default About;
