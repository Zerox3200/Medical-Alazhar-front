import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
const data = [
  {
    name: "Surgery",
    passed: 126,
    failed: 4,
    total: 130,
  },
  {
    name: "Medicine",
    passed: 95,
    failed: 62,
    total: 157,
  },
  {
    name: "ObsGyn",
    passed: 88,
    failed: 65,
    total: 153,
  },
  {
    name: "Pediatrics",
    passed: 15,
    failed: 48,
    total: 63,
  },
];
const PassedRounds = () => {
  return (
    <>
      <h1 className="mb-4 text-2xl font-medium text-primary text-center ">
        Passed rounds
      </h1>
      <BarChart width={500} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="passed" fill="#4caf50" />
        <Bar dataKey="failed" fill="#ff999c" />
        <Bar dataKey="total" fill="#c0c8ca" />
      </BarChart>
    </>
  );
};

export default PassedRounds;
