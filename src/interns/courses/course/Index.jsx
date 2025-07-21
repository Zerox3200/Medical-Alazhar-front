import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { IoIosWarning } from "react-icons/io";
import { FaCheckCircle } from "react-icons/fa";
import { useParams } from "react-router";
import {
  useGetQuizQuery,
  useGetCourseQuery,
  useGetVideoQuery,
  useSubmitQuizProgressMutation,
  useSubmitVideoProgressMutation,
} from "../../../services/intern/api/hooks/coursesHooks";
import CourseSidebar from "./CourseSidebar";
import Video from "./Video";
import Quiz from "./Quiz";

const Course = () => {
  const [clickedItem, setClickedItem] = useState(0);
  const [currentQuestionNavIndex, setCurrentQuestionNavIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [activeItem, setActiveItem] = useState({ index: 0, id: "" });
  const [submitQuizProgress] = useSubmitQuizProgressMutation();
  const [submitVideoProgress] = useSubmitVideoProgressMutation();

  const { courseId } = useParams();
  const { data: courseData } = useGetCourseQuery({ courseId });
  const { data: videoData } = useGetVideoQuery(
    {
      courseId,
      videoId: activeItem.id,
    },
    { skip: activeItem.index % 2 !== 0 || !activeItem.id }
  );

  console.log(courseData);

  const { data: quizData } = useGetQuizQuery(
    { courseId, quizId: activeItem.id },
    { skip: activeItem.index % 2 === 0 || !activeItem.id }
  );

  useEffect(() => {
    if (courseData?.course?.videos?.[0]?._id) {
      setActiveItem({ index: 0, id: courseData.course.videos[0]._id });
    }
  }, [courseData]);

  const handleItemClick = (index, id) => {
    setActiveItem({ index, id });
  };

  const handleVideoComplete = async (videoId) => {
    try {
      const response = await submitVideoProgress({
        courseId,
        videoId,
        isCompleted: true,
      }).unwrap();

      if (response.status === "success") {
        toast.success(response.message, {
          icon: <FaCheckCircle className="text-xl text-emeraldGreen" />,
          className: "!text-mediumGreen !text-lg",
        });
      }

      // Auto-advance to next item (quiz)
      const currentIndex = activeItem.index;
      if (currentIndex % 2 === 0) {
        // Only advance if it's a video
        const nextIndex = currentIndex + 1;
        if (courseData?.course?.quizzes?.[nextIndex / 2]?._id) {
          setActiveItem({
            index: nextIndex,
            id: courseData.course.quizzes[nextIndex / 2]._id,
          });
        }
      }
    } catch (error) {
      toast.error(error.data.message, {
        icon: <IoIosWarning className="text-xl text-yellow-400" />,
        className: "!text-secondary !text-lg",
      });
    }
  };

  const handleQuizComplete = async (quizId, answers) => {
    try {
      const response = await submitQuizProgress({
        courseId,
        quizId,
        answers,
      }).unwrap();

      if (response.status === "success") {
        toast.success(response.message, {
          icon: <FaCheckCircle className="text-xl text-emeraldGreen" />,
          className: "!text-mediumGreen !text-lg",
        });
      }

      // Auto-advance to next video if exists
      const currentIndex = activeItem.index;
      const nextVideoIndex = currentIndex + 1;
      if (courseData?.course?.videos?.[nextVideoIndex / 2]?._id) {
        setActiveItem({
          index: nextVideoIndex,
          id: courseData?.course?.videos[nextVideoIndex / 2]._id,
        });
      }
    } catch (error) {
      toast.error(error.data.message, {
        icon: <IoIosWarning className="text-xl text-yellow-400" />,
        className: "!text-secondary !text-lg",
      });
    }
  };

  return (
    <div>
      <Toaster />
      <div className="grid grid-cols-8">
        <div className="col-span-2">
          <CourseSidebar
            setCurrentQuestionNavIndex={setCurrentQuestionNavIndex}
            setCurrentQuestionIndex={setCurrentQuestionIndex}
            clickedItem={clickedItem}
            setClickedItem={setClickedItem}
            course={courseData?.course}
            onItemClick={handleItemClick}
            activeIndex={activeItem.index}
          />
        </div>
        <div className="col-span-6 p-10 bg-white flex flex-col justify-center">
          <div>
            {activeItem.index % 2 === 0 ? (
              <Video
                video={videoData?.video}
                onComplete={() => handleVideoComplete(activeItem.id)}
              />
            ) : (
              <Quiz
                currentQuestionNavIndex={currentQuestionNavIndex}
                setCurrentQuestionNavIndex={setCurrentQuestionNavIndex}
                currentQuestionIndex={currentQuestionIndex}
                setCurrentQuestionIndex={setCurrentQuestionIndex}
                clickedItem={clickedItem}
                setClickedItem={setClickedItem}
                activeItem={activeItem}
                onItemClick={handleItemClick}
                video={videoData?.video}
                quiz={quizData?.quiz}
                onComplete={(answers) =>
                  handleQuizComplete(activeItem.id, answers)
                }
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Course;
