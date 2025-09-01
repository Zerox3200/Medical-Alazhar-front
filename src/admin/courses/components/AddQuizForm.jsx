import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FaTimes, FaBook, FaSave, FaPlus, FaTrash } from 'react-icons/fa';

const AddQuizForm = ({ isOpen, onClose, onSubmit, chapter, courseId }) => {
    const formik = useFormik({
        initialValues: {
            title: '',
            description: '',
            chapterId: chapter?._id || '',
            courseId: courseId,
            questions: [
                {
                    question: '',
                    options: ['', '', '', ''],
                    correctAnswer: 0
                }
            ]
        },
        validationSchema: Yup.object({
            title: Yup.string()
                .required('Title is required')
                .min(3, 'Title must be at least 3 characters')
                .max(100, 'Title must be less than 100 characters'),
            description: Yup.string()
                .required('Description is required')
                .min(10, 'Description must be at least 10 characters')
                .max(500, 'Description must be less than 500 characters'),
            questions: Yup.array().of(
                Yup.object({
                    question: Yup.string().required('Question is required'),
                    options: Yup.array().of(Yup.string().required('Option is required')).min(2, 'At least 2 options required'),
                    correctAnswer: Yup.number().required('Correct answer is required')
                })
            ).min(1, 'At least one question is required')
        }),
        onSubmit: (values) => {
            onSubmit(values);
            formik.resetForm();
        }
    });

    const handleClose = () => {
        formik.resetForm();
        onClose();
    };

    const addQuestion = () => {
        const newQuestions = [...formik.values.questions, {
            question: '',
            options: ['', '', '', ''],
            correctAnswer: 0
        }];
        formik.setFieldValue('questions', newQuestions);
    };

    const removeQuestion = (index) => {
        if (formik.values.questions.length > 1) {
            const newQuestions = formik.values.questions.filter((_, i) => i !== index);
            formik.setFieldValue('questions', newQuestions);
        }
    };

    const updateQuestion = (index, field, value) => {
        const newQuestions = [...formik.values.questions];
        newQuestions[index] = { ...newQuestions[index], [field]: value };
        formik.setFieldValue('questions', newQuestions);
    };

    const updateOption = (questionIndex, optionIndex, value) => {
        const newQuestions = [...formik.values.questions];
        newQuestions[questionIndex].options[optionIndex] = value;
        formik.setFieldValue('questions', newQuestions);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleClose}
                        className="fixed inset-0 bg-black bg-opacity-50 z-40"
                    />

                    {/* Side Panel */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 overflow-y-auto"
                    >
                        {/* Header */}
                        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                                        <FaBook className="text-orange-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-800">Add Quiz</h3>
                                        <p className="text-sm text-gray-600">
                                            {chapter ? `Add to: ${chapter.title}` : 'Select a chapter first'}
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={handleClose}
                                    className="p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                                >
                                    <FaTimes className="text-lg" />
                                </button>
                            </div>
                        </div>

                        {/* Form Content */}
                        <div className="p-6 space-y-6">
                            <form onSubmit={formik.handleSubmit} className="space-y-6">
                                {/* Title */}
                                <div>
                                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                                        Quiz Title *
                                    </label>
                                    <input
                                        id="title"
                                        name="title"
                                        type="text"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.title}
                                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors duration-200 ${formik.touched.title && formik.errors.title
                                            ? 'border-red-300 bg-red-50'
                                            : 'border-gray-300 hover:border-gray-400'
                                            }`}
                                        placeholder="Enter quiz title"
                                    />
                                    {formik.touched.title && formik.errors.title && (
                                        <p className="mt-1 text-sm text-red-600">{formik.errors.title}</p>
                                    )}
                                </div>

                                {/* Description */}
                                <div>
                                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                                        Description *
                                    </label>
                                    <textarea
                                        id="description"
                                        name="description"
                                        rows={3}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.description}
                                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors duration-200 resize-none ${formik.touched.description && formik.errors.description
                                            ? 'border-red-300 bg-red-50'
                                            : 'border-gray-300 hover:border-gray-400'
                                            }`}
                                        placeholder="Describe what this quiz covers..."
                                    />
                                    {formik.touched.description && formik.errors.description && (
                                        <p className="mt-1 text-sm text-red-600">{formik.errors.description}</p>
                                    )}
                                </div>

                                {/* Questions */}
                                <div>
                                    <div className="flex items-center justify-between mb-4">
                                        <label className="block text-sm font-medium text-gray-700">
                                            Questions *
                                        </label>
                                        <button
                                            type="button"
                                            onClick={addQuestion}
                                            className="inline-flex items-center space-x-1 px-3 py-1 bg-orange-100 text-orange-600 rounded text-sm hover:bg-orange-200 transition-colors duration-200"
                                        >
                                            <FaPlus className="text-xs" />
                                            <span>Add Question</span>
                                        </button>
                                    </div>

                                    <div className="space-y-4">
                                        {formik.values.questions.map((question, questionIndex) => (
                                            <div key={questionIndex} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                                                <div className="flex items-center justify-between mb-3">
                                                    <h4 className="text-sm font-medium text-gray-700">
                                                        Question {questionIndex + 1}
                                                    </h4>
                                                    {formik.values.questions.length > 1 && (
                                                        <button
                                                            type="button"
                                                            onClick={() => removeQuestion(questionIndex)}
                                                            className="p-1 text-red-400 hover:text-red-600 transition-colors duration-200"
                                                        >
                                                            <FaTrash className="text-xs" />
                                                        </button>
                                                    )}
                                                </div>

                                                {/* Question Text */}
                                                <div className="mb-3">
                                                    <input
                                                        type="text"
                                                        value={question.question}
                                                        onChange={(e) => updateQuestion(questionIndex, 'question', e.target.value)}
                                                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                                        placeholder="Enter your question..."
                                                    />
                                                </div>

                                                {/* Options */}
                                                <div className="space-y-2">
                                                    <label className="block text-xs font-medium text-gray-600">Options:</label>
                                                    {question.options.map((option, optionIndex) => (
                                                        <div key={optionIndex} className="flex items-center space-x-2">
                                                            <input
                                                                type="radio"
                                                                name={`correctAnswer-${questionIndex}`}
                                                                checked={question.correctAnswer === optionIndex}
                                                                onChange={() => updateQuestion(questionIndex, 'correctAnswer', optionIndex)}
                                                                className="text-orange-600 border-gray-300 focus:ring-orange-500"
                                                            />
                                                            <input
                                                                type="text"
                                                                value={option}
                                                                onChange={(e) => updateOption(questionIndex, optionIndex, e.target.value)}
                                                                className="flex-1 px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                                                placeholder={`Option ${optionIndex + 1}`}
                                                            />
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <div className="pt-4 border-t border-gray-200">
                                    <button
                                        type="submit"
                                        disabled={formik.isSubmitting || !formik.isValid || !chapter}
                                        className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                                    >
                                        <FaSave className="text-sm" />
                                        <span>{formik.isSubmitting ? 'Adding Quiz...' : 'Add Quiz'}</span>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default AddQuizForm;
