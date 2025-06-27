import React from "react";
import Input from "../../components/Input";

const IdentificationDocuments = ({
  selectedIDType,
  setValue,
  setSelectedIDType,
  errors,
  register,
}) => {
  // nationalIDImage
  // facultyIDNumber
  // profileImage

  const formatNationalID = (e) => {
    if (selectedIDType === "nationalID") {
      let value = e.target.value.replace(/\D/g, "");
      let formattedValue = "";

      for (let i = 0; i < value.length; i++) {
        if (i > 0 && i % 4 === 0) {
          formattedValue += "-";
        }
        formattedValue += value[i];
      }
      e.target.value = formattedValue;
    }
  };

  return (
    <div>
      {/* Nation ID / Passport Number */}
      <div className="w-2/3">
        <div className="flex items-start mb-2 text-mistyMorning">
          <div>
            <label
              htmlFor="nationalID"
              className={`mr-2 ${
                selectedIDType === "nationalID" && "text-secondary"
              }`}
            >
              National ID
            </label>
            <input
              type="radio"
              id="nationalID"
              name="idOrPassport"
              value="nationalID"
              checked={selectedIDType === "nationalID"}
              onChange={() => {
                setValue("idOrPassportNumber", "");
                setSelectedIDType("nationalID");
                if (errors.idOrPassportNumber) {
                  errors.idOrPassportNumber.message = "";
                }
              }}
            />
          </div>
          <div className="ml-4">
            <label
              htmlFor="passport"
              className={`mr-2 ${
                selectedIDType === "passport" && "text-secondary"
              }`}
            >
              Passport
            </label>
            <input
              type="radio"
              id="passport"
              name="idOrPassport"
              checked={selectedIDType === "passport"}
              value="passport"
              onChange={() => {
                setValue("idOrPassportNumber", "");
                setSelectedIDType("passport");
                if (errors.idOrPassportNumber) {
                  errors.idOrPassportNumber.message = "";
                }
              }}
            />
          </div>
          {errors && (
            <p className="text-red-500 text-sm">
              {errors.idOrPassport?.type?.message}
            </p>
          )}
        </div>

        <Input
          handleInput={(e) => formatNationalID(e)}
          placeholder={`${
            selectedIDType === "nationalID" ? "National ID" : "Passport Number"
          }`}
          type="text"
          maxLength={selectedIDType === "nationalID" ? 17 : 12}
          {...register("idOrPassportNumber")}
          error={errors.idOrPassportNumber?.message}
        />
        {errors && (
          <p className="text-red-500 text-sm">
            {errors.idOrPassport?.number?.message}
          </p>
        )}
      </div>
    </div>
  );
};

export default IdentificationDocuments;
