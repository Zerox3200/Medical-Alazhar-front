import React, { useState } from "react";
import _ from "lodash";
import TabsNavigation from "./components/TabsNavigation";
import TabsContent from "./components/TabsContent";
import PagesHeader from "../components/PagesHeader";
import { RiTeamFill } from "react-icons/ri";

const Supervisors = () => {
  const [userType, setUserType] = useState("all");

  return (
    <>
      <PagesHeader
        headerTitle="Supervisors"
        headerDescription="Manage your supervisors and coordinators"
        headerIcon={<RiTeamFill />}
        buttonTitle="Add Supervisor"
      />
      <TabsNavigation setUserType={setUserType} />
      <TabsContent userType={userType} />
    </>
  );
};

export default Supervisors;
