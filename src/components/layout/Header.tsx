import { useRef, useState } from "react";
import MenuIcon from "../../icons/MenuIcon";
import UserIcon from "../../icons/UserIcon";
import NavBar from "./NavBar";
import { Link } from "react-router-dom";
import SearchIcon from "../../icons/SearchIcon";
import { useUserStore } from "../../store/user";

export default function Header() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const navToggleRef = useRef<HTMLDivElement>(null);

  const { loginUser } = useUserStore();

  function handleClick() {
    setIsNavOpen(!isNavOpen);
  }

  return (
    <header className="border-b h-[80px] flex items-center sticky top-0 z-10 bg-white">
      <div className="max-w-[2360px] w-11/12 mx-auto flex justify-between items-center">
        <Link to="/" className="font-bold text-brand text-3xl w-[114px]">
          minibnb
        </Link>
        <div className="relative hidden md:block">
          <input
            type="search"
            className="border rounded-[40px] w-[300px] h-[48px] pl-[20px] shadow-basic outline-none"
            placeholder="원하는 숙소를 검색해주세요"
          />
          <SearchIcon />
        </div>
        <div className="relative w-[114px] flex justify-end" ref={navToggleRef}>
          <div
            onClick={handleClick}
            className="w-[86px] h-[48px] border rounded-[40px] flex items-center justify-evenly cursor-pointer hover:shadow-md transition "
          >
            <MenuIcon />
            {loginUser ? (
              <img
                src={loginUser.profile_image}
                className="w-[32px] h-[32px] object-cover border rounded-full"
              />
            ) : (
              <UserIcon className="w-[32px] h-[32px] text-[#717171]" />
            )}
          </div>
          {isNavOpen && (
            <NavBar onClose={handleClick} navToggleRef={navToggleRef} />
          )}
        </div>
      </div>
    </header>
  );
}
