import React from "react";
import Select from "react-select";

const places = [
  {
    value: "ER",
    label: "Emergency Room",
  },
  {
    value: "OR",
    label: "Operating Room",
  },
  {
    value: "Inpatient",
    label: "Inpatient",
  },
  {
    value: "Outpatient",
    label: "Outpatient",
  },
  {
    value: "Other",
    label: "Other",
  },
];

const SeenAt = () => {
  return (
    <div>
      <label className="text-md font-medium block mb-2">Seen At</label>
      <Select className="block w-full" options={places} placeholder="Seen At" />
    </div>
  );
};

export default SeenAt;
