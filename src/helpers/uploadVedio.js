import axios from "axios";
import { CourseVediosRequests } from "../Api/apiRequests";

export const getSignature = async (token) => {
    const Signature = await CourseVediosRequests.getCloudinarySignature(token);

    if (Signature?.success) {
        const { signature, timestamp, api_key, cloud_name } = Signature?.signature;
        return { signature, timestamp, api_key, cloud_name };
    }

    return null;
};

/**
 * Upload large video to Cloudinary with signature + progress
 * @param {File} video - video file
 * @param {string} token - auth token
 * @param {Function} onProgress - callback(percent) => {}
 * @returns {Promise<string>} - uploaded video secure_url
 */
export const uploadVedioAndGetUrl = async (video, token, onProgress = null) => {
    const sigData = await getSignature(token);
    if (!sigData) throw new Error("Could not get Cloudinary signature");

    const { signature, timestamp, api_key, cloud_name } = sigData;

    // chunk size 6MB
    const CHUNK_SIZE = 6 * 1024 * 1024;
    const totalChunks = Math.ceil(video.size / CHUNK_SIZE);

    let uploadedBytes = 0;
    let cloudinaryUrl = null;

    for (let i = 0; i < totalChunks; i++) {
        const start = i * CHUNK_SIZE;
        const end = Math.min(start + CHUNK_SIZE, video.size);
        const chunk = video.slice(start, end);

        const formData = new FormData();
        formData.append("file", chunk);
        formData.append("timestamp", timestamp);
        formData.append("signature", signature);
        formData.append("api_key", api_key);
        formData.append("folder", "lectures");
        formData.append("resource_type", "video");

        const res = await axios.post(
            `https://api.cloudinary.com/v1_1/${cloud_name}/video/upload`,
            formData,
            {
                headers: { "Content-Type": "multipart/form-data" },
            }
        );

        uploadedBytes += chunk.size;
        let percentCompleted = Math.round((uploadedBytes / video.size) * 100);

        if (typeof onProgress === "function") {
            onProgress(percentCompleted);
        }

        if (res.data.secure_url) {
            cloudinaryUrl = res.data.secure_url;
        }
    }

    return cloudinaryUrl;
};
