import React, { useState } from "react";
import InternSignupForm from "./InternSignupForm";
import SupervisorSignupForm from "./SupervisorSignupForm";

const Signup = () => {
  const [selectedUser, setSelectedUser] = useState("intern");

  return (
    <div className="flex flex-col bg-crispWhite w-full md:w-2/3 lg:w-4/6 p-4 md:p-10">
      <h1 className="text-teal text-2xl md:text-3xl mb-6 md:mb-8 font-semibold">
        Create Your Account to Begin
      </h1>
      {/* Select Type of User */}
      <div className="flex gap-3">
        <h2 className="w-fit text-xl text-mediumGray font-semibold">
          Select your role:
        </h2>
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
      <div className="h-[1px] w-full bg-mediumGray my-8"></div>

      {selectedUser === "intern" ? (
        <InternSignupForm />
      ) : (
        <SupervisorSignupForm />
      )}
    </div>
  );
};

export default Signup;
