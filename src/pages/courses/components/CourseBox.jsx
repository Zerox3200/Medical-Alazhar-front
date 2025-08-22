import React from "react";
import { Link } from "react-router";

const CourseBox = ({
  courseTitle = "Blank Title",
  courseDecription = "",
  instructor,
  isCompleted,
  tags = [],
  courseImage = "",
  courseId,
}) => {
  return (
    <div className="bg-white col-span-1 flex flex-col gap-4 p-4 rounded-md shadow-lg ">
      {/* Course Image */}
      <div className="rounded-md">
        <img
          src={courseImage}
          className="w-full h-32 rounded-md object-cover"
          alt="course image"
        />
      </div>
      {/* Separator */}
      <div className="bg-mistyMorning/40 w-full h-[1px] my-2" />
      {/* Course Title */}
      <h2 className="bg-flashWhite rounded-sm p-2">
        <Link
          className="text-secondary hover:text-lightBlue text-lg font-semibold"
          to={`/courses/${courseId}/overview`}
        >
          {courseTitle}
        </Link>
      </h2>
      {/* Course Description */}
      <p className="overflow-hidden whitespace-nowrap overflow-ellipsis">
        {courseDecription}
      </p>
      {/* Course Presenter */}
      <h3>
        Presented by: <strong>{instructor}</strong>
      </h3>
      {/* Course Tags */}
      <div className="flex gap-2 text-secondary font-mono">
        {tags.map((tag, i) => {
          return (
            <span className="bg-flashWhite px-2 py-1 rounded-md" key={i}>
              {tag}
            </span>
          );
        })}
      </div>
      {/* Separator */}
      <div className="bg-mistyMorning/40 w-full h-[1px]" />
      {/* Course State */}
      <h4
        className={`font-semibold text-md py-1 px-2 rounded-lg w-fit ${
          isCompleted
            ? "text-emeraldGreen bg-green-200"
            : "text-error bg-red-300"
        }`}
      >
        {isCompleted ? "Completed" : "Not completed"}
      </h4>
    </div>
  );
};

export default CourseBox;
