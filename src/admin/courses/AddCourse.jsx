import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Select from "react-select";
import { motion } from "framer-motion";
import { FaPlus, FaUpload, FaTimes, FaCheck, FaEye } from "react-icons/fa";
import { IoMdImages } from "react-icons/io";
import { BsFileEarmarkText } from "react-icons/bs";
import { HiOutlineAcademicCap } from "react-icons/hi";
import { Link, useNavigate } from "react-router";
import { CoursesRequests, QuizesRequests } from "../../Api/apiRequests";
import { useCookies } from "react-cookie";
import { toast } from "react-hot-toast";

// Validation Schema
const CourseValidationSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title must not exceed 100 characters")
    .required("Course title is required"),
  description: Yup.string()
    .min(20, "Description must be at least 20 characters")
    .max(500, "Description must not exceed 500 characters")
    .required("Course description is required"),
  mentor: Yup.string()
    .min(2, "Mentor name must be at least 2 characters")
    .max(100, "Mentor name must not exceed 100 characters")
    .required("Mentor name is required"),
  tags: Yup.array()
    .min(1, "Please select at least one tag")
    .max(5, "You can select up to 5 tags")
    .required("Please select at least one tag"),
  courseImage: Yup.mixed()
    .required("Course courseImage is required")
    .test("fileSize", "File size must be less than 2MB", (value) => {
      if (!value) return true;
      return value.size <= 2 * 1024 * 1024;
    })
    .test("fileType", "Only image files are allowed", (value) => {
      if (!value) return true;
      return ["image/jpeg", "image/png", "image/webp"].includes(value.type);
    }),
});

// Initial Values
const initialValues = {
  title: "",
  description: "",
  mentor: "",
  tags: [],
  courseImage: null,
};

// Mock Data - Mentor suggestions (optional)
const mentorSuggestions = [
  "Dr. Abdallah Elmallah",
  "Dr. Ahmed Nouh",
  "Dr. Sarah Ahmed",
  "Dr. Mohamed Ali",
  "Dr. Fatima Hassan",
];

const tagOptions = [
  { value: "anesthesiology", label: "Anesthesiology", color: "#f87171" },
  { value: "cardiology", label: "Cardiology", color: "#ef4444" },
  { value: "dermatology", label: "Dermatology", color: "#f97316" },
  { value: "emergency", label: "Emergency Medicine", color: "#eab308" },
  { value: "endocrinology", label: "Endocrinology", color: "#22c55e" },
  { value: "family-medicine", label: "Family Medicine", color: "#06b6d4" },
  { value: "gastroenterology", label: "Gastroenterology", color: "#3b82f6" },
  { value: "geriatrics", label: "Geriatrics", color: "#6366f1" },
  { value: "hematology", label: "Hematology", color: "#8b5cf6" },
  { value: "infectious-disease", label: "Infectious Disease", color: "#a855f7" },
  { value: "internal-medicine", label: "Internal Medicine", color: "#ec4899" },
  { value: "nephrology", label: "Nephrology", color: "#14b8a6" },
  { value: "neurology", label: "Neurology", color: "#06b6d4" },
  { value: "neurosurgery", label: "Neurosurgery", color: "#0ea5e9" },
  { value: "obstetrics-gynecology", label: "Obstetrics & Gynecology", color: "#f43f5e" },
  { value: "oncology", label: "Oncology", color: "#be123c" },
  { value: "ophthalmology", label: "Ophthalmology", color: "#65a30d" },
  { value: "orthopedics", label: "Orthopedics", color: "#16a34a" },
  { value: "otolaryngology", label: "Otolaryngology (ENT)", color: "#22d3ee" },
  { value: "pathology", label: "Pathology", color: "#0d9488" },
  { value: "pediatrics", label: "Pediatrics", color: "#84cc16" },
  { value: "plastic-surgery", label: "Plastic Surgery", color: "#f59e0b" },
  { value: "psychiatry", label: "Psychiatry", color: "#d946ef" },
  { value: "public-health", label: "Public Health", color: "#9333ea" },
  { value: "pulmonology", label: "Pulmonology", color: "#0891b2" },
  { value: "radiology", label: "Radiology", color: "#4f46e5" },
  { value: "rheumatology", label: "Rheumatology", color: "#10b981" },
  { value: "surgery", label: "General Surgery", color: "#ef4444" },
  { value: "thoracic-surgery", label: "Thoracic Surgery", color: "#ea580c" },
  { value: "urology", label: "Urology", color: "#2563eb" },
  { value: "vascular-surgery", label: "Vascular Surgery", color: "#15803d" },
];


const AddCourse = () => {
  const [previewImage, setPreviewImage] = useState(null);
  const [Token] = useCookies(['Al-Azhar']);

  const navigate = useNavigate();

  const HandleCreateCourse = async (values) => {
    try {
      const { data } = await CoursesRequests.creeteCourse(values, Token["Al-Azhar"]);

      console.log(data);

      if (data?.success) {
        toast.success("Course added successfully!");
        formik.resetForm();
        setPreviewImage(null);
        navigate("/admin/all-courses");
      } else {
        toast.error("Error adding course. Please try again.");
      }
    } catch (error) {
      console.error("Error creating course:", error);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema: CourseValidationSchema,
    onSubmit: HandleCreateCourse
  });

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      formik.setFieldValue("courseImage", file);

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => setPreviewImage(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    formik.setFieldValue("courseImage", null);
    setPreviewImage(null);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };



  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6">
      <motion.div
        className="max-w-4xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.div className="mb-8" variants={itemVariants}>
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <FaPlus className="text-white text-xl" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-800">Add New Course</h1>
                  <p className="text-gray-600">Create a comprehensive course for medical education</p>
                </div>
              </div>
              <Link
                to="/admin/all-courses"
                className="inline-flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-all duration-200"
              >
                <FaEye className="text-sm" />
                <span>View All Courses</span>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="flex items-center space-x-2">
                  <BsFileEarmarkText className="text-blue-600" />
                  <span className="text-sm font-medium text-blue-800">Course Details</span>
                </div>
                <p className="text-xs text-blue-600 mt-1">Basic information</p>
              </div>
              <div className="bg-purple-50 rounded-lg p-4">
                <div className="flex items-center space-x-2">
                  <HiOutlineAcademicCap className="text-purple-600" />
                  <span className="text-sm font-medium text-purple-800">Mentor Assignment</span>
                </div>
                <p className="text-xs text-purple-600 mt-1">Select instructor</p>
              </div>
              <div className="bg-green-50 rounded-lg p-4">
                <div className="flex items-center space-x-2">
                  <IoMdImages className="text-green-600" />
                  <span className="text-sm font-medium text-green-800">Media Upload</span>
                </div>
                <p className="text-xs text-green-600 mt-1">Course courseImage</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Form */}
        <motion.div variants={itemVariants}>
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <form onSubmit={formik.handleSubmit} className="p-8">
              <div className="space-y-8">
                {/* Course Title */}
                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Course Title *
                  </label>
                  <div className="relative">
                    <input
                      name="title"
                      type="text"
                      placeholder="Enter course title..."
                      value={formik.values.title}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${formik.errors.title && formik.touched.title
                        ? 'border-red-300 bg-red-50'
                        : 'border-gray-300 bg-gray-50'
                        }`}
                    />
                    {formik.values.title && !formik.errors.title && (
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <FaCheck className="text-green-500" />
                      </div>
                    )}
                  </div>
                  {formik.errors.title && formik.touched.title && (
                    <div className="text-red-500 text-sm mt-2">{formik.errors.title}</div>
                  )}
                </motion.div>

                {/* Course Description */}
                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Course Description *
                  </label>
                  <div className="relative">
                    <textarea
                      name="description"
                      rows="4"
                      placeholder="Describe the course content, objectives, and what students will learn..."
                      value={formik.values.description}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none ${formik.errors.description && formik.touched.description
                        ? 'border-red-300 bg-red-50'
                        : 'border-gray-300 bg-gray-50'
                        }`}
                    />
                    <div className="absolute bottom-3 right-3">
                      <span className={`text-xs ${formik.values.description.length > 500 ? 'text-red-500' : 'text-gray-400'
                        }`}>
                        {formik.values.description.length}/500
                      </span>
                    </div>
                  </div>
                  {formik.errors.description && formik.touched.description && (
                    <div className="text-red-500 text-sm mt-2">{formik.errors.description}</div>
                  )}
                </motion.div>

                <motion.div variants={itemVariants} className="grid grid-cols-1 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Course Mentor *
                    </label>
                    <div className="relative">
                      <input
                        name="mentor"
                        type="text"
                        placeholder="Enter mentor name..."
                        value={formik.values.mentor}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${formik.errors.mentor && formik.touched.mentor
                          ? 'border-red-300 bg-red-50'
                          : 'border-gray-300 bg-gray-50'
                          }`}
                      />
                      {formik.values.mentor && !formik.errors.mentor && (
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                          <FaCheck className="text-green-500" />
                        </div>
                      )}
                    </div>
                    {formik.errors.mentor && formik.touched.mentor && (
                      <div className="text-red-500 text-sm mt-2">{formik.errors.mentor}</div>
                    )}

                    {/* Mentor Suggestions */}
                    {formik.values.mentor && formik.values.mentor.length > 0 && (
                      <div className="mt-2">
                        <p className="text-xs text-gray-500 mb-2">Suggestions:</p>
                        <div className="flex flex-wrap gap-2">
                          {mentorSuggestions
                            .filter(suggestion =>
                              suggestion.toLowerCase().includes(formik.values.mentor.toLowerCase())
                            )
                            .slice(0, 3)
                            .map((suggestion, index) => (
                              <button
                                key={index}
                                type="button"
                                onClick={() => formik.setFieldValue("mentor", suggestion)}
                                className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition-colors duration-200"
                              >
                                {suggestion}
                              </button>
                            ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Tags Selection */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Course Tags *
                    </label>
                    <Select
                      value={formik.values.tags}
                      onChange={(options) => formik.setFieldValue("tags", options)}
                      options={tagOptions}
                      placeholder="Select tags..."
                      isMulti
                      className={`${formik.errors.tags && formik.touched.tags ? 'border-red-300' : ''}`}
                      classNamePrefix="select"
                      formatOptionLabel={(option) => (
                        <div className="flex items-center space-x-2">
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: option.color }}
                          ></div>
                          <span>{option.label}</span>
                        </div>
                      )}
                    />
                    {formik.errors.tags && formik.touched.tags && (
                      <div className="text-red-500 text-sm mt-2">{formik.errors.tags}</div>
                    )}
                  </div>
                </motion.div>

                {/* courseImage Upload */}
                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Course courseImage *
                  </label>

                  {!previewImage ? (
                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-400 transition-colors duration-200">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                        id="courseImage-upload"
                      />
                      <label htmlFor="courseImage-upload" className="cursor-pointer">
                        <div className="space-y-4">
                          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                            <FaUpload className="text-blue-600 text-2xl" />
                          </div>
                          <div>
                            <p className="text-lg font-medium text-gray-700">
                              Upload Course courseImage
                            </p>
                            <p className="text-sm text-gray-500 mt-1">
                              PNG, JPG, or WebP up to 2MB
                            </p>
                          </div>
                        </div>
                      </label>
                    </div>
                  ) : (
                    <div className="relative">
                      <img
                        src={previewImage}
                        alt="Course courseImage preview"
                        className="w-full h-48 object-cover rounded-xl border border-gray-200"
                      />
                      <button
                        type="button"
                        onClick={removeImage}
                        className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors duration-200"
                      >
                        <FaTimes className="text-sm" />
                      </button>
                    </div>
                  )}

                  {formik.errors.courseImage && formik.touched.courseImage && (
                    <div className="text-red-500 text-sm mt-2">{formik.errors.courseImage}</div>
                  )}
                </motion.div>

                {/* Submit Button */}
                <motion.div variants={itemVariants} className="pt-6">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500">
                      All fields marked with * are required
                    </div>
                    <motion.button
                      type="submit"
                      disabled={formik.isSubmitting}
                      className={`px-8 py-3 rounded-xl font-semibold text-white transition-all duration-200 ${formik.isSubmitting
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg hover:shadow-xl'
                        }`}
                      whileHover={!formik.isSubmitting ? { scale: 1.02 } : {}}
                      whileTap={!formik.isSubmitting ? { scale: 0.98 } : {}}
                    >
                      {formik.isSubmitting ? (
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Creating Course...</span>
                        </div>
                      ) : (
                        <div className="flex cursor-pointer items-center space-x-2">
                          <FaPlus className="text-sm" />
                          <span>Create Course</span>
                        </div>
                      )}
                    </motion.button>
                  </div>
                </motion.div>
              </div>
            </form>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};




export default AddCourse;
