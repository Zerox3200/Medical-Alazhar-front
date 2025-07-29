import React, { useState } from "react";
import InternSignupForm from "./";
import SupervisorSignupForm from "./SupervisorSignupForm";

const Signup = () => {
  const [selectedUser, setSelectedUser] = useState("supervisor");

  return (
    <div className="flex flex-col bg-white w-full md:w-2/3 lg:w-3/6 p-4 md:p-10 shadow-md rounded-md">
      <h1 className="text-lightBlue text-2xl md:text-3xl mb-6 md:mb-4 font-semibold text-center">
        Create an account
      </h1>
      {/* Select Type of User */}
      <div className="flex gap-3 text-mistyMorning">
        <div className="flex items-center justify-between gap-3">
          <label htmlFor="user-intern">Intern</label>
          <input
            type="radio"
            name="user-type"
            id="user-intern"
            value="Intern"
            checked={selectedUser === "intern"}
            onChange={() => setSelectedUser("intern")}
          />
        </div>
        <div className="flex items-center justify-between gap-3">
          <label htmlFor="user-supervisor">Supervisor</label>
          <input
            type="radio"
            name="user-type"
            id="user-supervisor"
            value="Supervisor"
            checked={selectedUser === "supervisor"}
            onChange={() => setSelectedUser("supervisor")}
          />
        </div>
      </div>
      <div className="h-[0.5px] w-full bg-silverFrost/40 my-4"></div>

      {selectedUser === "intern" ? (
        <InternSignupForm />
      ) : (
        <SupervisorSignupForm />
      )}
    </div>
  );
};

export default Signup;
