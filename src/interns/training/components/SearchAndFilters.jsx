import React, { useState } from "react";
import { TbFilterSearch } from "react-icons/tb";
import Select from "react-select";
import Button from "../../components/Button";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const SearchAndFilters = ({
  placeholder = "Search",
  dateFromValue,
  handleDateFrom,
  dateToValue,
  handleDateTo,
}) => {
  const [openedFilterList, setOpenFilterList] = useState(false);

  return (
    <form
      className={`my-10 bg-white p-4 rounded-md shadow-sm grid grid-cols-8 gap-4 transition-all duration-300 ease-out`}
    >
      {/* Search Bar */}
      <div className="col-span-7 h-full">
        <input
          type="search"
          className="bg-flashWhite/40 p-2 rounded-md outline-none border-1 border-silverFrost/50 text-base text-secondary/60 w-full"
          placeholder={placeholder}
        />
      </div>
      <div className="relative col-span-1 flex gap-2 items-center h-full">
        {/* Filter Icon */}
        <div
          className="h-full w-full flex justify-center items-center gap-1 cursor-pointer border-1 border-mistyMorning/30 shadow-lg p-2 rounded-md text-secondary hover:opacity-70"
          onClick={() => setOpenFilterList(!openedFilterList)}
        >
          <p>Filters</p>
          <TbFilterSearch className="text-2xl" />
        </div>
        {/* Filter List */}

        <div
          className={`w-[900px] bg-white shadow-lg border-1 border-mistyMorning/20 p-4 rounded-md absolute right-0 top-full col-span-full grid grid-cols-6 gap-4 transition-all duration-300 ease-out z-50 ${
            openedFilterList
              ? "opacity-100 visible translate-1"
              : "invisible opacity-0 translate-0"
          }`}
        >
          <div className="col-span-2">
            <Select placeholder="Round" label="round" />
          </div>
          <div className="col-span-2">
            <Select placeholder="Venue" label="venue" />
          </div>
          <div className="col-span-2">
            <Select
              placeholder="State"
              lavel="rtate"
              options={[
                { label: "Accepted", value: "accepted" },
                { label: "Rejected", value: "rejected" },
                { label: "Under review", value: "under_review" },
              ]}
            />
          </div>
          {/* Dates */}
          <div className="col-span-full grid grid-cols-6 gap-4">
            <div className="col-span-3 flex items-center justify-around">
              <label className="text-secondary w-32">Date from: </label>
              <DatePicker
                selected={dateFromValue}
                value={dateFromValue}
                onChange={(value) => {
                  handleDateFrom(value);
                }}
                calendarClassName="w-full"
                className="border-1 border-mediumGray/20 rounded-sm p-1.5 outline-0 !w-fit"
              />
            </div>
            <div className="col-span-3 flex items-center">
              <label className="text-secondary w-32">Date to: </label>
              <DatePicker
                selected={dateToValue}
                value={dateToValue}
                onChange={(value) => {
                  handleDateTo(value);
                }}
                calendarClassName="w-full"
                className="border-1 border-mediumGray/20 rounded-sm p-1.5 outline-0 !w-fit"
              />
            </div>
          </div>
          {/* Apply filters button */}
          <Button label="Show results" type="submit" />
        </div>
      </div>
    </form>
  );
};

export default SearchAndFilters;
