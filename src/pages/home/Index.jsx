import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  useGetUserQuery,
  useGetAllInternsQuery,
  useGetAllSupervisorsQuery,
} from "../../services/api/apiSlice";
import UnapprovedAccountBox from "./components/UnapprovedAccountBox";
import StatsBox from "./components/StatsBox";
import {
  FaBedPulse,
  FaChalkboardUser,
  FaHospital,
  FaUserDoctor,
} from "react-icons/fa6";
import Loader from "../../components/Loader";

const Index = () => {
  const [approvedInterns, setApprovedInterns] = useState([]);
  const [unapprovedInterns, setUnapprovedInterns] = useState([]);
  const [husseinInterns, setHusseinInterns] = useState([]);
  const [sayedGalalInterns, setSayedGalalInterns] = useState([]);
  const [unapprovedSupervisors, setUnapprovedSupervisors] = useState([]);

  const { id, role } = useSelector((state) => state.auth.user || {});

  const { data, error, isLoading } = useGetUserQuery(
    { userId: id, role },
    { skip: !id }
  );

  const { currentData, isSuccess } = useGetAllInternsQuery({ skip: !id });
  const supervisors = useGetAllSupervisorsQuery({ skip: !id });

  useEffect(() => {
    if (isSuccess) {
      const unapproved = currentData?.interns.filter(
        (intern) => !intern.approved
      );
      const approved = currentData?.interns.filter((intern) =>
        Boolean(intern.approved)
      );
      const husseinInterns = currentData?.interns.filter(
        (intern) => intern.hospital === "Al-Hussein" && intern.approved
      );
      const sayedGalalInterns = currentData?.interns.filter(
        (intern) => intern.hospital === "Sayed Galal" && intern.approved
      );
      setUnapprovedInterns(unapproved);
      setApprovedInterns(approved);
      setHusseinInterns(husseinInterns);
      setSayedGalalInterns(sayedGalalInterns);
    }
  }, [currentData?.interns, isSuccess]);

  useEffect(() => {
    if (supervisors.isSuccess) {
      const result = supervisors?.currentData?.supervisors.filter(
        (supervisor) => !supervisor.approved
      );
      setUnapprovedSupervisors(result);
    }
  }, [supervisors?.currentData?.supervisors, supervisors.isSuccess]);

  if (!id) return <div>Please log in.</div>;
  if (isLoading)
    return (
      <div>
        <Loader />
      </div>
    );
  if (error)
    return <div>Error: {error.data?.message || "Failed to load user"}</div>;

  const date = new Date();
  const today = date.toDateString();

  return (
    <div className="p-6">
      {/* Personalized Greeting */}
      <div className="mb-8 shadow-sm py-8 px-4 rounded-sm border-1 border-mediumGray/10 flex justify-between items-start">
        <div className="">
          <h1 className="text-2xl font-semibold">
            Welcome back,{" "}
            <span className="text-teal font-bold text-3xl">
              Dr. {data.user?.firstname + " " + data.user?.lastname}.
            </span>
          </h1>
          <p className="text-gray-600">Let's track latest updates</p>
        </div>
        <div>
          <p className="text-teal text-lg font-semibold">{today}</p>
        </div>
      </div>

      {/* Summary Statistics */}
      <div className="mb-8 grid grid-cols-4 gap-4">
        <StatsBox
          bgColor="bg-mediumBlue"
          title="Medical Interns"
          count={approvedInterns?.length}
          icon={<FaUserDoctor />}
        />
        <StatsBox
          bgColor="bg-darkRed"
          title="Total Cases Logged"
          count="984"
          icon={<FaBedPulse />}
        />
        <StatsBox
          bgColor="bg-lightBlue2"
          title="Online Courses"
          count="397"
          icon={<FaChalkboardUser />}
        />
        <StatsBox
          bgColor="bg-mediumYellow"
          title="Hospital Sessions"
          count="854"
          icon={<FaHospital />}
        />
      </div>

      {/* Addtional Actions */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        {/* Hospitals */}
        <div className="col-span-1 shadow-md p-4 rounded-sm border-1 border-mediumGray/10">
          {/* Al-Hussein */}
          <h2 className="text-2xl font-bold mb-4">
            Number of hospitals interns
          </h2>

          <div className="flex justify-between gap-3 text-center">
            <div className="">
              <h3 className="text-lg font-semibold mb-4 text-mediumGray text-center">
                Al-Hussein Hospital
              </h3>
              <p className="text-4xl text-mediumBlue font-semibold text-center">
                {husseinInterns.length} Interns
              </p>
            </div>
            <div className="w-0.5 bg-mediumGray/40 min-h-12"></div>
            {/* Sayed Galal */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-mediumGray">
                Sayed Galal Hospital
              </h3>
              <p className="text-4xl text-mediumBlue font-semibold">
                {sayedGalalInterns.length} Interns
              </p>
            </div>
          </div>
        </div>
        {/* New Accounts */}
        <div className="col-span-1 shadow-md p-4 rounded-sm border-1 border-mediumGray/10 grid-cols-1 max-h-44 overflow-y-scroll">
          <h2 className="text-2xl font-bold mb-4">Unapproved Accounts</h2>
          <div className="flex justify-between gap-3">
            <div className="w-1/2 text-center">
              <h3 className="text-lg font-semibold mb-4 text-mediumGray">
                Interns
              </h3>
              {unapprovedInterns.length > 0 ? (
                unapprovedInterns.map((unapprovedIntern, i) => {
                  return (
                    <UnapprovedAccountBox
                      key={i}
                      fullname={unapprovedIntern.fullname
                        .split(" ")
                        .slice(0, 3)
                        .join(" ")}
                      id={unapprovedIntern._id}
                      userType="interns"
                    />
                  );
                })
              ) : (
                <p>No new accounts found</p>
              )}
            </div>
            <div className="w-0.5 bg-mediumGray/40 min-h-12"></div>
            <div className="w-1/2 text-center">
              <h3 className="text-lg font-semibold mb-4 text-mediumGray">
                Supervisors
              </h3>
              {unapprovedSupervisors.length > 0 ? (
                unapprovedSupervisors.map((unapprovedSupervisor, i) => {
                  return (
                    <UnapprovedAccountBox
                      key={i}
                      fullname={
                        unapprovedSupervisor.firstname +
                        " " +
                        unapprovedSupervisor.lastname
                      }
                      id={unapprovedSupervisor._id}
                      userType="supervisors"
                    />
                  );
                })
              ) : (
                <>No new accounts found</>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      {/* <div className="mb-8 shadow-md p-4 rounded-sm border-1 border-mediumGray/10">
        <h2 className="text-xl font-bold mb-4">Your Progress</h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold">12/20</p>
            <p className="text-gray-600">Cases Logged</p>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-blue-500 h-2.5 rounded-full"
                style={{ width: "60%" }}
              ></div>
            </div>
            <div className="my-8">
              <Link
                to="/record_training/cases/add-case"
                className="bg-deepBlue px-4 py-2 rounded-sm text-crispWhite"
              >
                Add Case
              </Link>
            </div>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold">8/15</p>
            <p className="text-gray-600">Procedures Completed</p>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-green-500 h-2.5 rounded-full"
                style={{ width: "53%" }}
              ></div>
            </div>
            <div className="my-8">
              <Link
                to="/record_training/cases/add-case"
                className="bg-deepBlue px-4 py-2 rounded-sm text-crispWhite"
              >
                Add Case
              </Link>
            </div>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold">3/5</p>
            <p className="text-gray-600">Courses Completed</p>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-purple-500 h-2.5 rounded-full"
                style={{ width: "60%" }}
              ></div>
            </div>
            <div className="my-8">
              <Link
                to="/record_training/cases/add-case"
                className="bg-deepBlue px-4 py-2 rounded-sm text-crispWhite"
              >
                Add Case
              </Link>
            </div>
          </div>
        </div>
      </div> */}

      {/* Quick Links */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <button className="bg-blue-500 text-white p-4 rounded-lg">
          Record Training
        </button>
        <button className="bg-green-500 text-white p-4 rounded-lg">
          Portfolio
        </button>
        <button className="bg-purple-500 text-white p-4 rounded-lg">
          Courses
        </button>
        <button className="bg-orange-500 text-white p-4 rounded-lg">
          End Round Reflections
        </button>
      </div>

      {/* Upcoming Deadlines */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Upcoming Deadlines</h2>
        <ul className="list-disc pl-6">
          <li>📅 Pediatrics Assessment: 30th October</li>
          <li>📅 End Round Reflection Submission: 5th November</li>
        </ul>
      </div>

      {/* Featured Course */}
      <div className="bg-blue-50 p-4 rounded-lg mb-8">
        <h2 className="text-xl font-bold mb-4">Featured Course</h2>
        <p className="text-gray-600">🚀 Advanced Wound Care Techniques</p>
        <p className="text-gray-600">
          Learn the latest techniques for managing complex wounds. Enroll now!
        </p>
      </div>

      {/* Recent Activity */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
        <ul className="list-disc pl-6">
          <li>✅ Logged Case: Ulcer Examination (25th October)</li>
          <li>🎉 Completed Course: Wound Dressing Basics (24th October)</li>
        </ul>
      </div>

      {/* System Notifications */}
      <div className="bg-yellow-50 p-4 rounded-lg mb-8">
        <h2 className="text-xl font-bold mb-4">System Notifications</h2>
        <ul className="list-disc pl-6">
          <li>
            🔔 New feature: You can now upload case files directly from your
            device.
          </li>
          <li>🔔 Scheduled maintenance: 2nd November, 10 PM - 12 AM.</li>
        </ul>
      </div>

      {/* Call-to-Action */}
      <div className="text-center">
        <button className="bg-blue-500 text-white px-6 py-2 rounded-lg mr-4">
          Log a New Case
        </button>
        <button className="bg-purple-500 text-white px-6 py-2 rounded-lg">
          Explore Courses
        </button>
      </div>
    </div>
  );
};

export default Index;
