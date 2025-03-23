import React, { useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import Input from "./components/Input";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginValidationSchema } from "../../constants/authFormData";

const Login = () => {
  // const { updateAuth } = useContext(AuthContext);

  const [visiblePassword, setVisiblePassword] = useState(false);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isLoading, isSubmitting },
  } = useForm({
    resolver: yupResolver(loginValidationSchema()),
  });

  console.log("errors", errors);

  const onSubmit = async ({ email, password }) => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/v1/intern/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ email, password }),
        }
      );

      const result = await response.json();

      if (response.ok) {
        toast.success(result.message);
        // updateAuth({
        //   accessToken: result.accessToken,
        //   user: result.data?.user,
        // });
        setTimeout(() => navigate("/"), 200);
      } else {
        if (result.message.includes("locked")) {
          toast.error(result.message);
        } else {
          toast.warn(result.message);
        }
      }
    } catch (error) {
      console.log("error", error);
      setError("general", {
        type: "manual",
        error: error,
        message: toast.error("Network error, please try again"),
      });
    }
  };

  return (
    <div className="bg-crispWhite w-fit p-12">
      <ToastContainer
        limit={1}
        position="bottom-left"
        closeOnClick={true}
        closeButton={false}
      />
      <h1 className="text-teal text-4xl mb-8 font-semibold">
        Welcome Back! Please Log In
      </h1>
      <div className="h-[1px] w-full bg-mediumGray my-8"></div>
      <form className="" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <div>
            <Input
              placeholder="Email"
              type="email"
              {...register("email")}
              error={errors.email?.message}
            />
          </div>
          <div className="relative">
            <Input
              placeholder="Password"
              type={!visiblePassword ? "password" : "text"}
              {...register("password")}
              error={errors.password?.message}
            />
            <p
              className="absolute right-2 top-3 cursor-pointer text-lg text-mediumGray/80"
              onClick={() => setVisiblePassword(!visiblePassword)}
            >
              {visiblePassword ? <FaEyeSlash /> : <FaEye />}
            </p>
          </div>
          <p className="my-4 w-full">
            Forgot your password?{" "}
            <Link to="/auth/reset" className="text-deepBlue">
              Reset
            </Link>
          </p>
        </div>

        <div className="w-full mt-2">
          <button
            type="submit"
            className={`w-full transition-colors duration-200 bg-deepBlue hover:bg-teal text-crispWhite p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-teal ${
              isLoading || isSubmitting
                ? "bg-lightBlue cursor-not-allowed"
                : "cursor-pointer"
            }`}
            disabled={isLoading || isSubmitting}
          >
            Login
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
