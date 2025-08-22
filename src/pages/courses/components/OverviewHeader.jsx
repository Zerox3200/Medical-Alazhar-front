import React from "react";
import { FaStar } from "react-icons/fa";
import { FaPeopleGroup, FaUserDoctor } from "react-icons/fa6";

const OverviewHeader = () => {
  return (
    <div>
      <h1 className="text-secondary text-4xl font-bold text-left mb-6">
        Course Overview and Title
      </h1>
      {/* brief stastistics */}
      <div className="flex justify-between items-center gap-10 text-primary text-lg">
        <div className="flex items-center gap-2">
          <FaStar className="text-yellow-400" />
          <span>4.9 (245,120 ratings)</span>
        </div>
        <div className="flex items-center gap-2">
          <FaPeopleGroup className="text-secondary/70" />
          <span> 1,245,120 students</span>
        </div>
        <div className="flex items-center gap-2">
          <FaUserDoctor className="text-secondary/70" />
          <span>Dr. Abdallah Elmallah</span>
        </div>
      </div>
      {/* Description */}
      <p className="mt-6 text-lg text-secondary/80">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi at
        architecto in eaque, non enim, recusandae aperiam, tempora eum corrupti
        quos totam deleniti magni nobis id earum ab laboriosam dignissimos.
      </p>
    </div>
  );
};

export default OverviewHeader;
