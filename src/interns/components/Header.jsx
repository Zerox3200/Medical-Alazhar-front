import React from "react";

const Header = ({ headerTitle }) => {
  return (
    <h1 className="text-secondary font-semibold text-3xl mb-6">
      {headerTitle}
    </h1>
  );
};

export default Header;
