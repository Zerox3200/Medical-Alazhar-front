import React from "react";

const Footer = () => {
  const date = new Date();
  const year = date.getFullYear();

  return (
    <footer className="bg-secondary/10 border-t-1 border-cloudVeil p-4 text-center text-lg text-secondary">
      <div>
        Copyright &copy; {year}
        {", "}
        <span className="font-medium">
          Al-Azhar University for Boys - Faculty of Medicine
        </span>
      </div>
    </footer>
  );
};

export default Footer;
