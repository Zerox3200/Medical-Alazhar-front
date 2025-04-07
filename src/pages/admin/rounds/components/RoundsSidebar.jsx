import React, { useEffect, useState } from "react";
import { NavLink } from "react-router";
import { useSearchParams } from "react-router";

let rounds = [
  { label: "Internal Medicine", value: "internal_medicine" },
  { label: "Pediatrics", value: "pediatrics" },
  { label: "General Surgery", value: "general_surgery" },
  { label: "Obstetrics and Gynecology", value: "obstetrics_and_gynecology" },
  { label: "Family Medicine", value: "family_medicine" },
  { label: "Cardiology", value: "cardiology" },
  { label: "Neurology", value: "neurology" },
  { label: "Oncology", value: "oncology" },
  { label: "Pulmonology", value: "pulmonology" },
  { label: "Rheumatology", value: "rheumatology" },
  { label: "Neurosurgery", value: "neurosurgery" },
  { label: "Orthopedic Surgery", value: "orthopedic_surgery" },
  { label: "Plastic Surgery", value: "plastic_surgery" },
  { label: "Urology", value: "urology" },
  { label: "Vascular Surgery", value: "vascular_surgery" },
  { label: "Otolaryngology (ENT)", value: "ent" },
  { label: "Anesthesiology and ICU", value: "anesthesiology_and_icu" },
  { label: "Emergency Medicine", value: "emergency_medicine" },
  { label: "Radiology", value: "radiology" },
  { label: "Pathology", value: "pathology" },
  { label: "Dermatology", value: "dermatology" },
  { label: "Psychiatry", value: "psychiatry" },
  { label: "Ophthalmology", value: "ophthalmology" },
];

const RoundsSidebar = () => {
  const [searchValue, setSearchValue] = useState("");
  const [filteredRounds, setFilteredRounds] = useState([]);
  const [searchParams] = useSearchParams();
  const roundName = searchParams.get("round_name");

  useEffect(() => {
    if (!rounds) return;
    const filtered = rounds.filter((round) => {
      const regex = new RegExp(searchValue, "i");
      return regex.test(round.value);
    });
    setFilteredRounds(filtered);
  }, [searchValue]);

  return (
    <div className="bg-mediumGray/10 p-3 pt-10">
      <div className="mb-8">
        <input
          className="border-1 bg-softGray border-mediumGray/30 p-1 w-full rounded-sm outline-0"
          type="search"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Search rounds..."
        />
      </div>
      <h2 className="font-semibold text-2xl mb-4">Rounds</h2>
      <ul className="h-screen overflow-y-scroll bg-softGray p-2">
        {filteredRounds.map((round, i) => {
          return (
            <NavLink to={`/admin/rounds?round_name=${round.value}`} key={i}>
              <li
                className={`${
                  roundName === round.value ? "text-teal bg-teal/10" : ""
                } text-mediumGray/90 cursor-pointer py-2 px-1 text-md hover:bg-teal/10 duration-200 transition-colors`}
              >
                {round.label}
              </li>
            </NavLink>
          );
        })}
      </ul>
    </div>
  );
};

export default RoundsSidebar;
