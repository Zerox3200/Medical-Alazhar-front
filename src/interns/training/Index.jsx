import { Chip, Stack, Tooltip } from "@mui/material";
import React, { useRef, useState } from "react";
import { FaInfoCircle } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa6";
import { Outlet } from "react-router";
import {
  useGetAllCasesQuery,
  useGetAllProceduresQuery,
} from "../../services/api/internApiSlice";

const wpblSummaryBox = (discriminant, count, bg) => {
  return (
    <div
      className={`col-span-1 p-2 text-crispWhite rounded-md ${bg} text-center`}
    >
      <h2 className="text-xl font-light">{discriminant}</h2>
      <p className="">
        <span className="text-4xl font-semibold">{+count} </span>
        {discriminant.split(" ")[1]}
      </p>
    </div>
  );
};

const RecordTraining = () => {
  const { data: casesData } = useGetAllCasesQuery();
  const { data: proceduresData } = useGetAllProceduresQuery();

  const [selectedRound, setSelectedRound] = useState("General Surgery");
  const [casesCount, setCasesCount] = useState(0);
  const [casesCompleted, setCasesCompleted] = useState(false);
  const roundChipRef = useRef(null);

  return (
    <div className="border-b-2 border-softGray shadow-sm mb-10 pb-10">
      {/* Training Summary */}
      <div className="grid grid-cols-4 gap-4 p-6">
        {wpblSummaryBox("Total cases", casesData?.count, "bg-mediumBlue")}
        {wpblSummaryBox("Total procedures", proceduresData?.count, "bg-coral")}
        {wpblSummaryBox("Learned activities ", 12, "bg-deepBlue")}
        {wpblSummaryBox("Passed assessments", 8, "bg-emeraldGreen")}
      </div>

      <div className="grid grid-cols-3">
        {/* Activities and Rounds */}
        <div className="col-span-2 flex flex-col justify-between gap-6 p-6">
          {/* Recent Activity */}
          <div>
            <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
            <ul className="">
              <li>
                ✅ Logged Procedure: venipuncture and collecting blood samples
                (2nd June)
              </li>
              <li>
                ✅ Attended Online Session: Wound Dressing Basics (18th May)
              </li>
              <li>✅ Logged Case: Gastroenteritis (25th May)</li>
            </ul>
          </div>

          {/* My Rounds */}
          <div>
            <h2 className="text-xl font-bold mb-4 flex items-start relative">
              Rounds
              <Tooltip
                title="The rounds you passed"
                placement="top"
                color="#0d6efd"
              >
                <FaInfoCircle className="text-xs" />
              </Tooltip>
            </h2>
            <div>
              <Stack marginBottom={4} direction={"row"} gap={2}>
                {[
                  { title: "General Surgery", casesCount: 15 },
                  { title: "Internal Medicine", casesCount: 25 },
                  { title: "Pediatrics", casesCount: 5 },
                  { title: "Obstetrics and Gynacology", casesCount: 2 },
                  { title: "Cardiology", casesCount: 0 },
                ].map((round, i) => {
                  return (
                    <Chip
                      ref={roundChipRef}
                      key={i}
                      color={selectedRound === round.title ? "primary" : ""}
                      label={round.title}
                      clickable
                      onClick={() => {
                        setSelectedRound(round.title);
                        setCasesCount(round.casesCount);
                        setCasesCompleted(round.casesCount === 25);
                      }}
                    />
                  );
                })}
              </Stack>

              {/* Rounds Information */}
              <div>
                <div className="flex gap-64 items-center">
                  <div>
                    <h4 className="text-lg flex gap-2">
                      Cases logged:{" "}
                      <p className="font-semibold">
                        {casesCount} out of 25{" "}
                        <span
                          className={`text-xs ${
                            casesCompleted ? "text-emeraldGreen" : "text-error"
                          }`}
                        >
                          {casesCompleted ? "(completed)" : "(not completed)"}
                        </span>
                      </p>
                    </h4>
                  </div>
                </div>

                <div className="flex gap-46 items-center">
                  <div>
                    <h4 className="text-lg flex gap-2">
                      Procedures performed:{" "}
                      <p className="font-semibold">
                        {casesCount} out of 25{" "}
                        <span
                          className={`text-xs ${
                            casesCompleted ? "text-emeraldGreen" : "text-error"
                          }`}
                        >
                          {casesCompleted ? "(completed)" : "(not completed)"}
                        </span>
                      </p>
                    </h4>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg flex gap-2">
                    Round assessments:{" "}
                    <p className="font-semibold">
                      {casesCount} out of 3{" "}
                      <span
                        className={`text-xs ${
                          casesCompleted ? "text-emeraldGreen" : "text-error"
                        }`}
                      >
                        {casesCompleted ? "(completed)" : "(not completed)"}
                      </span>
                    </p>
                  </h4>
                </div>

                <div>
                  <h4 className="text-lg flex gap-2">
                    Self learned courses:{" "}
                    <p className="font-semibold">{casesCount} courses </p>
                  </h4>
                </div>
              </div>
            </div>
          </div>

          {/* My Rounds */}
        </div>
        {/* Upcoming Events */}
        <div className="col-span-1 flex flex-col justify-between gap-6 p-6">
          <div className="shadow-md border-[1px] border-mediumGray/10 rounded-md p-4 hover:bg-softGray">
            <h3 className="text-lg font-semibold mb-4">
              Your next assessments
            </h3>
            <ul className="px-8">
              {[
                { title: "Pediatrics", date: "25/06/2025 - 10:00 AM" },
                { title: "Pediatrics", date: "02/07/2025 - 10:00 AM" },
                { title: "Pediatrics", date: "12/08/2025 - 10:00 AM" },
              ].map((assessment, i) => {
                return (
                  <li
                    className="text-sm flex items-center gap-2 text-mediumGray"
                    key={i}
                  >
                    {assessment.title} {i + 1}{" "}
                    <FaArrowRight className="text-darkGray" />
                    <span className="font-semibold">{assessment.date}</span>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="shadow-md border-[1px] border-mediumGray/10 rounded-md p-4 hover:bg-softGray">
            <h3 className="text-lg font-semibold mb-4">
              Upcoming Online Sessions
            </h3>
            <ul className="list-decimal px-8">
              <li>Infection Control</li>
              <li>Ethics and law</li>
              <li>Basic life support</li>
              <li>Professional skills</li>
              <li>
                Egyptian state policies in health care development, social
                accountability
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* Training Pages */}
      <Outlet />
    </div>
  );
};

export default RecordTraining;
