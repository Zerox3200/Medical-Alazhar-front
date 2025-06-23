import _ from "lodash";
import React from "react";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";

const CurrentRoundProgress = ({
  currentRound,
  calculateCompletionPercentage,
  countItemsByState,
}) => {
  const activitiesWidth = Math.round(
    ((countItemsByState(currentRound.selfLearning, "accepted") +
      countItemsByState(currentRound.directLearning, "accepted")) /
      ((currentRound.selfLearning?.length || 0) +
        (currentRound.directLearning?.length || 0))) *
      100 || "0%"
  );

  return (
    <div>
      {currentRound && (
        <div className="bg-white p-6 rounded-md shadow my-8">
          <h2 className="text-xl font-semibold mb-4 text-primary/60">
            {_.startCase(currentRound?.roundId?.name)} Progress
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            {/* Cases */}
            <div className="border border-silverFrost rounded-md p-4">
              <h3 className="font-medium text-secondary mb-2">Cases</h3>
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16">
                  <CircularProgressbar
                    value={calculateCompletionPercentage(currentRound.cases)}
                    text={`${calculateCompletionPercentage(
                      currentRound.cases
                    )}%`}
                    styles={buildStyles({
                      textSize: "32px",
                      pathColor: "#3B82F6",
                      textColor: "#374151",
                    })}
                  />
                </div>
                <div className="text-mistyMorning text-sm">
                  <p>
                    Completed:{" "}
                    {countItemsByState(currentRound.cases, "accepted")}
                  </p>
                  <p>
                    Pending:{" "}
                    {countItemsByState(currentRound.cases, "under_review")}
                  </p>
                  <p>Total: {currentRound.cases?.length || 0}</p>
                </div>
              </div>
            </div>

            {/* Procedures */}
            <div className="border border-silverFrost rounded-md p-4">
              <h3 className="font-medium text-gray-700 mb-2">Procedures</h3>
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16">
                  <CircularProgressbar
                    value={calculateCompletionPercentage(
                      currentRound.procedures
                    )}
                    text={`${calculateCompletionPercentage(
                      currentRound.procedures
                    )}%`}
                    styles={buildStyles({
                      textSize: "32px",
                      pathColor: "#10B981",
                      textColor: "#374151",
                    })}
                  />
                </div>
                <div className="text-mistyMorning text-sm">
                  <p>
                    Completed:{" "}
                    {countItemsByState(currentRound.procedures, "accepted")}
                  </p>
                  <p>
                    Pending:{" "}
                    {countItemsByState(currentRound.procedures, "under_review")}
                  </p>
                  <p>Total: {currentRound.procedures?.length || 0}</p>
                </div>
              </div>
            </div>

            {/* Learning Activities */}
            <div className="border border-silverFrost rounded-md p-4">
              <h3 className="font-medium text-secondary mb-2">
                Learning Activities
              </h3>
              <div className="space-y-2 text-mistyMorning">
                <div className="flex justify-between text-sm">
                  <span>Self Learning:</span>
                  <span>
                    {countItemsByState(currentRound.selfLearning, "accepted")}/
                    {currentRound.selfLearning?.length || 0}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Direct Learning:</span>
                  <span>
                    {countItemsByState(currentRound.directLearning, "accepted")}
                    /{currentRound.directLearning?.length || 0}
                  </span>
                </div>
                <div className="pt-2">
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-purple-500`}
                      style={{ width: activitiesWidth + "%" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Assessments */}
            <div className="border border-silverFrost rounded-md p-4">
              <h3 className="font-medium text-secondary mb-2">Assessments</h3>
              <div className="space-y-2 text-mistyMorning">
                <div className="flex justify-between text-sm">
                  <span>Passed:</span>
                  <span>2 assessments</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Total:</span>
                  <span>3 assessments</span>
                </div>
                <div className="pt-2">
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-purple-500`}
                      style={{ width: activitiesWidth + "%" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CurrentRoundProgress;
