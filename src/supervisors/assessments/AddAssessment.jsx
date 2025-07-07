import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import Select from "react-select";
import {
  useGetRoundWavesQuery,
  useSupervisor,
} from "../../services/supervisor/api/hooks/supervisorHooks";
import { useSelector } from "react-redux";

const AddAssessment = () => {
  const [selectedWave, setSelectedWave] = useState({});
  const [selectedIntern, setSelectedIntern] = useState({});
  const [selectedQuestion, setSelectedQuestion] = useState({});
  const [selectedScore, setSelectedScore] = useState({});

  const { id } = useSelector((state) => state.auth.user);
  const { supervisorData } = useSupervisor({ supervisorId: id });
  const { data } = useGetRoundWavesQuery({
    supervisorId: id,
    roundId: supervisorData?.data?.round?._id,
  });

  // Arrange waves
  const wavesOptions = data?.[0]?.waves?.map((wave) => {
    return { label: "wave " + wave.waveOrder, value: wave.waveOrder };
  });

  // Arrange Interns
  const getSelectedWave = data?.[0]?.waves?.filter(
    (wave) => wave.waveOrder === selectedWave?.value
  );

  const internsOptions = getSelectedWave?.[0]?.interns?.map((intern) => {
    return { label: intern.englishName, value: intern._id };
  });

  useEffect(() => {
    if (selectedWave) {
      setSelectedIntern(null);
    }
  }, [selectedWave]);

  return (
    <div className="p-20">
      <div className="p-6 shadow-lg rounded-lg bg-white">
        <h1 className="text-secondary text-xl font-medium text-center">
          Add new assessment
        </h1>

        {/* Assessment Form */}
        <form className="mt-6 flex flex-col gap-4 justify-between w-1/3 m-auto">
          <Select
            placeholder="Wave"
            options={wavesOptions}
            onChange={(value) => {
              setSelectedWave(value);
              setSelectedIntern(null);
            }}
          />
          <Select
            placeholder="Intern"
            options={internsOptions}
            onChange={(value) => setSelectedIntern(value)}
          />
          <Select
            onChange={(value) => setSelectedQuestion(value)}
            placeholder="Question"
            options={[
              { label: "Question #1", value: "q_1" },
              { label: "Question #2", value: "q_2" },
              { label: "Question #3", value: "q_3" },
            ]}
          />
          <Select
            onChange={(value) => setSelectedScore(value)}
            placeholder="Score"
            options={[
              { label: "Above Expectations", value: "above_expectations" },
              { label: "Meet Expectations", value: "meet_expectations" },
              { label: "Below Expectations", value: "below_expectations" },
            ]}
          />

          <Button variant="contained" className="!bg-lightBlue !capitalize">
            Insert Now
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AddAssessment;
