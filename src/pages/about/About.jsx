import React from "react";
import Hero from "./Hero";
import FacultyOverview from "./FacultyOverview";
import MissionVision from "./MissionVision";
import DeanMessage from "./DeanMEssage";
import HeadCMEMessage from "./HeadCMEMessage";
import FooterLinks from "../../components/FooterLinks";
import History from "./History";

const About = () => {
  return (
    <div className="min-h-screen bg-flashWhite">
      <Hero />

      <FacultyOverview />

      <MissionVision />

      <DeanMessage />

      <HeadCMEMessage />

      {/* <Vision /> */}

      <History />

      <FooterLinks />
    </div>
  );
};

export default About;
