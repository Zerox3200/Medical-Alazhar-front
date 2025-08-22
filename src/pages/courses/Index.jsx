import React from "react";
import CourseBox from "./components/CourseBox";
import { useCourses } from "../../services/course/api/hooks/courseHooks";
// import { useIntern } from "../../services/intern/api/hooks/authHooks";
// import { useSelector } from "react-redux";
import SearchWithFilters from "./components/SearchWithFilters";
import Loader from "../../components/Loader";

const Courses = () => {
  // const { id, role } = useSelector((state) => state.auth.user);

  const { courses, isLoading } = useCourses();

  // if (!id) return <div>Please log in.</div>;
  if (isLoading) return <Loader />;
  // if (error) {
  //   return <div>Error: {error.data?.message || "Failed to load user"}</div>;
  // }

  return (
    <div className="p-6">
      <div>
        {/* <div className="bg-white p-4 rounded-md">
          <SearchWithFilters placeholder="Search courses..." />
        </div> */}

        {!courses && (
          <h1 className="text-center text-5xl font-bold text-lightRed mt-40">
            No courses found
          </h1>
        )}

        <div className="grid grid-cols-4 gap-6 mt-10 mb-20">
          {courses?.courses?.map((course) => {
            return (
              <CourseBox
                courseId={course._id}
                courseTitle={course.title}
                courseDecription={course.description}
                courseImage={course.courseImage}
                instructor={course.mentor}
                tags={course.tags}
                // isCompleted={
                //   internData?.intern?.coursesProgress?.[i]?.isCompleted
                // }
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Courses;
