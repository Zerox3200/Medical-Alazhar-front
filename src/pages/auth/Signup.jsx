import React from "react";
import Input from "./components/Input";
import CountrySelector from "./components/CountrySelector";
import FacultySelector from "./components/FacultySelector";
import YearOfGraduation from "./components/YearOfGraduation";
import Grade from "./components/Grade";
import { Link } from "react-router";

const Signup = () => {
  return (
    <div className="bg-crispWhite w-3/6 p-12">
      <h1 className="text-teal text-4xl mb-8 font-semibold">
        Create Your Account to Begin
      </h1>
      <div className="h-[1px] w-full bg-mediumGray my-8"></div>
      <form className="">
        <div className="flex justify-between items-center gap-x-2">
          <Input placeholder="Name in English" />
          <Input placeholder="National ID/Passport Number" type="Number" />
        </div>
        <div className="flex justify-between items-center gap-x-2">
          <Input placeholder="Order of graduate" type="Number" />
          <Input placeholder="Faculty ID Number" type="Number" />
        </div>
        <div className="flex justify-between items-center gap-x-2">
          {/* Nationality */}
          <CountrySelector />
          {/* Faculty of Graduation */}
          <FacultySelector />
        </div>
        <div className="flex justify-between items-center gap-x-2">
          {/* Year of graduation */}
          <YearOfGraduation />
          {/* Grade */}
          <Grade />
        </div>

        <div className="flex justify-between items-center gap-x-2">
          <Input placeholder="Email" type="email" />
          <Input placeholder="Phone Number" type="phone" />
        </div>
        <div>
          <Input placeholder="Password" type="password" />
        </div>

        <div className="w-full mt-2">
          <button
            type="submit"
            className="w-full cursor-pointer bg-deepBlue text-crispWhite p-2 rounded-md"
          >
            Signup
          </button>
          <p className="mt-2">
            Already have an email?{" "}
            <Link to="/auth/login" className="text-deepBlue">
              Login
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Signup;
