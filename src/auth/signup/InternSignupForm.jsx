import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { updateFormData } from "../../services/slices/internSlice";
import FormStepsProgress from "./multistepForm/FormStepsProgress";
import { yupResolver } from "@hookform/resolvers/yup";
import { useInternSignupMutation } from "../../services/intern/api/hooks/authHooks";
import { internSignupValidationSchema } from "../../constants/authFormData";
import PersonalDetails from "./multistepForm/PersonalDetails";
import AcademicDetails from "./multistepForm/AcademicDetails";
import InternshipDetails from "./multistepForm/InternshipDetails";
import IdentificationDocuments from "./multistepForm/IdentificationDocuments";
import { useDispatch, useSelector } from "react-redux";
import FinalStep from "./multistepForm/FinalStep";

const InternSignupForm = () => {
  const [internSignup] = useInternSignupMutation();
  const dispatch = useDispatch();

  const internFormState = useSelector((state) => state.internForm);

  const [activeStep, setActiveStep] = useState(0);
  const [stepValidity, setStepValidity] = useState({});
  const [selectedIDType, setSelectedIDType] = useState("nationalID");

  const {
    register,
    handleSubmit,
    control,
    setValue,
    getValues,
    setError,
    reset,
    trigger,
    formState: { errors, isSubmitSuccessful, isValid },
  } = useForm({
    defaultValues: internFormState,
    resolver: yupResolver(internSignupValidationSchema(selectedIDType)),
    mode: "onChange",
    reValidateMode: "onChange",
  });
  const getStepFields = (stepIndex) => {
    const stepsFields = [
      ["fullname", "arabicName", "dob", "nationality", "email", "phone"],
      [
        "facultyOfGraduation",
        "yearOfGraduation",
        "grade",
        "cummulativeTotal",
        "orderOfGraduate",
      ],
      ["hospital", "internLevel", "internshipStartDate", "idNumber"],
      ["idOrPassportNumber"],
      ["password", "confirmPassword"],
    ];
    return stepsFields[stepIndex] || [];
  };

  const handleNextStep = async () => {
    const currentStepFields = getStepFields(activeStep);
    const isValidStep = await trigger(currentStepFields);

    if (isValidStep) {
      setStepValidity((prev) => ({ ...prev, [activeStep]: true }));
      dispatch(
        updateFormData({
          ...getValues(),
          dob: getValues()?.dob?.toISOString(),
          internshipStartDate: getValues()?.internshipStartDate?.toISOString(),
        })
      );
      setActiveStep((prev) => prev + 1);
    }
  };

  const onSubmit = async ({
    englishName,
    arabicName,
    dob,
    idNumber,
    orderOfGraduate,
    cummulativeTotal,
    idOrPassportNumber,
    email,
    phone,
    password,
    grade,
    facultyOfGraduation,
    hospital,
    internshipStartDate,
    nationality,
    yearOfGraduation,
  }) => {
    try {
      await internSignup({
        englishName,
        arabicName,
        dob,
        idNumber,
        orderOfGraduate,
        cummulativeTotal,
        internshipStartDate,
        idOrPassport: {
          type: selectedIDType,
          number: +idOrPassportNumber.replaceAll("-", ""),
        },
        email,
        phone: "+20" + phone,
        password,
        grade: grade.value,
        facultyOfGraduation: facultyOfGraduation.value,
        hospital: hospital.value,
        nationality: nationality.value,
        yearOfGraduation: yearOfGraduation.value,
      }).unwrap();
    } catch (error) {
      Object.keys(error.data?.message).forEach((field) => {
        setError(error.data[field]?.path, {
          type: "manual",
          message: error.data[field]?.message,
        });
      });
    }
  };

  // Reset form fields after Successful submission
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        englishName: "",
        arabicName: "",
        dob: "",
        idNumber: "",
        cummulativeTotal: "",
        orderOfGraduate: "",
        idOrPassportNumber: "",
        email: "",
        phone: "",
        internshipStartDate: "",
        password: "",
        grade: null,
        facultyOfGraduation: null,
        hospital: null,
        nationality: null,
        yearOfGraduation: null,
      });
    }
  }, [reset, isSubmitSuccessful, setValue]);

  const stepComponent = () => {
    switch (activeStep) {
      case 0:
        return (
          <PersonalDetails
            control={control}
            errors={errors}
            register={register}
          />
        );
      case 1:
        return (
          <AcademicDetails
            control={control}
            errors={errors}
            register={register}
          />
        );
      case 2:
        return (
          <InternshipDetails
            control={control}
            errors={errors}
            register={register}
          />
        );
      case 3:
        return (
          <IdentificationDocuments
            selectedIDType={selectedIDType}
            setSelectedIDType={setSelectedIDType}
            setValue={setValue}
            errors={errors}
            register={register}
          />
        );
      case 4:
        return <FinalStep errors={errors} register={register} />;
    }
  };

  return (
    <div className="flex flex-col justify-between gap-4">
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormStepsProgress
          activeStep={activeStep}
          setActiveStep={setActiveStep}
          stepComponent={stepComponent}
          handleNextStep={handleNextStep}
          isStepValid={isValid}
          isValid={isValid}
        />
      </form>
    </div>
  );
};

export default InternSignupForm;
