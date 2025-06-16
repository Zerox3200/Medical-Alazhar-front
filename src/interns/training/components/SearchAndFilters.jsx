import React from "react";
import Select from "react-select";
import Button from "../../components/Button";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Typography } from "@mui/material";
import trainingData from "../data";
import { FaCalendarAlt } from "react-icons/fa";
import { FaFilterCircleXmark } from "react-icons/fa6";

const SearchAndFilters = ({
  placeholder = "Search",
  dateFromValue,
  handleDateFrom,
  dateToValue,
  handleDateTo,
  chipValue,
  setChipValue,
  venue,
  setVenue,
  searchValue,
  setSearchValue,
}) => {
  const clearFilters = () => {
    handleDateFrom(new Date("2024-03-01"));
    handleDateTo(new Date());
    setChipValue(null);
    setVenue({});
    setSearchValue("");
  };

  const stateChip = ({ label }) => {
    return (
      <Button
        handleClick={
          (e) => setChipValue(e.target.textContent)
          // setChipValue((prev) => {
          //   if (!prev.includes(e.target.textContent)) {
          //     return [...prev, e.target.textContent];
          //   } else {
          //     return [...prev.filter((ele) => ele !== e.target.textContent)];
          //   }
          // })
        }
        type="button"
        label={label}
        customClass={`!border-mistyMorning/20 !w-fit hover:!bg-secondary/20     ${
          chipValue === label
            ? "!bg-lightBlue !text-white"
            : "!bg-white !text-secondary"
        }`}
      />
    );
  };

  return (
    <form
      className={`my-10 bg-white p-4 rounded-md shadow-sm grid grid-cols-8 gap-4 transition-all duration-300 ease-out`}
    >
      {/* Search Bar */}
      <div className="col-span-full h-full flex justify-between items-center">
        <div className="w-5/6">
          <input
            type="search"
            className="bg-flashWhite/40 p-2 rounded-md outline-none border-1 border-silverFrost/50 text-base text-secondary/60 w-full"
            placeholder={placeholder}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
        <div className="w-fit">
          <Button
            icon={<FaFilterCircleXmark />}
            type="button"
            label="Clear filters"
            customClass="!bg-white !border-flashWhite hover:!opacity-50 !shadow-md !text-secondary"
            handleClick={clearFilters}
          />
        </div>
      </div>
      {/* Filter List */}
      <div
        className={`p-4 rounded-md col-span-full grid grid-cols-6 gap-4 transition-all duration-300 ease-out items-end `}
      >
        <div className="col-span-2">
          <Typography variant="h6" className="!text-secondary !mb-1">
            State
          </Typography>
          <div className="flex gap-2 flex-wrap">
            {stateChip({
              label: "Accepted",
            })}
            {stateChip({
              label: "Under Review",
            })}
            {stateChip({
              label: "Rejected",
            })}
          </div>
        </div>
        {/* Dates */}
        <div className="col-span-3 grid grid-cols-6 gap-4">
          <div className="col-span-3">
            <Typography variant="h6" className="!text-secondary !mb-1">
              From
            </Typography>
            <DatePicker
              dateFormat="MMMM d, yyyy"
              showIcon
              icon={<FaCalendarAlt className="text-secondary mt-0.5" />}
              selected={dateFromValue}
              value={dateFromValue}
              onChange={(value) => {
                handleDateFrom(value);
              }}
              calendarClassName="w-full"
              className="text-secondary border-1 border-mediumGray/20 rounded-sm p-1.5 outline-0 w-full max-w-[200px]"
            />
          </div>
          <div className="col-span-3">
            <Typography variant="h6" className="!text-secondary !mb-1">
              To
            </Typography>
            <DatePicker
              dateFormat="MMMM d, yyyy"
              showIcon
              icon={<FaCalendarAlt className="text-secondary mt-0.5" />}
              selected={dateToValue}
              value={dateToValue}
              onChange={(value) => {
                handleDateTo(value);
              }}
              calendarClassName="w-full"
              className="text-secondary border-1 border-mediumGray/20 rounded-sm p-1.5 outline-0 w-full max-w-[200px]"
            />
          </div>
        </div>
        {/* Venue */}
        <div className="col-span-1">
          <Typography variant="h6" className="!text-secondary !mb-1">
            Venue
          </Typography>
          <Select
            value={venue}
            // selected={venue}
            onChange={(value) => setVenue(value)}
            placeholder="Venue"
            label="venue"
            options={trainingData.cases.venueOptions}
          />
        </div>
      </div>
    </form>
  );
};

export default SearchAndFilters;
