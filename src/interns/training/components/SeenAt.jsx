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

const SeenAt = ({ field }) => {
  return (
    <div>
      <label className="text-md font-medium block mb-2">Seen At</label>
      <Select
        className="block w-full"
        options={places}
        placeholder="Seen At"
        onChange={(value) => field.onChange(value)}
        value={field?.value}
      />
    </div>
  );
};

export default SeenAt;
