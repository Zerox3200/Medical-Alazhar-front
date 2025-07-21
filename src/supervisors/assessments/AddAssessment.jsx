import React, { useState } from "react";
import _ from "lodash";
import Select from "react-select";
import { toast, Toaster } from "react-hot-toast";
import {
  useGetRoundWavesQuery,
  useSupervisor,
} from "../../services/supervisor/api/hooks/supervisorHooks";
import { useSelector } from "react-redux";
import { surgeryList, medicineList, pediatricsList, obsGynList } from "./data";
import * as Yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAddAssessmentMutation } from "../../services/supervisor/api/hooks/supervisorHooks";

const AddAssessment = () => {
  const [selectedWave, setSelectedWave] = useState({});

  const { id } = useSelector((state) => state.auth.user);
  const { supervisorData } = useSupervisor({ supervisorId: id });
  const supervisorSpeciality = supervisorData?.data?.speciality;
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

  /****************************************************************/
  const [addAssessment, { isLoading }] = useAddAssessmentMutation();
  // Create Question Options
  const questionOptions =
    _.snakeCase(supervisorSpeciality) === "general_surgery"
      ? surgeryList
      : _.snakeCase(supervisorSpeciality) === "internal_medicine"
      ? medicineList
      : _.snakeCase(supervisorSpeciality) === "pediatrics"
      ? pediatricsList
      : _.snakeCase(supervisorSpeciality) === "obsgyn"
      ? obsGynList
      : null;

  const scoreOptions = [
    { label: "Below Expectations", value: "below_expectations" },
    { label: "Meet Expectations", value: "meet_expectations" },
    { label: "Above Expectations", value: "above_expectations" },
  ];

  const validationSchema = Yup.object().shape({
    wave: Yup.object()
      .shape({
        value: Yup.number()
          .required()
          .positive("Order must be positive")
          .typeError("Order is required"),
        label: Yup.string().required("Wave is required"),
      })
      .required("Wave is required"),
    internId: Yup.object()
      .shape({
        value: Yup.string().required("Intern is required"),
        label: Yup.string().required("Intern is required"),
      })
      .required("Intern is required"),
    assessmentType: Yup.object()
      .shape({
        value: Yup.string().required("Select a type"),
        label: Yup.string().required("Select a type"),
      })
      .required("Select a type"),
    assessments: Yup.array()
      .of(
        Yup.object().shape({
          question: Yup.object()
            .shape({
              value: Yup.string().required("Question is required"),
              label: Yup.string().required("Question is required"),
            })
            .required("Question is required"),
          score: Yup.string().required("Please select a score"),
        })
      )
      .required("At least one question is required"),
  });

  // Form Config
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      wave: null,
      internId: null,
      assessmentType: null,
      assessments: Array(5).fill({ question: null, score: "" }),
    },
    resolver: yupResolver(validationSchema),
  });

  // Handle submit
  const onSubmit = async (data) => {
    try {
      // internId, assessmentType, question, score, assessmentDate
      const formattedAssessments = data.assessments.map((elassessment) => ({
        question: elassessment.question.value,
        score: elassessment.score,
      }));

      const response = await addAssessment({
        roundId: supervisorData?.data?.round?._id,
        supervisorId: id,
        internId: data.internId?.value,
        assessmentType: data.assessmentType?.value,
        assessmentDomains: formattedAssessments,
        assessmentDate: new Date().toISOString(),
      });
      toast.success(response?.data?.message);
      reset();
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="w-full">
      <Toaster />
      <div className="p-6 shadow-lg rounded-lg bg-white">
        <h1 className="text-secondary text-xl font-medium text-center underline">
          Add new assessment
        </h1>

        {/* Assessment Form */}
        <form
          className="flex flex-col gap-4 justify-between w-2/3 m-auto"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="mt-6 flex gap-4 justify-between w-full">
            <div className="w-1/3">
              <Controller
                name="wave"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    placeholder="Wave"
                    options={wavesOptions}
                    onChange={(value) => {
                      field.onChange(value);
                      setSelectedWave(value);
                    }}
                  />
                )}
              />
              {errors.wave && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.wave?.message}
                </p>
              )}
            </div>
            <div className="w-1/3">
              <Controller
                name="internId"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    placeholder="Intern"
                    options={internsOptions}
                  />
                )}
              />
              {errors.internId && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.internId?.message}
                </p>
              )}
            </div>
            <div className="w-1/3">
              <Controller
                name="assessmentType"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    placeholder="Assessment type"
                    options={[
                      { label: "Mini-CEX", value: "mini_cex" },
                      { label: "DOP", value: "dop" },
                      { label: "CBD", value: "cbd" },
                    ]}
                  />
                )}
              />
              {errors.assessmentType && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.assessmentType?.message}
                </p>
              )}
            </div>
          </div>

          {/* Assessment Tool */}
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="mb-8 p-4 border border-gray-200 rounded-lg"
            >
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Question {index + 1}
                </label>
                <Controller
                  name={`assessments.${index}.question`}
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={questionOptions}
                      className="basic-single"
                      classNamePrefix="select"
                      placeholder="Select a question..."
                    />
                  )}
                />
                {errors.assessments?.[index]?.question && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.assessments[index]?.question?.message}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Score
                </label>
                <div className="flex space-x-4">
                  <Controller
                    name={`assessments.${index}.score`}
                    control={control}
                    render={({ field }) => (
                      <>
                        {scoreOptions.map((option) => (
                          <label
                            key={option.value}
                            className="inline-flex items-center"
                          >
                            <input
                              type="radio"
                              {...field}
                              value={option.value}
                              checked={field.value === option.value}
                              onChange={() => field.onChange(option.value)}
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                            />
                            <span className="ml-2 text-gray-700">
                              {option.label}
                            </span>
                          </label>
                        ))}
                      </>
                    )}
                  />
                </div>
                {errors.assessments?.[index]?.score && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.assessments[index]?.score?.message}
                  </p>
                )}
              </div>
            </div>
          ))}

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-150 ease-in-out ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? "Submitting..." : "Submit Assessment"}
          </button>

          {/* <Button variant="contained" className="!bg-lightBlue !capitalize">
            Insert Now
          </Button> */}
        </form>
      </div>
    </div>
  );
};

export default AddAssessment;
