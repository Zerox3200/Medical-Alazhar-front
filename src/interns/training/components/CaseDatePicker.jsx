import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CaseDatePicker = () => {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <>
      <DatePicker
        calendarClassName="w-full"
        className="border-1 border-mediumGray/20 rounded-sm p-1.5 outline-0 !w-full"
        selected={startDate}
        onChange={(date) => setStartDate(date)}
      />
    </>
  );
};

export default CaseDatePicker;
