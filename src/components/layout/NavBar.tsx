import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

type Props = {
  onClose: () => void;
};

export default function NavBar({ onClose }: Props) {
  const linkStyle = "py-2 px-4 hover:bg-[#f8f9fa]";
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        onClose();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <nav
      ref={navRef}
      className="absolute top-[60px] right-0 w-[240px] rounded-md shadow-basic flex flex-col py-2 bg-white z-20"
    >
      <Link to="/login" onClick={onClose} className={linkStyle}>
        로그인
      </Link>
      <Link to="/signup" onClick={onClose} className={linkStyle}>
        회원가입
      </Link>
      <Link to="/mypage" onClick={onClose} className={linkStyle}>
        마이페이지
      </Link>
      <Link to="/cart" onClick={onClose} className={linkStyle}>
        장바구니
      </Link>
    </nav>
  );
}
