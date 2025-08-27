import React, { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import Input from "./components/Input";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginValidationSchema } from "../constants/authFormData";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "../services/common/authApiSlice";
import { setAuth } from "../services/slices/authSlice";
import { LuEyeClosed, LuEye } from "react-icons/lu";
import SubmitButton from "./components/SubmitButton";
import { useCookies } from "react-cookie";

const Login = () => {
  const [visiblePassword, setVisiblePassword] = useState(false);

  const [Token, setToken] = useCookies(["Al-Azhar"]);


  const [login] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isLoading, isSubmitting },
  } = useForm({
    resolver: yupResolver(loginValidationSchema()),
  });

  const onSubmit = async ({ email, password }) => {
    try {
      const response = await login({
        email,
        password,
      }).unwrap();

      const { data, accessToken, message, status } = response;


      if (status === "success") {
        toast.success(message);
        dispatch(setAuth({ token: accessToken, user: data?.data }));
        setToken("Al-Azhar", accessToken);
        setTimeout(() => navigate("/"), 200);
      }

    } catch (err) {
      if (err.status === 403) {
        toast.error("Account locked due to too many failed attempts.");
      } else if (err.status === 422) {
        toast.error(err.data?.message);
      } else if (err.status >= 500) {
        toast.error("Server error, please try again later.");
      } else {
        toast.error(err.error || "An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="bg-white w-2/6 p-12 shadow-md rounded-md">

      <h1 className="text-lightBlue text-4xl mb-8 font-semibold text-center">
        Welcome Back
      </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-2">
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
              className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer text-lg text-mistyMorning"
              onClick={() => setVisiblePassword(!visiblePassword)}
            >
              {visiblePassword ? <LuEyeClosed /> : <LuEye />}
            </p>
          </div>
          <p className="text-mistyMorning mb-2 w-full text-sm">
            Forgot your password?{" "}
            <Link to="/auth/reset" className="text-lightBlue">
              Reset
            </Link>
          </p>
        </div>

        <div className="w-full mt-2">
          <SubmitButton
            isLoading={isLoading}
            isSubmitting={isSubmitting}
            label="Login"
          />
          <div className="text-mistyMorning text-center mt-6 flex flex-col gap-2">
            <p>Don't have an email? </p>
            <p className="w-full self-center">
              <Link
                to="/auth/signup"
                className="w-full block transition-colors duration-200 bg-mistyMorning/30 hover:text-lightBlue text-secondary p-2 rounded-md"
              >
                Signup
              </Link>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
