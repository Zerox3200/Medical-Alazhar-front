import React from "react";

const Footer = () => {
  const date = new Date();
  const year = date.getFullYear();

  return (
    <footer className="bg-teal p-8 text-center text-xl text-crispWhite">
      <div>
        Copyright &copy; {year}
        {", "}
        <strong className="text-softGray">
          Al-Azhar University for Boys - Faculty of Medicine
        </strong>
      </div>
    </footer>
  );
};

export default Footer;
