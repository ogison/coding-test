import React from "react";

const Header: React.FC = () => {
  return (
    <header className="bg-white h-16 flex">
      <div className="container flex justify-start items-center">
        <img src={"./logo.svg"} className="ml-4" alt="logo" />
      </div>
    </header>
  );
};

export default Header;
