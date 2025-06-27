import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import { roundValidationSchema } from "../constants/roundValdationSchema";
import { ToastContainer, toast } from "react-toastify";
import Select from "react-select";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { setOpenNewRoundModal } from "../../services/slices/adminSlice";
import { useCreateRoundMutation } from "../../services/admin/api/hooks/roundHooks";
import Input from "../components/Input";
import selectOptions from "../constants/selectOptions";
import RoundDatePicker from "./components/RoundDatePicker";
import DarkButton from "../components/DarkButton";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const NewRound = () => {
  const { openNewRoundModal } = useSelector((state) => state.admin);
  const [createNewRound] = useCreateRoundMutation();
  const [selectedStartDate, setSelectedStartDate] = useState(new Date());
  const [selectedEndDate, setSelectedEndDate] = useState(new Date());

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    control,
    setError,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(roundValidationSchema),
    defaultValues: {
      name: "",
      state: null,
      duration: null,
      hospital: null,
      numericYear: null,
      order: "",
      startDate: null,
      endDate: null,
    },
  });

  const handleNewRoundModalClose = () => {
    dispatch(setOpenNewRoundModal({ openNewRoundModal: false }));
    reset();
  };

  const onSubmit = async ({
    name,
    state,
    duration,
    hospital,
    numericYear,
    order,
    startDate,
    endDate,
  }) => {
    try {
      await createNewRound({
        name,
        state: state.value,
        duration: duration.value,
        hospital: _.startCase(hospital.value),
        numericYear: numericYear.value,
        order: order,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
      }).unwrap();
      toast.success("Round created successfully!");
      reset();
    } catch (error) {
      if (error.data?.errors) {
        error.data.errors.forEach((err) => {
          setError(err.path, {
            type: "manual",
            message: err.msg,
          });
        });
      } else {
        toast.error(error.message || "Failed to create round");
      }
    }
  };

  return (
    <Modal
      className="flex justify-center items-center"
      open={openNewRoundModal}
      onClose={handleNewRoundModalClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className="bg-white p-4 rounded-md w-3/6 m-auto">
        <ToastContainer position="top-center" />
        <h1 className="text-2xl mb-8 pb-4 text-secondary font-medium border-b-1 border-cloudVeil text-center">
          Add New Round
        </h1>

        <form
          className="flex flex-col justify-center gap-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex-1 flex gap-4 items-center">
            {/* Round Name */}
            <div className="flex-1">
              <Input placeholder="Name" {...register("name")} />
              {errors && (
                <p className="text-red-500 text-sm">{errors.name?.message}</p>
              )}
            </div>
            {/* Order */}
            <div className="flex-1">
              <Input placeholder="Order" type="number" {...register("order")} />
              {errors && (
                <p className="text-red-500 text-sm">{errors.order?.message}</p>
              )}
            </div>
          </div>

          <div className="flex-1 flex gap-4 items-center">
            <div className="flex-1">
              <Controller
                name="state"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={selectOptions.stateOptions}
                    placeholder="State"
                    onChange={(value) => field.onChange(value)}
                    value={field.value}
                  />
                )}
              />
              {errors.state && (
                <p className="text-red-500 text-sm">{errors.state.message}</p>
              )}
            </div>
            <div className="flex-1">
              <Controller
                name="duration"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={selectOptions.durationOptions}
                    placeholder="Duration"
                    onChange={(value) => field.onChange(value)}
                    value={field.value}
                  />
                )}
              />
              {errors.duration && (
                <p className="text-red-500 text-sm">
                  {errors.duration.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex-1 flex gap-4 items-center">
            <div className="flex-1">
              <Controller
                name="hospital"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={selectOptions.hospitalOptions}
                    placeholder="Hospital"
                    onChange={(value) => field.onChange(value)}
                    value={field.value}
                  />
                )}
              />
              {errors.hospital && (
                <p className="text-red-500 text-sm">
                  {errors.hospital.message}
                </p>
              )}
            </div>
            <div className="flex-1">
              <Controller
                name="numericYear"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={selectOptions.levelOptions}
                    placeholder="Yeal Level"
                    onChange={(value) => field.onChange(value)}
                    value={field.value}
                  />
                )}
              />
              {errors.numericYear && (
                <p className="text-red-500 text-sm">
                  {errors.numericYear.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex-1 flex gap-4 items-center">
            {/* Start Date */}
            <div className="flex-1">
              <Controller
                name="startDate"
                control={control}
                render={({ field }) => (
                  <RoundDatePicker
                    {...field}
                    dateLabel="Start Date"
                    error={errors.startDate?.message}
                    selectedDate={selectedStartDate}
                    setSelectedDate={(date) => {
                      setSelectedStartDate(date);
                      field.onChange(date);
                    }}
                  />
                )}
              />
              {errors.startDate && (
                <p className="text-red-500 text-sm">
                  {errors.startDate.message}
                </p>
              )}
            </div>

            {/* End Date */}
            <div className="flex-1">
              <Controller
                name="endDate"
                control={control}
                render={({ field }) => (
                  <RoundDatePicker
                    {...field}
                    dateLabel="End Date"
                    error={errors.endDate?.message}
                    selectedDate={selectedEndDate}
                    setSelectedDate={(date) => {
                      setSelectedEndDate(date);
                      field.onChange(date);
                    }}
                  />
                )}
              />
              {errors.endDate && (
                <p className="text-red-500 text-sm">{errors.endDate.message}</p>
              )}
            </div>
          </div>
          <div className="flex-1">
            <DarkButton
              type="submit"
              label="Insert Round"
              customClass="w-full text-center justify-center text-xl"
            />
          </div>
          {/*  */}
        </form>
      </div>
    </Modal>
  );
};

export default NewRound;
