import React from "react";
// import pageNotFound from "../assets/images/404.jpg";
import { Link } from "react-router";

const NotFound = () => {
  return (
    <div className="h-screen flex justify-center items-center text-center">
      <div className="">
        <h1 className="gradient-text text-9xl font-bold text-emeraldGreen">
          404
        </h1>
        <h2 className="my-6 text-3xl font-semibold text-emeraldGreen">
          OOPS - Page Not Found
        </h2>

        <p>
          <Link className="bg-teal text-crispWhite text-lg py-1 px-3 rounded-md">
            Go Homepage
          </Link>
        </p>
      </div>
      {/* <div>
        <img
          src={pageNotFound}
          alt="page not found"
          className="w-fit h-screen"
        />
      </div> */}
    </div>
  );
};

export default NotFound;
