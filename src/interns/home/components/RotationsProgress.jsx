import React from "react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    roundName: "General Surgery",
    cases: 24,
    procedures: 13,
    assessments: 3,
  },
  {
    roundName: "Internal Medicine",
    cases: 4,
    procedures: 9,
    assessments: 3,
  },
  {
    roundName: "Pediatrics",
    cases: 10,
    procedures: 7,
    assessments: 1,
  },
  {
    roundName: "Obstetrics and Gynacology",
    cases: 8,
    procedures: 18,
    assessments: 5,
  },
];

const RotationsProgress = () => {
  return (
    <div className="col-span-1">
      <h2 className="pl-12 mb-4 font-semibold text-2xl">
        Overll Rotations Progress
      </h2>
      <ResponsiveContainer width={"100%"} height={350}>
        <BarChart width={"100%"} height={250} data={data} barCategoryGap={2}>
          <CartesianGrid strokeDasharray="1 1" />
          <XAxis dataKey="roundName" tick={{ fontSize: 14 }} />
          <YAxis />
          <Tooltip />
          <Legend verticalAlign="bottom" height={36} />
          <Bar dataKey="cases" fill="#8884d8" barSize={20} />
          <Bar dataKey="procedures" fill="#82ca9d" barSize={20} />
          <Bar dataKey="assessments" fill="#0adc90" barSize={20} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RotationsProgress;
