import React from "react";
import Input from "./components/Input";
import { Link } from "react-router";

const ResetPassword = () => {
  return (
    <div className="bg-crispWhite w-fit p-12">
      <h1 className="text-teal text-4xl mb-8 font-semibold">
        Reset Your Password
      </h1>
      <div className="h-[1px] w-full bg-mediumGray my-8"></div>
      <form className="">
        <div>
          <div>
            <Input placeholder="Email" type="email" />
          </div>

          <p className="my-4 w-full">
            Remember your password?{" "}
            <Link to="/auth/login" className="text-deepBlue">
              Login
            </Link>
          </p>
        </div>

        <div className="w-full mt-2">
          <button
            type="submit"
            className={`w-full transition-colors duration-200 bg-deepBlue hover:bg-teal text-crispWhite p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-teal `}
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default ResetPassword;
