import React, { useState } from "react";
import _ from "lodash";
import Header from "./components/Header";
import TabsNavigation from "./components/TabsNavigation";
import TabsContent from "./components/TabsContent";

const Supervisors = () => {
  const [userType, setUserType] = useState("all");

  return (
    <>
      <Header />
      <TabsNavigation setUserType={setUserType} />
      <TabsContent userType={userType} />
    </>
  );
};

export default Supervisors;
