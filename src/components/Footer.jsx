import React from "react";

const Footer = () => {
  const date = new Date();
  const year = date.getFullYear();

  return (
    <footer className="h-16 w-full bg-white p-4 text-center border-t-1 border-mistyMorning/40 text-lg text-secondary">
      <div>
        Copyright &copy; {year}
        {", "}
        <strong>Al-Azhar University for Boys - Faculty of Medicine</strong>
      </div>
    </footer>
  );
};

export default Footer;
