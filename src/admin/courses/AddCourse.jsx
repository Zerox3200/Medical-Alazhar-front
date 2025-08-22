import React from "react";
import Select from "react-select";
import DarkButton from "../components/DarkButton";
import Input from "../components/Input";
import ImageUploader from "./ImageUploader";

const AddCourse = () => {
  return (
    <div className="p-6">
      <div className="bg-white shadow-sm rounded-md p-6">
        <form className="flex flex-col gap-4">
          <Input type="text" placeholder="Title" />
          <textarea
            placeholder="description"
            className="outline-none border-1 border-silverFrost rounded-sm p-2 outline-0 bg-flashWhite"
            cols={4}
            rows={4}
          />
          <div className="flex justify-between items-center gap-6">
            <Select
              className="flex-1"
              options={[
                { value: "abdallah_elmallah", label: "Dr. Abdallah Elmallah" },
                { value: "ahmed_nouh", label: "Dr. Ahmed Nouh" },
              ]}
              placeholder="Mentor"
            />
            <Select
              className="flex-1"
              placeholder="Tags"
              options={[
                { value: "surgery", label: "Surgery" },
                { value: "dermatology", label: "Dermatology" },
                { value: "emergency", label: "Emergency" },
                { value: "rheumatology", label: "Rheumatology" },
                { value: "nephrology", label: "Nephrology" },
                { value: "cardiology", label: "Cardiology" },
              ]}
              isMulti={true}
            />
          </div>
          <ImageUploader />

          <DarkButton
            label="Add Course"
            customClass="!block w-fit mt-6 text-xl mx-auto"
          />
        </form>
      </div>
    </div>
  );
};

export default AddCourse;
