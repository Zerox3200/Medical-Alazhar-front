import React, { useState } from "react";
import Input from "../../components/Input";
import { BiFilterAlt } from "react-icons/bi";
import { FaSearch } from "react-icons/fa";
import LightButton from "../../components/LightButton";
import { NavLink, useLocation } from "react-router";
import _ from "lodash";
import FilterMenu from "./FilterMenu";

const activeTabStyle = "border-hotPink py-3 text-hotPink";

const tabs = [
  { label: "All", value: "all" },
  { label: "Coordinators", value: "coordinators" },
  { label: "Supervisors", value: "supervisors" },
];
const TabsNavigation = ({ setUserType }) => {
  const [tabIndex, setTabIndex] = useState(0);
  const [activeMenuFilter, setActiveMenuFilter] = useState(false);

  const location = useLocation();

  const handleTabClick = (i) => {
    setTabIndex(i);
  };

  return (
    <div>
      <ul className="flex items-center gap-6 text-lg text-primary bg-white border-t-[1px] border-b-[1px] border-cloudVeil pl-8">
        {tabs.map((tab, i) => {
          return (
            <li
              className={`${
                tabIndex === i ? activeTabStyle : "border-transparent"
              } cursor-pointer font-medium border-b-2`}
              key={i}
              onClick={() => {
                handleTabClick(i);
                setUserType(tab.value);
              }}
            >
              <NavLink to={`/supervisors?${tab.value}`}> {tab.label}</NavLink>
            </li>
          );
        })}
      </ul>

      <div className="flex justify-between items-center p-6">
        <h1 className="text-2xl font-medium text-secondary">
          Manage {_.capitalize(location.search.slice(1))}
        </h1>
        {/* Search Bar */}
        <div className="flex items-center gap-2 w-1/2">
          <div className="relative w-full">
            <Input
              placeholder="Search..."
              type="search"
              customStyle="indent-8"
            />
            <p className="absolute left-2 top-1/2 -translate-y-1/2 cursor-pointer text-lg text-mediumGray/80">
              <FaSearch />
            </p>
          </div>
          {/* Filter Menu */}
          <div className="relative">
            <LightButton
              icon={<BiFilterAlt />}
              label="Filters"
              handleClick={() => setActiveMenuFilter(!activeMenuFilter)}
            />
            <FilterMenu activeMenuFilter={activeMenuFilter} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TabsNavigation;
