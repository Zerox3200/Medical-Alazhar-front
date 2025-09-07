import React from "react";
import Hero from "./Hero";
import FacultyOverview from "./FacultyOverview";
import MissionVision from "./MissionVision";
import DeanMessage from "./DeanMessage";
import HeadCMEMessage from "./HeadCMEMessage";
import Statistics from "./Statistics";
import Awards from "./Awards";
import CallToAction from "./CallToAction";
import FooterLinks from "../../components/FooterLinks";
import History from "./History";

const About = () => {
  return (
    <div className="min-h-screen bg-flashWhite">
      <Hero />

      <Statistics />

      <FacultyOverview />

      <MissionVision />

      <DeanMessage />

      <HeadCMEMessage />


      <Awards />

      <History />

      <CallToAction />

      <FooterLinks />
    </div>
  );
};

export default About;
