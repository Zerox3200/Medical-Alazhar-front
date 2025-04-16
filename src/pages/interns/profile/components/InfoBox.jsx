import React from "react";

const InfoBox = ({ label, value }) => {
  return (
    <li className="items-center mb-4">
      <span className="block text-mediumGray col-span-1">{label}</span>
      <span className="block font-semibold col-span-1">{value}</span>
    </li>
  );
};

export default InfoBox;
