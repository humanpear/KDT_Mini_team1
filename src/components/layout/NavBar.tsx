import { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserStore } from "../../store/user";
import { logout } from "../../util/auth";
import { useQuery } from "@tanstack/react-query";
import { getCarts, getReservations } from "../../util/http";
import Badge from "../../UI/Badge";

type Props = {
  onClose: () => void;
  navToggleRef: React.RefObject<HTMLDivElement>;
};

export default function NavBar({ onClose, navToggleRef }: Props) {
  const linkStyle = "py-2 px-4 hover:bg-[#f8f9fa] flex justify-between";
  const navRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const { loginUser, setLoginUser } = useUserStore();
  const { data: reservations, isPending: isReservationsPending } = useQuery({
    queryKey: ["reservations", loginUser?.member_id],
    queryFn: getReservations,
  });
  const { data: carts, isPending: isCartsPending } = useQuery({
    queryKey: ["carts", loginUser?.member_id],
    queryFn: getCarts,
  });

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        navRef.current &&
        !navRef.current.contains(event.target as Node) &&
        navToggleRef.current &&
        !navToggleRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose, navToggleRef]);

  return (
    <nav
      ref={navRef}
      className="absolute top-[60px] right-0 w-[240px] rounded-lg shadow-basic flex flex-col py-2 bg-white z-20"
    >
      {!loginUser && (
        <Link to="/login" onClick={onClose} className={linkStyle}>
          로그인
        </Link>
      )}
      {!loginUser && (
        <Link to="/signup" onClick={onClose} className={linkStyle}>
          회원가입
        </Link>
      )}
      {loginUser && (
        <Link to="/mypage" onClick={onClose} className={linkStyle}>
          <p>마이페이지</p>
          {!isReservationsPending && <Badge count={reservations.body.length} />}
        </Link>
      )}
      {loginUser && (
        <Link to="/cart" onClick={onClose} className={linkStyle}>
          <p>장바구니</p>
          {!isCartsPending && <Badge count={carts.body.length} />}
        </Link>
      )}
      {loginUser && (
        <p
          onClick={() => {
            logout(navigate, setLoginUser);
            onClose();
          }}
          className={`${linkStyle} cursor-pointer`}
        >
          로그아웃
        </p>
      )}
    </nav>
  );
}
