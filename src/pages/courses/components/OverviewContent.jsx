import CourseAccordion from "./Accordion";
import React from "react";

const OverviewContent = () => {
  return (
    <div className="mt-6">
      <h2 className="text-xl text-primary font-semibold">Course Content</h2>

      <div className="flex items-center gap-2 text-primary/70 mt-2">
        <p>41 sections</p>
        <span>-</span>
        <p>49 lectures</p>
        <span>-</span>
        <p>65h 33m total length</p>
      </div>

      <div className="mt-6">
        <CourseAccordion />
      </div>
    </div>
  );
};

export default OverviewContent;
