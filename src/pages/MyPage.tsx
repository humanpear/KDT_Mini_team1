import { useQuery } from "@tanstack/react-query";
import { useUserStore } from "../store/user";
import { getReservations } from "../util/http";
import AccommodationItem from "../UI/AccommodationItem";
import { AccommodationWithOption } from "../types/accommodationInfo";

export default function MyPage() {
  const { loginUser } = useUserStore();
  const { data: reservations, isLoading } = useQuery({
    queryKey: ["reservations"],
    queryFn: getReservations,
  });

  if (isLoading || !loginUser) {
    return <p>Loading...</p>;
  }

  return (
    <section className="w-[800px] mx-auto py-16">
      <p className="text-2xl font-bold text-center mb-4">마이페이지</p>
      <div className="shadow-basic rounded-md p-8">
        <p className="font-bold text-xl mb-6">개인정보</p>
        <div className="flex items-center">
          <img
            src={loginUser.profile_image}
            alt={`${loginUser?.name}님의 프로필 이미지`}
            className="w-[200px] h-[200px] object-cover shrink-0"
          />
          <div className="ml-6 w-full">
            <div className="text-xl flex border-b p-4">
              <p className="w-[70px] text-stone-400">이름</p>
              <p>{loginUser.name}</p>
            </div>
            <div className="text-xl flex border-b p-4">
              <p className="w-[70px] text-stone-400">이메일</p>
              <p>{loginUser.username}</p>
            </div>
          </div>
        </div>
        <p className="font-bold text-xl pt-6 pb-4">예약내역</p>
        <ul className="flex flex-col gap-4">
          {reservations.length > 0 &&
            reservations.map((reservation: AccommodationWithOption) => (
              <AccommodationItem
                key={reservation.reservation.id}
                item={reservation}
                type="reservation"
              />
            ))}
        </ul>
      </div>
    </section>
  );
}
