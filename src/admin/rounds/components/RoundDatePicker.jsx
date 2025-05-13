import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const RoundDatePicker = ({ dateLabel, selectedDate, setSelectedDate }) => {
  return (
    <div>
      <label className="text-md font-medium block mb-2">{dateLabel}</label>
      <DatePicker
        calendarClassName="w-full"
        className="border-1 border-mediumGray/20 rounded-sm p-1.5 outline-0 !w-full"
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
      />
    </div>
  );
};

export default RoundDatePicker;
