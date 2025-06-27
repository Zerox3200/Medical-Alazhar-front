import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaRegCalendar } from "react-icons/fa";

const BirthdayPicker = ({ field, error, placeholder }) => {
  return (
    <div>
      <DatePicker
        calendarClassName="w-full"
        showIcon
        icon={
          <div className="text-mistyMorning mt-1">
            <FaRegCalendar />
          </div>
        }
        placeholderText={placeholder}
        className={`border-1 border-silverFrost/40 text-secondary/80 focus:border-lightBlue hover:border-lightBlue rounded-sm outline-0 !w-full indent-2 !py-2 ${
          error ? "!border-error" : ""
        }`}
        selected={field.value ? new Date(field.value) : null}
        onChange={(date) => field.onChange(date)}
        dateFormat="yyyy-MM-dd"
        excludeTimes
        isClearable
        showYearDropdown
        dropdownMode="select"
      />
    </div>
  );
};

export default BirthdayPicker;
