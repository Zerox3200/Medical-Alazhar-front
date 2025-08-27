import axios from "axios";

export const API_URL = "http://localhost:3000/api/v1";


export const CoursesRequests = {
    creeteCourse: async (courseData, Token) => {
        try {

            const formData = new FormData();

            formData.append("title", courseData.title);
            formData.append("description", courseData.description);
            formData.append("mentor", courseData.mentor);

            for (let i = 0; i < courseData.tags.length; i++) {
                formData.append(`tags[${i}]`, courseData.tags[i].value);
            }

            formData.append("courseImage", courseData.courseImage);

            const response = await axios.post(`${API_URL}/admin/courses/create`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${Token}`
                }
            });
            return response;
        } catch (error) {
            console.error("Error creating course:", error);
            return
        }

    },
    getAllCoursesForAdmin: async (Token) => {
        try {
            const response = await axios.get(`${API_URL}/admin/courses`, {
                headers: {
                    "Authorization": `Bearer ${Token}`
                }
            });
            return response;
        } catch (error) {
            console.error("Error getting all courses for admin:", error);
            return
        }
    },
    deleteCourse: async (courseId, Token) => {
        try {
            const response = await axios.delete(`${API_URL}/admin/courses/${courseId}`, {
                headers: {
                    "Authorization": `Bearer ${Token}`
                }
            });
            return response;
        } catch (error) {
            console.error("Error deleting course:", error);
            return
        }
    },
    publishCourse: async (courseId, Token) => {
    },
    getCourseById: async (courseId, Token) => {
        try {
            const response = await axios.get(`${API_URL}/admin/courses/${courseId}`, {
                headers: {
                    "Authorization": `Bearer ${Token}`
                }
            });
            return response;
        } catch (error) {
            console.error("Error getting course by id:", error);
            return
        }
    },
    updateCourse: async (courseId, courseData, Token) => {
        try {
            const formData = new FormData();

            formData.append("title", courseData.title);
            formData.append("description", courseData.description);
            formData.append("mentor", courseData.mentor);

            for (let i = 0; i < courseData.tags.length; i++) {
                formData.append(`tags[${i}]`, courseData.tags[i].value);
            }

            if (courseData.courseImage instanceof File) {
                formData.append("courseImage", courseData.courseImage);
            }

            const response = await axios.patch(`${API_URL}/admin/courses/${courseId}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${Token}`
                }
            });
            return response;
        } catch (error) {
            console.error("Error updating course:", error);
            return
        }
    },
    updateCourseStatus: async (courseId, published, Token) => {
        try {
            const { data } = await axios.patch(`${API_URL}/admin/courses/${courseId}/status`, {
                published
            }, {
                headers: {
                    "Authorization": `Bearer ${Token}`
                }
            });
            return data;
        }
        catch (error) {
            console.error("Error updating course status:", error);
            return
        }
    }
}

export const CourseVediosRequests = {
    getCloudinarySignature: async (Token) => {
        try {
            const { data } = await axios.get(`${API_URL}/admin/upload/signature`, {
                headers: {
                    "Authorization": `Bearer ${Token}`
                }
            });
            return data;
        } catch (error) {
            console.error("Error getting cloudinary signature:", error);
            return
        }
    },
    createVedioInsideCourse: async (CourseData, Token, setUploadProgress) => {
        const formData = new FormData();

        formData.append("courseVideos", CourseData.videoFile);
        formData.append("duration", CourseData.duration);
        formData.append("title", CourseData.title);
        formData.append("description", CourseData.description);
        formData.append("level", CourseData.level);

        try {
            const response = await axios.post(`${API_URL}/admin/courses/${CourseData.courseId}/videos/add`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${Token}`
                },
                onUploadProgress: (progressEvent) => {
                    const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    setUploadProgress(percentCompleted);
                }
            });
            return response;
        }
        catch (error) {
            console.error("Error creating vedio inside course:", error);
            return
        }
    },
    updateVedioInsideCourse: async (CourseData, Token, setUploadProgress) => {
        const formData = new FormData();

        if (CourseData.videoFile) {
            formData.append("courseVideos", CourseData.videoFile);
        }

        formData.append("duration", CourseData.duration);
        formData.append("title", CourseData.title);
        formData.append("description", CourseData.description);
        formData.append("level", CourseData.level);

        try {
            const response = await axios.patch(`${API_URL}/admin/courses/update-video/${CourseData.videoId}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${Token}`
                },
                onUploadProgress: (progressEvent) => {
                    const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    setUploadProgress(percentCompleted);
                }
            });
            return response;
        } catch (error) {
            console.error("Error updating vedio inside course:", error);
            return
        }
    },
    deleteVedioInsideCourse: async (videoId, Token) => {
        try {
            const { data } = await axios.delete(`${API_URL}/admin/courses/delete-video/${videoId}`, {
                headers: {
                    "Authorization": `Bearer ${Token}`
                }
            });
            return data;
        } catch (error) {
            console.error("Error deleting vedio inside course:", error);
            return
        }
    }
}

export const QuizesRequests = {
    createQuiz: async (quizData, Token) => {
        try {
            const { data } = await axios.post(`${API_URL}/admin/courses/quizzes/add`, quizData, {
                headers: {
                    "Authorization": `Bearer ${Token}`
                }
            });
            return data;
        }
        catch (error) {
            console.error("Error creating quiz:", error);
            return
        }
    },
    deleteQuiz: async (quizId, Token, videoId) => {
        try {
            const { data } = await axios.delete(`${API_URL}/admin/courses/videos/${videoId}/quizzes/${quizId}`, {
                headers: {
                    "Authorization": `Bearer ${Token}`
                }
            });
            return data;
        }
        catch (error) {
            console.error("Error deleting quiz:", error);
            return
        }
    },
    getQuizById: async (quizId, Token) => {
        try {
            const { data } = await axios.get(`${API_URL}/admin/courses/quizzes/${quizId}`, {
                headers: {
                    "Authorization": `Bearer ${Token}`
                }
            });
            return data;
        }
        catch (error) {
            console.error("Error getting quiz by id:", error);
            return
        }
    },
    updateQuiz: async (quizId, quizData, Token) => {
        try {
            const { data } = await axios.patch(`${API_URL}/admin/courses/quizzes/${quizId}/update`, quizData, {
                headers: {
                    "Authorization": `Bearer ${Token}`
                }
            });
            return data;
        }
        catch (error) {
            console.error("Error updating quiz:", error);
            return
        }
    },
    getAvailableVideosForQuiz: async (Token, courseId) => {
        try {
            const { data } = await axios.get(`${API_URL}/admin/courses/videos/available/${courseId}`, {
                headers: {
                    "Authorization": `Bearer ${Token}`
                }
            });
            return data;
        }
        catch (error) {
            console.error("Error getting available videos for quiz:", error);
            return
        }
    }
}