import { Link, useParams } from "react-router-dom";
import NextIcon from "../../icons/NextIcon";
import { useQuery } from "@tanstack/react-query";
import { getReservation } from "../../util/http";
import { getStayDuration } from "../../util/date";
import LoadingSpinner from "../../UI/LoadingSpinner";

export default function OrderDetail() {
  const { id } = useParams();
  const { data, isPending } = useQuery({
    queryKey: ["orderComplete"],
    queryFn: () => getReservation(id as string),
  });

  if (isPending) {
    return <LoadingSpinner />;
  }

  const { title } = data.body.accommodation;
  const { start_date, end_date, total_price, room_price } =
    data.body.reservation;

  const charge = total_price / 10;

  return (
    <section className="py-16">
      <div className="text-center mb-12">
        <p className="text-2xl md:text-3xl font-bold mb-6">
          예약이 정상적으로 완료되었습니다.
        </p>
        <p>아래의 주문내역을 확인해주세요.</p>
      </div>
      <div className="w-full max-w-[600px] mx-auto">
        <p className="text-xl">{title}</p>
        <div className="flex justify-between items-center py-6 border-b">
          <div>
            <p>체크인</p>
            <p>{start_date}</p>
          </div>
          <NextIcon />
          <div>
            <p>체크아웃</p>
            <p>{end_date}</p>
          </div>
        </div>
        <div className="border-b py-6">
          <p className="text-[24px] mb-6">요금 세부정보</p>
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <p>
                {room_price.toLocaleString()} x{" "}
                {getStayDuration(new Date(start_date), new Date(end_date))}박
              </p>
              <p>
                {(
                  room_price *
                  getStayDuration(new Date(start_date), new Date(end_date))
                ).toLocaleString()}
                원
              </p>
            </div>
            <div className="flex justify-between items-center">
              <p className="underline">미니비앤비 서비스 수수료</p>
              <p>{charge.toLocaleString()}원</p>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center py-6">
          <p>총 합계</p>
          <p>{total_price.toLocaleString()}원</p>
        </div>
        <Link to="/mypage">
          <button className="w-full py-4 bg-brand text-white rounded-lg">
            마이페이지
          </button>
        </Link>
      </div>
    </section>
  );
}
