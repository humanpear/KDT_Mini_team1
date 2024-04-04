import { Link } from "react-router-dom";
import RoomIcon from "../../icons/RoomIcon";

export default function ReservationNoItem() {
  return (
    <div className="flex flex-col gap-6 justify-center items-center p-10 border rounded">
      <RoomIcon />
      <div className="text-center">
        <p className="text-[16px] md:text-xl">예약 내역이 존재하지 않습니다.</p>
        <p className="text-gray-400">원하는 상품을 예약하세요.</p>
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
