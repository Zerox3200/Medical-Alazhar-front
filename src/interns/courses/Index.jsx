import React from "react";
import Header from "../components/Header";
import CourseBox from "./components/CourseBox";
import { useCourses } from "../../services/intern/api/hooks/coursesHooks";
import { useIntern } from "../../services/intern/api/hooks/authHooks";
import { useSelector } from "react-redux";
import SearchWithFilters from "../components/SearchWithFilters";
import Loader from "../../components/Loader";

const Courses = () => {
  const { id, role } = useSelector((state) => state.auth.user);
  const { internData, isLoading, error } = useIntern({
    userRole: role,
    userId: id,
    internId: id,
  });

  const { courses } = useCourses();

  if (!id) return <div>Please log in.</div>;
  if (isLoading) return <Loader />;
  if (error) {
    return <div>Error: {error.data?.message || "Failed to load user"}</div>;
  }

  return (
    <div className="p-6">
      <Header headerTitle="Courses" />
      <div>
        <div className="bg-white p-4 rounded-md">
          <SearchWithFilters placeholder="Search courses..." />
        </div>

        <div className="grid grid-cols-4 gap-6 mt-10">
          {courses?.courses?.map((course, i) => {
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
