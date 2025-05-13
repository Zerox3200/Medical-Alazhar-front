import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const progressData = [
  { week: "Week 1", cases: 5, procedures: 3, assessments: 0, courses: 4 },
  { week: "Week 2", cases: 12, procedures: 7, assessments: 1, courses: 8 },
  { week: "Week 3", cases: 18, procedures: 10, assessments: 1, courses: 12 },
  { week: "Week 4", cases: 24, procedures: 12, assessments: 2, courses: 18 },
];

const lineConfigs = [
  { dataKey: "cases", name: "Cases", color: "#0088FE", strokeWidth: 3 },
  {
    dataKey: "procedures",
    name: "Procedures",
    color: "#00C49F",
    strokeWidth: 3,
  },
  {
    dataKey: "assessments",
    name: "Assessments",
    color: "#FFBB28",
    strokeWidth: 3,
  },
  { dataKey: "courses", name: "Courses", color: "#FF8042", strokeWidth: 3 },
];

const CurrentRoundProgress = () => {
  return (
    <div className="col-span-1 p-4 ">
      <h2 className="pl-12 mb-4 font-semibold text-2xl">
        Current Round Progress
      </h2>
      <div className="w-full h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={progressData}
            margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="week" tick={{ fill: "#666" }} />
            <YAxis tick={{ fill: "#666" }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid #eee",
                borderRadius: "4px",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              }}
            />
            <Legend
              wrapperStyle={{ paddingTop: "20px" }}
              formatter={(value) => (
                <span className="text-gray-600">{value}</span>
              )}
            />
            {lineConfigs.map((line) => (
              <Line
                key={line.dataKey}
                type="monotone"
                dataKey={line.dataKey}
                name={line.name}
                stroke={line.color}
                strokeWidth={line.strokeWidth}
                dot={{ r: 4 }}
                activeDot={{ r: 6, strokeWidth: 0 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CurrentRoundProgress;
