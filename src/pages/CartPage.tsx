import CartIcon from "../icons/CartIcon";
import Home from "../icons/Home";
import { GrFormPrevious } from "react-icons/gr";

export default function CartPage() {
<<<<<<< HEAD
=======
	return (
		<section className="w-[1120px] mx-auto">
			<div className="flex justify-between items-center p-6">
				<GrFormPrevious className="text-2xl cursor-pointer" />
				<p className="text-2xl font-bold">장바구니</p>
				<Home />
			</div>
			<div className="flex flex-col gap-6 justify-center items-center p-10 border rounded">
				<CartIcon />
				<div className="text-center">
					<p className="text-xl">장바구니에 담긴 상품이 없습니다.</p>
					<p className="text-gray-500">원하는 상품을 담아보세요.</p>
				</div>
				<button className="w-2/12 bg-[#F42C5B] py-3 rounded-lg text-white hover:brightness-110">홈으로 가기</button>
			</div>
		</section>
	);
>>>>>>> develop
}
