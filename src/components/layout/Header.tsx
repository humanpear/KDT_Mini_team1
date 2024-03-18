import { useState } from "react";
import MenuIcon from "../../icons/MenuIcon";
import UserIcon from "../../icons/UserIcon";
import NavBar from "./NavBar";
import { Link } from "react-router-dom";

export default function Header() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  function handleClick() {
    setIsNavOpen(!isNavOpen);
  }

  return (
    <header className="border-b h-[80px] flex items-center sticky top-0 z-10">
      <div className="max-w-[2360px] w-11/12 mx-auto flex justify-between items-center">
        <Link to="/" className="font-bold text-[#FF385C] text-3xl">
          minibnb
        </Link>
        <input className="border rounded-[40px] w-[300px] h-[48px] pl-[20px]" />
        <div className="relative">
          <div
            onClick={handleClick}
            className="w-[86px] h-[48px] border rounded-[40px] flex items-center justify-evenly cursor-pointer hover:shadow-md transition "
          >
            <MenuIcon />
            <UserIcon />
          </div>
          {isNavOpen && <NavBar onClose={handleClick} />}
        </div>
      </div>
    </header>
  );
}
