import React from "react";

const Copyright = () => {
  const date = new Date();
  const year = date.getFullYear();

  return (
    <div className="h-full w-full bg-primary p-4 text-center border-t-1 border-t-mistyMorning/40 text-lg text-flashWhite">
      <div>
        Copyright &copy; {year}
        {", "}
        <strong>Al-Azhar University for Boys - Faculty of Medicine</strong>
      </div>
    </div>
  );
};

export default Copyright;
