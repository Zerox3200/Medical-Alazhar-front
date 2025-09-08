import React, { useState } from "react";
import { CoursesRequests } from "../../../Api/apiRequests";
import { useQuery } from "react-query";
import Loader from "../../../components/Loader";
import { motion } from "framer-motion";
import {
  FaBook,
  FaUser,
  FaTag,
  FaPlay,
  FaFileAlt,
  FaCheckCircle,
  FaTimesCircle,
  FaSearch,
  FaFilter,
  FaChevronLeft,
  FaChevronRight,
  FaCrown,
  FaGift,
  FaUnlock,
  FaList,
  FaEye,
  FaEdit
} from "react-icons/fa";
import { truncateDescription } from "../../../helpers/descriptionCutter";
import { useNavigate } from "react-router";
import { toast } from "react-hot-toast";

const AllCourses = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all"); // all, published, unpublished
  const [selectedTags, setSelectedTags] = useState([]); // array of selected tags
  const [currentPage, setCurrentPage] = useState(1);
  const [showTagFilter, setShowTagFilter] = useState(false); // toggle tag filter visibility

  // Medical specialty tags with colors
  const medicalTags = [
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

  const getAllCoursesForUser = async () => {
    const response = await CoursesRequests.getAllCoursesForUser();
    console.log(response?.data);
    return response?.data;
  }

  const { data: coursesData, isLoading, refetch } = useQuery("get All Courses For User", getAllCoursesForUser, {
    cacheTime: 3000
  });

  const filteredCourses = coursesData?.courses?.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.mentor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesStatusFilter = filterStatus === "all" ||
      (filterStatus === "published" && course.published) ||
      (filterStatus === "unpublished" && !course.published);

    const matchesTagFilter = selectedTags.length === 0 ||
      selectedTags.some(selectedTag =>
        course.tags.some(courseTag => courseTag.toLowerCase() === selectedTag.toLowerCase())
      );

    return matchesSearch && matchesStatusFilter && matchesTagFilter;
  }) || [];

  const availableTags = [...new Set(
    filteredCourses.flatMap(course => course.tags)
  )].sort();

  const toggleTag = (tag) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const clearAllTags = () => {
    setSelectedTags([]);
  };

  const selectAllTags = () => {
    setSelectedTags(availableTags);
  };

  const navigate = useNavigate();

  const HandleCourseDetails = (courseId, published) => {
    if (published) {
      navigate(`/courses/${courseId}`);
    } else {
      toast.error("Course is not published yet");
    }
  }

  if (isLoading) return <Loader />;

  const CourseCard = ({ course }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="group h-[630px] bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 
      overflow-hidden border border-gray-100 hover:border-blue-200 relative"
    >
      {course.paid && (
        <div className="absolute top-4 left-4 z-10">
          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
            <FaCrown className="text-xs" />
            PREMIUM
          </div>
        </div>
      )}

      {!course.paid && (
        <div className="absolute top-4 left-4 z-10">
          <div className="bg-gradient-to-r from-green-400 to-emerald-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
            <FaGift className="text-xs" />
            FREE
          </div>
        </div>
      )}

      <div className="relative h-52 overflow-hidden">
        <img
          src={course.courseBanner}
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

        <div className="absolute top-4 right-4">
          {course.published ? (
            <span className="bg-green-500/90 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full flex items-center gap-1 font-medium">
              <FaCheckCircle className="text-xs" />
              Live
            </span>
          ) : (
            <span className="bg-orange-500/90 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full flex items-center gap-1 font-medium">
              <FaTimesCircle className="text-xs" />
              Draft
            </span>
          )}
        </div>

        <div className="absolute bottom-4 right-4">
          {course.paid ? (
            <div className="bg-white/95 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full text-sm font-bold shadow-lg">
              ${course.price}
            </div>
          ) : (
            <div className="bg-green-500/95 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg flex items-center gap-1">
              <FaUnlock className="text-xs" />
              Free
            </div>
          )}
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200">
          {course.title}
        </h3>

        <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
          {truncateDescription(course.description, 120)}
        </p>

        <div className="flex items-center gap-3 mb-4 p-3 bg-gray-50 rounded-xl">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
            <FaUser className="text-blue-600 text-sm" />
          </div>
          <div>
            <p className="text-xs text-gray-500 font-medium">Instructor</p>
            <p className="text-sm font-semibold text-gray-800">{course.mentor}</p>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {course.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="bg-blue-50 text-blue-700 text-xs px-3 py-1 rounded-full font-medium border border-blue-200"
              >
                {tag}
              </span>
            ))}
            {course.tags.length > 3 && (
              <span className="text-gray-400 text-xs px-2 py-1">+{course.tags.length - 3} more</span>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <FaPlay className="text-blue-600 text-sm" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Videos</p>
              <p className="text-sm font-bold text-gray-800">{course.videos.length}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <FaFileAlt className="text-green-600 text-sm" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Sections</p>
              <p className="text-sm font-bold text-gray-800">{course.sections.length}</p>
            </div>
          </div>
        </div>

        <button className={`w-full py-3 px-4 rounded-xl font-semibold text-white transition-all duration-200 flex items-center
          justify-center gap-2 ${course.paid ? 'bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 shadow-lg hover:shadow-xl'
            : 'bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 shadow-lg hover:shadow-xl'
          }`} onClick={() => HandleCourseDetails(course._id, course.published)} >
          {course.paid ? (
            <>
              <FaCrown />
              Enroll Now
            </>
          ) : (
            <>
              <FaUnlock />
              Start Learning
            </>
          )}
        </button>
      </div>
    </motion.div>
  );

  return <div className="pb-5 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">

    <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white py-16">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Professional Medical Courses
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Master advanced medical techniques with our comprehensive course library designed by industry experts
          </p>
        </motion.div>
      </div>
    </div>

    <div className="mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="bg-white max-w-7xl mx-auto rounded-2xl shadow-xl p-8 mb-6 border border-gray-100"
      >
        <div className="relative">
          <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
          <input
            type="text"
            placeholder="Search courses, instructors, or topics..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 text-lg"
          />
        </div>
      </motion.div>

      {/* Professional Filter Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="bg-white  rounded-2xl shadow-xl p-6 mb-8 border border-gray-100"
      >
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Status Filter */}
          <div className="flex-1">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Course Status
            </label>
            <div className="flex gap-3">
              {[
                { value: "all", label: "All Courses", icon: FaList, color: "bg-gray-100 text-gray-700" },
                { value: "published", label: "Published", icon: FaEye, color: "bg-green-100 text-green-700" },
                { value: "unpublished", label: "Draft", icon: FaEdit, color: "bg-orange-100 text-orange-700" }
              ].map(option => {
                const IconComponent = option.icon;
                return (
                  <button
                    key={option.value}
                    onClick={() => setFilterStatus(option.value)}
                    className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-all duration-200 border-2 ${filterStatus === option.value
                      ? `${option.color} border-current shadow-md`
                      : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                      }`}
                  >
                    <IconComponent className="text-lg" />
                    {option.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tag Filter Toggle */}
          <div className="flex flex-col">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Medical Specialties
            </label>
            <button
              onClick={() => setShowTagFilter(!showTagFilter)}
              className="flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
            >
              <FaTag className="text-sm" />
              {selectedTags.length > 0 ? `${selectedTags.length} Selected` : 'Filter by Tags'}
            </button>
          </div>
        </div>

        {/* Selected Tags Display */}
        {selectedTags.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ duration: 0.3 }}
            className="mt-6 pt-6 border-t border-gray-200"
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="text-sm font-semibold text-gray-700">Selected Specialties:</span>
              <button
                onClick={clearAllTags}
                className="text-xs text-red-600 hover:text-red-700 font-medium"
              >
                Clear All
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {selectedTags.map(tag => {
                const tagInfo = medicalTags.find(t => t.value === tag);
                return (
                  <span
                    key={tag}
                    className="flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium text-white shadow-md"
                    style={{ backgroundColor: tagInfo?.color || '#6b7280' }}
                  >
                    {tagInfo?.label || tag}
                    <button
                      onClick={() => toggleTag(tag)}
                      className="hover:bg-white/20 rounded-full p-0.5 transition-colors duration-200"
                    >
                      ×
                    </button>
                  </span>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Tag Filter Grid */}
        {showTagFilter && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="mt-6 pt-6 border-t border-gray-200"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Select Medical Specialties</h3>
              <div className="flex gap-2">
                <button
                  onClick={selectAllTags}
                  className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors duration-200"
                >
                  Select All
                </button>
                <button
                  onClick={clearAllTags}
                  className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200"
                >
                  Clear All
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
              {medicalTags.map(tag => (
                <button
                  key={tag.value}
                  onClick={() => toggleTag(tag.value)}
                  className={`p-3 rounded-xl text-sm font-medium transition-all duration-200 border-2 ${selectedTags.includes(tag.value)
                    ? 'text-white shadow-lg transform scale-105'
                    : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  style={{
                    backgroundColor: selectedTags.includes(tag.value) ? tag.color : undefined,
                    borderColor: selectedTags.includes(tag.value) ? tag.color : undefined
                  }}
                >
                  {tag.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-bold text-gray-900">
              Available Courses
            </h2>
            <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
              {filteredCourses.length} of {coursesData?.courses?.length || 0}
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-600">
                  {filteredCourses.filter(c => !c.paid).length} Free
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span className="text-sm text-gray-600">
                  {filteredCourses.filter(c => c.paid).length} Premium
                </span>
              </div>
            </div>

            {/* Available Tags in Results */}
            {availableTags.length > 0 && (
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Includes:</span>
                <div className="flex flex-wrap gap-1">
                  {availableTags.slice(0, 5).map(tag => (
                    <span
                      key={tag}
                      className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-xs"
                    >
                      {tag.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                    </span>
                  ))}
                  {availableTags.length > 5 && (
                    <span className="text-xs text-gray-500">
                      +{availableTags.length - 5} more
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {filteredCourses.length > 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-8 mb-12"
        >
          {filteredCourses.map((course, index) => (
            <motion.div
              key={course._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <CourseCard course={course} />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center py-16"
        >
          <div className="bg-white rounded-2xl shadow-lg p-12 max-w-md mx-auto">
            <FaBook className="mx-auto text-gray-300 text-6xl mb-6" />
            <h3 className="text-2xl font-bold text-gray-700 mb-3">No courses found</h3>
            <p className="text-gray-500 mb-6">
              {searchTerm || filterStatus !== "all" || selectedTags.length > 0
                ? "Try adjusting your search or filter criteria"
                : "No courses are available at the moment"}
            </p>
            {(searchTerm || filterStatus !== "all" || selectedTags.length > 0) && (
              <button
                onClick={() => {
                  setSearchTerm("");
                  setFilterStatus("all");
                  setSelectedTags([]);
                }}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors duration-200"
              >
                Clear All Filters
              </button>
            )}
          </div>
        </motion.div>
      )}

      {coursesData?.pagination && coursesData.pagination.totalPages > 1 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="flex items-center justify-center gap-3 mb-8"
        >
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={!coursesData.pagination.hasPrevPage}
            className="flex items-center gap-2 px-6 py-3 border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium"
          >
            <FaChevronLeft />
            Previous
          </button>

          <div className="flex items-center gap-2">
            {Array.from({ length: coursesData.pagination.totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-4 py-3 rounded-xl font-semibold transition-all duration-200 ${page === currentPage
                  ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg'
                  : 'border-2 border-gray-200 hover:border-blue-500 hover:bg-blue-50'
                  }`}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, coursesData.pagination.totalPages))}
            disabled={!coursesData.pagination.hasNextPage}
            className="flex items-center gap-2 px-6 py-3 border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium"
          >
            Next
            <FaChevronRight />
          </button>
        </motion.div>
      )}
    </div>
  </div>
};

export default AllCourses;
