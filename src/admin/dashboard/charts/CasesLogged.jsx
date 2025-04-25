import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const data = [
  {
    name: "March",
    Surgery: 4000,
    Medicine: 2400,
    ObsGyn: 2400,
    Pediatrics: 2210,
  },
  {
    name: "April",
    Surgery: 3000,
    Medicine: 1398,
    ObsGyn: 2210,
    Pediatrics: 3000,
  },
  {
    name: "May",
    Surgery: 9000,
    Medicine: 1598,
    ObsGyn: 7842,
    Pediatrics: 8245,
  },
];

const CasesLogged = () => {
  return (
    <>
      <h1 className="mb-4 text-2xl font-medium text-primary text-center">
        Cases logged in current rounds
      </h1>
      <AreaChart width={500} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend verticalAlign="bottom" />
        <Area
          type="monotone"
          dataKey="Surgery"
          stackId="1"
          stroke="#8884d8"
          fill="#8884d8"
        />
        <Area
          type="monotone"
          dataKey="Medicine"
          stackId="1"
          stroke="#82ca9d"
          fill="#82ca9d"
        />
        <Area
          type="monotone"
          dataKey="ObsGyn"
          stackId="1"
          stroke="#ff69b4"
          fill="#ff69b4"
        />
        <Area
          type="monotone"
          dataKey="Pediatrics"
          stackId="1"
          stroke="#ffc658"
          fill="#ffc658"
        />
      </AreaChart>
    </>
  );
};

export default CasesLogged;
