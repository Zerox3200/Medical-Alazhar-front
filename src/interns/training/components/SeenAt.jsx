import React from "react";
import Select from "react-select";
import trainingData from "../data";

const SeenAt = ({ field }) => {
  return (
    <div>
      <label className="text-md font-medium block mb-2">Seen At</label>
      <Select
        className="block w-full"
        options={trainingData.cases.venueOptions}
        placeholder="Seen At"
        onChange={(value) => field.onChange(value)}
        value={field?.value}
      />
    </div>
  );
};

export default SeenAt;
