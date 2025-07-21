import React, { useState } from "react";
import { LuEye, LuEyeClosed } from "react-icons/lu";
import Input from "../../components/Input";

const FinalStep = ({ errors, register }) => {
  const [visiblePassword, setVisiblePassword] = useState(false);
  return (
    <div>
      <div className="flex flex-col gap-4">
        {/* Password */}
        <div className="col-span-full relative">
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
            {visiblePassword ? <LuEyeClosed /> : <LuEye />}
          </p>
          {errors && (
            <p className="text-red-500 text-sm">
              {errors.idOrPassport?.password?.message}
            </p>
          )}
        </div>
        {/* Confirm Password */}
        <div className="col-span-full relative">
          <Input
            placeholder="Confirm Password"
            type={!visiblePassword ? "password" : "text"}
            {...register("confirmPassword")}
            error={errors.confirmPassword?.message}
          />
          <p
            className="absolute right-2 top-3 cursor-pointer text-lg text-mediumGray/80"
            onClick={() => setVisiblePassword(!visiblePassword)}
          >
            {visiblePassword ? <LuEyeClosed /> : <LuEye />}
          </p>
          {errors && (
            <p className="text-red-500 text-sm">
              {errors.idOrPassport?.confirmPassword?.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FinalStep;
