import React, { useEffect, useState } from "react";
import courseBanner from "../../../assets/images/banner.jpg";
import PrimaryButton from "../../../components/PrimaryButton";
import { FaCertificate, FaPlayCircle } from "react-icons/fa";
import { FaMobileScreenButton } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";

const OverviewSidebar = () => {
  const state = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const { courseId } = useParams();

  const [submitEnrollment, setSubmitEnrollment] = useState(false);

  const handleEnrollment = () => setSubmitEnrollment(true);

  useEffect(() => {
    if (!state.token && submitEnrollment) {
      navigate("/auth/login");
    }
  }, [courseId, navigate, state.token, submitEnrollment]);

  useEffect(() => {
    if (state.token && submitEnrollment) {
      navigate(`/courses/${courseId}`);
    }
  }, [courseId, navigate, state.token, submitEnrollment]);

  return (
    <div>
      {/* Free Video */}
      <div>
        <img
          src={courseBanner}
          alt="free-video"
          className="w-full h-52 rounded-md object-fill"
        />
      </div>

      <div className="mt-4 flex justify-between items-center">
        <p>
          $<span className="text-3xl text-primary/80 mr-4">245.00</span>
          <span className="text-xl line-through text-mistyMorning">
            $300.00
          </span>
        </p>
        <p className="text-lightRed text-xl">85% off</p>
      </div>

      {/* Enroll button */}
      <div className="mt-6">
        <PrimaryButton
          label="Enroll Now"
          type="submit"
          handleClick={handleEnrollment}
        />
      </div>

      {/* Separator */}
      <div className="h-0.5 my-6 bg-mistyMorning/20"></div>

      {/* Course features */}
      <div>
        <h3 className="text-primary text-xl">This course includes</h3>
        <ul className="mt-3">
          <li className="flex items-center text-mistyMorning mb-2">
            <FaPlayCircle />
            <span className="ml-3">65 hours videos</span>
          </li>
          <li className="flex items-center text-mistyMorning mb-2">
            <FaMobileScreenButton />
            <span className="ml-3">Direct contact with the mentor</span>
          </li>
          <li className="flex items-center text-mistyMorning mb-2">
            <FaCertificate />
            <span className="ml-3">Certificate of completion</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default OverviewSidebar;
