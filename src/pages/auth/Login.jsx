import React from "react";
import Input from "./components/Input";
import { Link } from "react-router";

const Login = () => {
  return (
    <div className="bg-crispWhite w-fit p-12">
      <h1 className="text-teal text-4xl mb-8 font-semibold">
        Welcome Back! Please Log In
      </h1>
      <div className="h-[1px] w-full bg-mediumGray my-8"></div>
      <form className="">
        <div>
          <Input placeholder="Email" type="email" />
          <Input placeholder="Password" type="password" />
          <p className="mt-2 w-full">
            Forgot your password?{" "}
            <Link to="/auth/reset" className="text-deepBLue">
              Reset
            </Link>
          </p>
        </div>

        <div className="w-full mt-2">
          <button
            type="submit"
            className="w-full cursor-pointer bg-deepBlue text-crispWhite p-2 rounded-md"
          >
            Signup
          </button>
          <p className="mt-2">
            Don't have an email?{" "}
            <Link to="/auth/signup" className="text-deepBlue">
              Signup
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
