import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const TrainingDatePicker = () => {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <div>
      <label className="text-md font-medium block mb-2">Date</label>
      <DatePicker
        calendarClassName="w-full"
        className="border-1 border-mediumGray/20 rounded-sm p-1.5 outline-0 !w-full"
        selected={startDate}
        onChange={(date) => setStartDate(date)}
      />
    </div>
  );
};

export default TrainingDatePicker;
