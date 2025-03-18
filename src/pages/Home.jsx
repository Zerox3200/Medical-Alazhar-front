import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router";

const Home = () => {
  const { authState } = useContext(AuthContext);
  const username = authState.user.fullname.split(" ", 2).join(" ");

  const date = new Date();
  const today = date.toDateString();

  console.log("username", username);

  return (
    <div className="p-6">
      {/* Personalized Greeting */}
      <div className="mb-8 shadow-sm py-8 px-4 rounded-sm border-1 border-mediumGray/10 flex justify-between items-start">
        <div className="">
          <h1 className="text-3xl font-semibold">
            Welcome back,{" "}
            <span className="text-teal font-bold">Dr. {username}</span>.
          </h1>
          <p className="text-gray-600">
            Ready to log your latest clinical experiences?
          </p>
        </div>
        <div>
          <p className="text-teal text-lg font-semibold">{today}</p>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="mb-8 shadow-md p-4 rounded-sm border-1 border-mediumGray/10">
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
      </div>

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

export default Home;
