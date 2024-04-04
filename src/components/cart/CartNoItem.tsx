import { Link } from "react-router-dom";
import CartIcon from "../../icons/CartIcon";

export default function CartNoItem() {
  return (
    <div className="flex flex-col gap-6 justify-center items-center p-10 border rounded">
      <CartIcon />
      <div className="text-center">
        <p className="text-[16px] md:text-xl">
          장바구니에 담긴 상품이 없습니다.
        </p>
        <p className="text-gray-400">원하는 상품을 담아보세요.</p>
      </div>
      <Link
        to="/"
        className="w-[110px] bg-brand py-3 rounded-lg text-white hover:brightness-110 text-center"
      >
        홈으로 가기
      </Link>
    </div>
  );
}
