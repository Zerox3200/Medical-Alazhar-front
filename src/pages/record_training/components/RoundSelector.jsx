import React from "react";
import Select from "react-select";
import _ from "lodash";

const rounds = [
  { value: "Pediatrics", label: "Pediatrics" },
  { value: "Internal Medicine", label: "Internal Medicine" },
  { value: "General Surgery", label: "General Surgery" },
  { value: "Obstetrics and Gynecology", label: "Obstetrics and Gynecology" },
  { value: "Urosurgery", label: "Urosurgery" },
  { value: "Emergency", label: "Emergency" },
  { value: "Psychatry", label: "Psychatry" },
  { value: "Family Medicine", label: "Family Medicine" },
  { value: "ICU & Anesthesia", label: "ICU & Anesthesia" },
  { value: "Neurology", label: "Neurology" },
  { value: "ENT", label: "Neurology" },
  { value: "Neurology", label: "ENT" },
  { value: "Ophthalmology", label: "Ophthalmology" },
  { value: "Dermatology", label: "Dermatology" },
  { value: "Rheumatology", label: "Rheumatology" },
  { value: "Radiology", label: "Radiology" },
  { value: "Cardiology", label: "Cardiology" },
  { value: "Orthopedics", label: "Orthopedics" },
  { value: "Clinical Pathology", label: "Clinical Pathology" },
];

const orderedRounds = _.orderBy(rounds, ["label"], ["asc"]);

function RoundSelector() {
  return (
    <Select
      className="block w-full"
      options={orderedRounds}
      placeholder="Round"
    />
  );
}

export default RoundSelector;
