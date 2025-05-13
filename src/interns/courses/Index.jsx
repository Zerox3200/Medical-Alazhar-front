import React from "react";
import SearchBar from "../components/SearchBar";
import Header from "../components/Header";
import CourseBox from "./components/CourseBox";
import { useGetAllCoursesQuery } from "../../services/api/coursesApiSlice";
import { useGetInternQuery } from "../../services/api/internApiSlice";
import { useSelector } from "react-redux";

const Courses = () => {
  const { id } = useSelector((state) => state.auth.user);
  const { data: internData } = useGetInternQuery({ internId: id });

  const { data: coursesData } = useGetAllCoursesQuery();

  return (
    <div className="p-6">
      <Header headerTitle="Courses" />
      <div>
        <div className="bg-white p-4 rounded-md">
          <SearchBar placeholder="Search courses..." />
        </div>

        <div className="grid grid-cols-4 gap-6 mt-10">
          {coursesData?.courses?.map((course, i) => {
            return (
              <CourseBox
                courseId={course._id}
                courseTitle={course.title}
                courseDecription={course.description}
                courseImage={course.courseImage}
                instructor={course.instructor}
                tags={course.tags}
                isCompleted={
                  internData?.intern?.coursesProgress?.[i]?.isCompleted
                }
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Courses;
