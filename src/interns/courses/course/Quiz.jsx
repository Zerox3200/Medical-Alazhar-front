import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useIntern } from "../../../services/intern/api/hooks/authHooks";
import toast, { Toaster } from "react-hot-toast";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import Button from "../../components/Button";
import { useSubmitQuizProgressMutation } from "../../../services/intern/api/hooks/coursesHooks";
import ForceRetake from "./ForceRetake";

const Quiz = ({
  quiz,
  video,
  onItemClick,
  activeItem,
  setClickedItem,
  currentQuestionNavIndex,
  setCurrentQuestionNavIndex,
  currentQuestionIndex,
  setCurrentQuestionIndex,
}) => {
  const { id, role } = useSelector((state) => state.auth.user);
  const { internData } = useIntern({
    internId: id,
    userId: id,
    userRole: role,
  });
  const currentCourse = internData?.intern?.coursesProgress?.filter(
    (course) => course.courseId.toString() === quiz?.courseId
  );
  const currentFailedQuiz = currentCourse?.[0]?.quizzes?.failed?.filter(
    (q) => q.quizId.toString() === quiz._id
  );
  const currentPassedQuiz = currentCourse?.[0]?.quizzes?.passed?.some(
    (q) => q.quizId.toString() === quiz._id
  );

  // Force Taking Quiz Again
  const [forceRetake, setForceRetake] = useState(false);
  const [openForceRetake, setOpenForceRetake] = useState(false);

  const [takeAttempt, setTakeAttempt] = useState(false);
  const [quizAttentionOverlay, setQuizAttentionOverlay] = useState(true);

  const [questionsNav, setQuestionsNav] = useState([]);

  const [selectedAnswers, setSelectedAnswers] = useState({});

  const [submitQuizProgress] = useSubmitQuizProgressMutation();

  const currentQuestion = quiz?.questions[currentQuestionIndex];

  useEffect(() => {
    if (quiz) {
      setQuestionsNav(() => Object.keys(quiz.questions));
    }
  }, [quiz]);

  const handleAnswerSelect = (questionIndex, option) => {
    setSelectedAnswers((prev) => ({ ...prev, [questionIndex]: option }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quiz?.questions.length - 1)
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    setCurrentQuestionNavIndex(currentQuestionIndex + 1);
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0)
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    setCurrentQuestionNavIndex(currentQuestionIndex - 1);
  };

  const handleSubmitQuiz = async () => {
    if (currentPassedQuiz && !forceRetake) {
      setOpenForceRetake(true);
      return;
    }

    if (Object.keys(selectedAnswers).length === quiz?.questions?.length) {
      try {
        const response = await submitQuizProgress({
          courseId: quiz?.courseId,
          quizId: quiz?._id,
          forceRetake: !!forceRetake,
          answers: selectedAnswers,
        }).unwrap();

        console.log("response", response);
        if (response.status === "success") {
          toast.success(response?.message);
        }
      } catch (error) {
        toast.custom(() => (
          <div className="bg-white rounded-md p-4 text-center border-1 border-mistyMorning/20 shadow-md">
            <p className="font-semibold text-error">
              {error?.data?.message?.split(",")[0]},
            </p>
            <p className="text-secondary">
              {error?.data?.message?.split(",")[1]}{" "}
              {error?.data?.message?.split(",")[2]}{" "}
            </p>
          </div>
        ));
      }
    }
  };

  return (
    <div className="h-full relative">
      <Toaster />
      {/* Force Retake */}
      {openForceRetake ? (
        <ForceRetake
          quiz={quiz}
          selectedAnswers={selectedAnswers}
          open={openForceRetake}
          setOpen={setOpenForceRetake}
          setForceRetake={setForceRetake}
        />
      ) : null}

      {/* Quiz Attention */}
      <div
        className={`bg-primary/90 text-white top-0 left-0 w-full h-full flex flex-col justify-center items-center ${
          quizAttentionOverlay ? "fixed" : "hidden"
        }`}
      >
        <h2 className="text-center text-2xl font-semibold mb-6">
          You are about to start this quiz
        </h2>

        <div className="text-lg flex flex-col items-start w-2/4">
          <p>
            Attention: You have only two attempts to pass the test. After using
            all attempts, the test will be temporarily unavailable.
          </p>

          <div className="my-6">
            <p>
              Every attempt has{" "}
              <span className="text-hotPink font-semibold">
                {quiz?.questions.length}
              </span>{" "}
              questions
            </p>
            <p>
              You need a score at least{" "}
              <span className="text-hotPink font-semibold">70%</span> to pass
              the test
            </p>
          </div>

          <div>
            <p className="flex justify-between gap-12">
              <span>Remaining attempts:</span>{" "}
              <span className="text-hotPink font-semibold">
                {currentFailedQuiz?.[0]?.attempts || 2}
              </span>
            </p>
            <p className="flex justify-between gap-12">
              <span>Used attempts:</span>{" "}
              <span className="text-hotPink font-semibold">
                {2 - +currentFailedQuiz?.[0]?.attempts || 0}
              </span>
            </p>
          </div>
          <div className="mt-10 flex justify-between gap-8 w-96">
            <Button
              label="Study again"
              handleClick={() => {
                setQuizAttentionOverlay(false);
                onItemClick(activeItem.index - 1, video._id);
                setClickedItem(activeItem.index - 1);
              }}
            />

            <Button
              label="Take next attempt"
              customClass="!bg-red-400 !border-red-400 hover:!bg-lightRed"
              handleClick={() => {
                setTakeAttempt(true);
                setQuizAttentionOverlay(false);
              }}
            />
          </div>
        </div>
      </div>

      {/* Render when proceed to quiz */}
      {!takeAttempt ? null : (
        <div className="flex flex-col justify-between ">
          {/* Course Title */}
          <h1 className="text-2xl text-secondary font-semibold">
            {video?.title}
          </h1>
          {/* Questions nav */}
          <ul className="flex gap-3 items-center my-4">
            {questionsNav.map((item, i) => {
              return (
                <li
                  key={i}
                  className={`border-1 border-lightBlue p-2 rounded-sm h-10 text-center w-10 cursor-pointer ${
                    currentQuestionNavIndex === i
                      ? "bg-lightBlue text-white"
                      : "text-lightBlue"
                  }`}
                  onClick={() => {
                    setCurrentQuestionIndex(i);
                    setCurrentQuestionNavIndex(i);
                  }}
                >
                  {+item + 1}
                </li>
              );
            })}
          </ul>

          {/* Question text */}
          <h2 className="text-primary font-semibold text-xl mb-6">
            {currentQuestion?.questionText}
          </h2>

          <ul className="my-4 grid grid-cols-2 gap-8">
            {currentQuestion?.options.map((option, i) => {
              return (
                <li
                  className="text-xl text-primary/60 flex items-center gap-2 bg-flashWhite rounded-sm col-span-1 p-4"
                  key={i}
                >
                  <input
                    type="radio"
                    name={`question-${currentQuestionIndex}`}
                    id={`option-${currentQuestionIndex}-${i}`}
                    checked={selectedAnswers[currentQuestionIndex] === option}
                    onChange={() =>
                      handleAnswerSelect(currentQuestionIndex, option)
                    }
                  />
                  <label
                    htmlFor={`option-${currentQuestionIndex}-${i}`}
                    className="cursor-pointer"
                  >
                    {option}
                  </label>
                </li>
              );
            })}
          </ul>

          {/* Previous and next buttons */}
          <div className="flex items-center gap-4 w-42 h-10 self-end">
            <Button
              label={<FaChevronLeft />}
              disabled={currentQuestionIndex === 0}
              customClass={`${
                currentQuestionIndex === 0
                  ? "!bg-silverFrost !border-silverFrost"
                  : ""
              } `}
              handleClick={handlePreviousQuestion}
            />

            {currentQuestionIndex === quiz?.questions.length - 1 ? (
              <Button
                label="Finish"
                disabled={
                  Object.keys(selectedAnswers).length !==
                  quiz?.questions?.length
                }
                customClass={`${
                  Object.keys(selectedAnswers).length ===
                  quiz?.questions?.length
                    ? "!bg-hotPink !border-hotPink !cursor-pointer"
                    : "!bg-silverFrost !border-silverFrost"
                }`}
                handleClick={handleSubmitQuiz}
              />
            ) : (
              <Button
                label={<FaChevronRight />}
                handleClick={handleNextQuestion}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Quiz;
