import React from "react";
import { useIntern } from "../../../services/intern/api/hooks/authHooks";
import { useSelector } from "react-redux";
import { IoMdDownload } from "react-icons/io";
import { FaCircleCheck } from "react-icons/fa6";
import instructorImage from "../../../assets/images/instructor.png";
import { HiMiniArrowLongLeft } from "react-icons/hi2";
import { Link } from "react-router";
import Button from "../../components/Button";

const CourseSidebar = ({
  course,
  onItemClick,
  clickedItem,
  setClickedItem,
  setCurrentQuestionNavIndex,
  setCurrentQuestionIndex,
}) => {
  const { id, role } = useSelector((state) => state.auth.user);
  const { internData } = useIntern({
    internId: id,
    userId: id,
    userRole: role,
  });

  console.log(course);

  const courseProgress = internData?.intern?.coursesProgress?.find(
    (progress) => progress.courseId === course?._id
  ) || { videos: [], quizzes: { passed: [] } };

  const orderedItems = course?.videos.reduce((acc, video, index) => {
    acc.push({
      type: "video",
      data: video,
      index: index * 2,
      id: video._id,
    });

    const quiz = course?.quizzes[index];
    if (quiz) {
      acc.push({
        type: "quiz",
        data: quiz,
        index: index * 2 + 1,
        id: quiz._id,
      });
    }
    return acc;
  }, []);

  // Check completion status for each item
  const isItemCompleted = (item) => {
    if (item.type === "video") {
      return courseProgress?.videos?.some((v) => v.videoId === item.id);
    } else {
      return courseProgress?.quizzes?.passed?.some((q) => q.quizId === item.id);
    }
  };

  // Check if item is unlocked (previous item completed)
  const isItemUnlocked = (index) => {
    if (index === 0) return true; // First item always unlocked
    const prevItem = orderedItems[index - 1];
    return isItemCompleted(prevItem);
  };

  return (
    <div>
      <div className="mb-6 text-secondary border-b-1 border-silverFrost p-10">
        <div className="flex items-start gap-4">
          <Link
            className="text-3xl cursor-pointer hover:bg-silverFrost/40 rounded-full p-2"
            to="/courses"
          >
            <HiMiniArrowLongLeft />
          </Link>
          <h1 className="text-xl font-semibold">{course?.title}</h1>
        </div>
        <div className="mt-4 flex items-center gap-4">
          <p className="rounded-full h-12 w-12">
            <img
              src={instructorImage}
              className="rounded-full h-full w-full object-cover"
            />
          </p>
          <p className="flex flex-col items-start">
            <span className="text-mistyMorning">Instructor</span>
            <span className="font-medium ">{course?.instructor}</span>
          </p>
        </div>
      </div>
      {/* Course Material */}
      <div>
        <ul className="flex flex-col gap-4 h-full">
          {orderedItems?.map((item, i) => {
            const completed = isItemCompleted(item);
            const unlocked = isItemUnlocked(item.index);
            return (
              <li
                className={`px-10 py-4 flex justify-between items-center gap-4 ${
                  unlocked
                    ? "text-secondary cursor-pointer hover:text-hotPink"
                    : "text-silverFrost cursor-not-allowed"
                } ${completed ? "!text-mediumGreen" : ""} ${
                  clickedItem === i && unlocked ? "bg-silverFrost/20" : ""
                }`}
                key={item.index}
                onClick={() => {
                  if (unlocked) {
                    onItemClick(item.index, item.data._id);
                    setClickedItem(i);
                    setCurrentQuestionNavIndex(0);
                    setCurrentQuestionIndex(0);
                  }
                }}
              >
                <span className="text-xl font-bold text-secondary">
                  {item.index + 1}
                </span>
                <p className="flex flex-col self-start w-full">
                  <span>
                    {item.type === "video"
                      ? item.data.title
                      : `Quiz ${Math.floor(item.index / 2) + 1}`}
                  </span>
                  <span className="text-mistyMorning">
                    {item.type === "video" && item.data.duration + " minutes"}
                  </span>
                </p>
                <p className="text-mediumGreen">
                  {completed && <FaCircleCheck />}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
      {/* Certificate */}
      {courseProgress?.isCompleted && (
        <div className="mt-10">
          <Button
            customClass="!px-10 !py-4 !bg-emeraldGreen !text-center !border-0 !rounded-none"
            label="Get my certificate"
            icon={<IoMdDownload />}
          />
        </div>
      )}
    </div>
  );
};

export default CourseSidebar;
