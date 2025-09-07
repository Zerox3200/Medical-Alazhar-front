import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router';
import { useParams } from 'react-router';
import { useCookies } from 'react-cookie';
import { useQuery } from 'react-query';
import { CoursesRequests, QuizesRequests } from '../../Api/apiRequests';
import {
    FaBook,
    FaPlus,
    FaTrash,
    FaEdit,
    FaEye,
    FaUser,
    FaTag,
    FaPlay,
    FaQuestion,
    FaCheck,
    FaTimes,
    FaArrowLeft
} from 'react-icons/fa';
import Loader from '../../components/Loader';
import { toast } from 'react-toastify';

const quizValidationSchema = Yup.object({
    questions: Yup.array().of(
        Yup.object({
            questionText: Yup.string()
                .required('Question text is required')
                .min(10, 'Question must be at least 10 characters')
                .max(500, 'Question must not exceed 500 characters'),
            options: Yup.array().of(
                Yup.string()
                    .required('Option text is required')
                    .min(2, 'Option must be at least 2 characters')
                    .max(200, 'Option must not exceed 200 characters')
            ).min(2, 'At least 2 options are required').max(6, 'Maximum 6 options allowed'),
            correctAnswer: Yup.string()
                .required('Correct answer is required')
                .test('is-valid-answer', 'Correct answer must be one of the options', function (value) {
                    const { options } = this.parent;
                    return options && options.includes(value);
                })
        })
    ).min(1, 'At least one question is required').max(50, 'Maximum 50 questions allowed'),
    videoId: Yup.string()
        .required('Please select a video for this quiz')
});

export default function AddQuizes() {
    const { courseId } = useParams();
    const [Token] = useCookies(['Al-Azhar']);

    const navigate = useNavigate();

    const getCourseMainData = async () => {
        const response = await CoursesRequests.getCourseById(courseId, Token['Al-Azhar']);
        return response?.data?.course;
    };

    const { data: courseMainData, isLoading: courseMainDataLoading, refetch } = useQuery({
        queryKey: ["get course main data", courseId],
        queryFn: getCourseMainData,
        enabled: !!courseId && !!Token['Al-Azhar']
    });

    const handleCreateQuiz = async (values) => {
        const neededData = {
            videoId: values.videoId,
            questions: values.questions,
            courseId
        }
        console.log(neededData);
        const response = await QuizesRequests.createQuiz(neededData, Token['Al-Azhar']);
        if (response?.success) {
            toast.success("Quiz Added Successfully");
            formik.resetForm();
            navigate(`/admin/course-videos/${courseId}`);
        } else {
            toast.error(response?.message);
        }
    }

    const formik = useFormik({
        initialValues: {
            questions: [
                {
                    questionText: '',
                    options: ['', '', '', ''],
                    correctAnswer: ''
                }
            ],
            videoId: ''
        },
        validationSchema: quizValidationSchema,
        onSubmit: handleCreateQuiz
    });

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    useEffect(() => {
        if (courseId) {
            refetch();
        }
    }, [courseId]);

    const getAvailableVideosForQuiz = async () => {
        const response = await QuizesRequests.getAvailableVideosForQuiz(Token['Al-Azhar'], courseId);
        return response?.availableVideos;
    }

    const { data: availableVideosForQuiz, isLoading: availableVideosForQuizLoading } = useQuery({
        queryKey: ["available videos for quiz"],
        queryFn: getAvailableVideosForQuiz,
        enabled: !!Token['Al-Azhar']
    });


    if (courseMainDataLoading || availableVideosForQuizLoading) return <Loader />;

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-2 sm:p-4 lg:p-6">
            <motion.div
                className="max-w-7xl mx-auto"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {/* Header */}
                <motion.div className="mb-4 sm:mb-6" variants={itemVariants}>
                    <div className="w-full p-2 sm:p-3">
                        <div className="flex flex-wrap items-center text-xs sm:text-sm">
                            <Link to="/admin/all-courses" className='text-gray-500 hover:text-gray-700'>courses / </Link>
                            <Link to={`/admin/course-videos/${courseId}`} className='text-gray-500 hover:text-gray-700 truncate max-w-[150px] sm:max-w-none'>{courseMainData?.title} / </Link>
                            <span className='text-blue-500 font-bold'>Add Quiz</span>
                        </div>
                    </div>
                    <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-3 sm:p-6 lg:p-8 border border-gray-100">
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 sm:gap-4 lg:gap-6">
                            <div className="flex-1 min-w-0">
                                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 mb-1 sm:mb-2">Create New Quiz</h1>
                                <p className="text-xs sm:text-sm lg:text-base text-gray-600">Add interactive quiz content to this course</p>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                                <Link
                                    to={`/admin/course-videos/${courseId}`}
                                    className="inline-flex items-center justify-center space-x-2 px-3 sm:px-4 lg:px-6 py-2 sm:py-3 bg-gray-100 text-gray-700 rounded-lg sm:rounded-xl font-semibold hover:bg-gray-200 transition-all duration-200 text-xs sm:text-sm lg:text-base"
                                >
                                    <FaArrowLeft className="text-xs sm:text-sm" />
                                    <span>Back to Course</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Course Main Data */}
                <motion.div className="mb-4 sm:mb-6" variants={itemVariants}>
                    <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                        {/* Course Header */}
                        <div className="p-3 sm:p-6 lg:p-8 border-b border-gray-100">
                            <div className="flex items-center justify-between mb-3 sm:mb-4">
                                <div className="flex items-center space-x-2 sm:space-x-3">
                                    <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-semibold ${courseMainData?.published
                                        ? 'bg-green-100 text-green-700'
                                        : 'bg-yellow-100 text-yellow-700'
                                        }`}>
                                        {courseMainData?.published ? 'Published' : 'Draft'}
                                    </span>
                                </div>
                            </div>
                            <h2 className="text-lg sm:text-2xl lg:text-3xl font-bold text-gray-800 mb-2 sm:mb-3">
                                {courseMainData?.title || 'Course Title'}
                            </h2>
                            <p className="text-xs sm:text-sm lg:text-base text-gray-600 mb-4 sm:mb-6">
                                {courseMainData?.description || 'Course description will appear here'}
                            </p>
                        </div>

                        {/* Course Details */}
                        <div className="p-3 sm:p-4 lg:p-6">
                            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
                                <div className="flex items-center space-x-2 sm:space-x-3">
                                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <FaUser className="text-blue-600 text-xs sm:text-sm" />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <p className="text-xs sm:text-sm text-gray-500">Mentor</p>
                                        <p className="font-semibold text-gray-800 text-xs sm:text-sm truncate">{courseMainData?.mentor || 'Dr. Mentor Name'}</p>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-2 sm:space-x-3">
                                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <FaPlay className="text-green-600 text-xs sm:text-sm" />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <p className="text-xs sm:text-sm text-gray-500">Videos</p>
                                        <p className="font-semibold text-gray-800 text-xs sm:text-sm">{courseMainData?.videos?.length || 0}</p>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-2 sm:space-x-3">
                                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <FaBook className="text-purple-600 text-xs sm:text-sm" />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <p className="text-xs sm:text-sm text-gray-500">Quizzes</p>
                                        <p className="font-semibold text-gray-800 text-xs sm:text-sm">{courseMainData?.quizzes?.length || 0}</p>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-2 sm:space-x-3">
                                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <FaTag className="text-orange-600 text-xs sm:text-sm" />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <p className="text-xs sm:text-sm text-gray-500">Tags</p>
                                        <p className="font-semibold text-gray-800 text-xs sm:text-sm">{courseMainData?.tags?.length || 0}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Tags */}
                            {courseMainData?.tags && courseMainData.tags.length > 0 && (
                                <div className="flex flex-wrap gap-1 sm:gap-2">
                                    {courseMainData.tags.map((tag, index) => (
                                        <span
                                            key={index}
                                            className="px-2 sm:px-3 py-1 bg-blue-100 text-blue-700 text-xs sm:text-sm rounded-full"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </motion.div>

                {/* Quiz Form */}
                <motion.div className="mb-4 sm:mb-6" variants={itemVariants}>
                    <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                        <div className="p-3 sm:p-4 lg:p-6 border-b border-gray-100">
                            <div className="flex items-center space-x-2 sm:space-x-3">
                                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <FaQuestion className="text-white text-xs sm:text-sm" />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <h3 className="text-base sm:text-lg lg:text-xl font-bold text-gray-800">Quiz Details</h3>
                                    <p className="text-xs sm:text-sm text-gray-600">Create interactive quiz questions</p>
                                </div>
                            </div>
                        </div>

                        <form onSubmit={formik.handleSubmit} className="p-3 sm:p-4 lg:p-6">
                            {/* Video Selection */}
                            <div className="mb-4 sm:mb-6">
                                <label htmlFor="videoId" className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2 sm:mb-3">
                                    Associated Video (Not Added Yet)
                                </label>
                                <div className="relative">
                                    <FaPlay className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs sm:text-sm" />
                                    <select
                                        id="videoId"
                                        name="videoId"
                                        value={formik.values.videoId}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        className={`w-full pl-8 sm:pl-10 pr-4 py-2 sm:py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 appearance-none text-xs sm:text-sm ${formik.errors.videoId && formik.touched.videoId
                                            ? 'border-red-300 bg-red-50'
                                            : 'border-gray-300'
                                            }`}
                                    >
                                        <option value="">Select a video for this quiz</option>
                                        {availableVideosForQuiz?.map((video) => (
                                            <option key={video._id} value={video._id}>
                                                {video.title}
                                            </option>
                                        ))}
                                    </select>
                                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                                        <svg className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </div>
                                {formik.errors.videoId && formik.touched.videoId && (
                                    <div className="flex items-center space-x-2 mt-2 text-red-600 text-xs sm:text-sm">
                                        <FaTimes className="text-xs" />
                                        <span>{formik.errors.videoId}</span>
                                    </div>
                                )}
                            </div>

                            {/* Questions */}
                            <div className="mb-4 sm:mb-6">
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 mb-3 sm:mb-4">
                                    <label className="block text-xs sm:text-sm font-semibold text-gray-700">
                                        Quiz Questions
                                    </label>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            const newQuestion = {
                                                questionText: '',
                                                options: ['', '', '', ''],
                                                correctAnswer: ''
                                            };
                                            formik.setFieldValue('questions', [...formik.values.questions, newQuestion]);
                                        }}
                                        className="inline-flex items-center justify-center space-x-2 px-2 sm:px-3 py-2 bg-purple-500 text-white rounded-lg font-medium hover:bg-purple-600 transition-colors duration-200 text-xs sm:text-sm w-full sm:w-auto"
                                    >
                                        <FaPlus className="text-xs sm:text-sm" />
                                        <span>Add Question</span>
                                    </button>
                                </div>

                                <div className="space-y-4 sm:space-y-6">
                                    {formik.values.questions.map((question, questionIndex) => (
                                        <motion.div
                                            key={questionIndex}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="bg-gray-50 rounded-lg sm:rounded-xl p-3 sm:p-4 lg:p-6 border border-gray-200"
                                        >
                                            <div className="flex items-center justify-between mb-3 sm:mb-4">
                                                <h4 className="text-sm sm:text-lg font-semibold text-gray-800">
                                                    Question {questionIndex + 1}
                                                </h4>
                                                {formik.values.questions.length > 1 && (
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            const newQuestions = formik.values.questions.filter((_, index) => index !== questionIndex);
                                                            formik.setFieldValue('questions', newQuestions);
                                                        }}
                                                        className="p-1 sm:p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors duration-200"
                                                    >
                                                        <FaTrash className="text-xs sm:text-sm" />
                                                    </button>
                                                )}
                                            </div>

                                            {/* Question Text */}
                                            <div className="mb-3 sm:mb-4">
                                                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-2">
                                                    Question Text
                                                </label>
                                                <textarea
                                                    name={`questions.${questionIndex}.questionText`}
                                                    value={question.questionText}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    rows="3"
                                                    className={`w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 resize-none text-xs sm:text-sm ${formik.errors.questions?.[questionIndex]?.questionText && formik.touched.questions?.[questionIndex]?.questionText
                                                        ? 'border-red-300 bg-red-50'
                                                        : 'border-gray-300'
                                                        }`}
                                                    placeholder="Enter your question here..."
                                                />
                                                {formik.errors.questions?.[questionIndex]?.questionText && formik.touched.questions?.[questionIndex]?.questionText && (
                                                    <div className="flex items-center space-x-2 mt-2 text-red-600 text-xs sm:text-sm">
                                                        <FaTimes className="text-xs" />
                                                        <span>{formik.errors.questions[questionIndex].questionText}</span>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Options */}
                                            <div className="mb-3 sm:mb-4">
                                                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2 sm:mb-3">
                                                    Answer Options
                                                </label>
                                                <div className="space-y-2 sm:space-y-3">
                                                    {question.options.map((option, optionIndex) => (
                                                        <div key={optionIndex} className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                                                            <div className="flex items-center space-x-2 sm:space-x-3 flex-1">
                                                                <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gray-200 rounded-full flex items-center justify-center text-xs font-semibold text-gray-600 flex-shrink-0">
                                                                    {String.fromCharCode(65 + optionIndex)}
                                                                </div>
                                                                <input
                                                                    type="text"
                                                                    name={`questions.${questionIndex}.options.${optionIndex}`}
                                                                    value={option}
                                                                    onChange={formik.handleChange}
                                                                    onBlur={formik.handleBlur}
                                                                    className={`flex-1 px-3 sm:px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-xs sm:text-sm ${formik.errors.questions?.[questionIndex]?.options?.[optionIndex] && formik.touched.questions?.[questionIndex]?.options?.[optionIndex]
                                                                        ? 'border-red-300 bg-red-50'
                                                                        : 'border-gray-300'
                                                                        }`}
                                                                    placeholder={`Option ${String.fromCharCode(65 + optionIndex)}`}
                                                                />
                                                            </div>
                                                            <div className="flex items-center space-x-2">
                                                                <input
                                                                    type="radio"
                                                                    name={`questions.${questionIndex}.correctAnswer`}
                                                                    value={option}
                                                                    checked={formik.values.questions[questionIndex].correctAnswer === option}
                                                                    onChange={formik.handleChange}
                                                                    className="w-3 h-3 sm:w-4 sm:h-4 text-purple-600 border-gray-300 focus:ring-purple-500"
                                                                />
                                                                <label className="text-xs sm:text-sm text-gray-600">Correct</label>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                                {formik.errors.questions?.[questionIndex]?.options && formik.touched.questions?.[questionIndex]?.options && (
                                                    <div className="flex items-center space-x-2 mt-2 text-red-600 text-xs sm:text-sm">
                                                        <FaTimes className="text-xs" />
                                                        <span>{formik.errors.questions[questionIndex].options}</span>
                                                    </div>
                                                )}
                                                {formik.errors.questions?.[questionIndex]?.correctAnswer && formik.touched.questions?.[questionIndex]?.correctAnswer && (
                                                    <div className="flex items-center space-x-2 mt-2 text-red-600 text-xs sm:text-sm">
                                                        <FaTimes className="text-xs" />
                                                        <span>{formik.errors.questions[questionIndex].correctAnswer}</span>
                                                    </div>
                                                )}
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-4">
                                <Link
                                    to={`/admin/course-videos/${courseId}`}
                                    className="px-4 sm:px-6 py-2 sm:py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors duration-200 text-xs sm:text-sm text-center"
                                >
                                    Cancel
                                </Link>
                                <button
                                    type="submit"
                                    disabled={formik.isSubmitting || !formik.isValid}
                                    className="px-4 sm:px-6 py-2 sm:py-3 bg-purple-500 text-white rounded-lg font-medium hover:bg-purple-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 text-xs sm:text-sm"
                                >
                                    {formik.isSubmitting ? (
                                        <>
                                            <div className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                            <span>Creating Quiz...</span>
                                        </>
                                    ) : (
                                        <>
                                            <FaCheck className="text-xs sm:text-sm" />
                                            <span>Create Quiz</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
}
