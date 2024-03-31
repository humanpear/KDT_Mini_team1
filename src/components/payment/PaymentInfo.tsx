import { useNavigate } from "react-router-dom";
import { AccommodationInfo } from "../../types/AccommodationInfo";
import { useToggle } from "../../hooks/useToggle";
import { formatDate } from "../../util/date";
import DatePicker from "../../UI/DatePicker";
import DummyInfo from "./DummyInfo";
import { useQuery } from "@tanstack/react-query";
import { getCarts } from "../../util/http";
import { FaMinus, FaPlus } from "react-icons/fa";
import { useContext } from "react";
import { OptionContext } from "../../context/OptionProvider";
import { useUserStore } from "../../store/user";

type Props = {
  product: AccommodationInfo;
};

export default function PaymentInfo({ product }: Props) {
  const { data: cartItems } = useQuery({
    queryKey: ["carts"],
    queryFn: getCarts,
  });

  const member_id = useUserStore((state) => state.loginUser?.member_id);

  const {
    date,
    guest,
    selectedRoom,
    room,
    roomPrice,
    finalPrice,
    changeGuest,
    changeRoom,
  } = useContext(OptionContext);

  const [openDate, toggleDate] = useToggle();

  const navigate = useNavigate();

  async function handleClick() {
    let url;
    let request;

    if (cartItems.body.find((item) => item.id === id)) {
      url = `${import.meta.env.VITE_API_URL}/api/payments/cart-reservation`;
      request = {
        cart_id: id,
        reservation: {
          member_id,
          room_id: selectedRoom?.id,
          capacity: +guest,
          start_date: formatDate(date.startDate),
          end_date: formatDate(date.endDate),
          total_price: finalPrice,
        },
      };
    } else {
      url = `${import.meta.env.VITE_API_URL}/api/payments/reservation`;
      request = {
        member_id,
        room_id: selectedRoom?.id,
        capacity: +guest,
        start_date: formatDate(date.startDate),
        end_date: formatDate(date.endDate),
        total_price: finalPrice,
      };
    }

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
      body: JSON.stringify(request),
    });

    const data = await response.json();

    navigate(`/payment/${data.body.id}/complete`);
  }

  return (
    <div className="basis-1/2 pb-12">
      <div className="border-b">
        <p className="text-[24px] mb-6">예약 정보</p>
        <div className="flex flex-col gap-4 pb-6">
          <div className="flex justify-between items-center">
            <p>객실 형태</p>
            <div className="border border-gray-200 rounded-md">
              <button
                onClick={() => changeRoom("2")}
                className={`border-r border-gray-200 p-1 ${
                  room === "2" && "bg-gray-200"
                }`}
              >
                2인실
              </button>
              <button
                onClick={() => changeRoom("4")}
                className={`p-1 ${room === "4" && "bg-gray-200"}`}
              >
                4인실
              </button>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div>
              <p>날짜</p>
              <p>
                {formatDate(date.startDate)} ~ {formatDate(date.endDate)}
              </p>
            </div>
            <button className="hover:underline" onClick={toggleDate}>
              수정
            </button>
            {openDate && (
              <div
                className="fixed top-0 left-0 w-full h-full bg-black/70 flex justify-center items-center z-10"
                onClick={(event) => {
                  if (event.target === event.currentTarget) {
                    toggleDate();
                  }
                }}
              >
                <DatePicker />
              </div>
            )}
          </div>
          <div className="flex justify-between items-center">
            <div>
              <p>인원</p>
            </div>
            <div className="flex items-center w-[100px] justify-between">
              <button
                onClick={() => changeGuest(1)}
                className="p-2 rounded-full bg-gray-200"
              >
                <FaPlus />
              </button>
              <p>{guest}명</p>
              <button
                onClick={() => changeGuest(-1)}
                className="p-2 rounded-full bg-gray-200"
              >
                <FaMinus />
              </button>
            </div>
          </div>
        </div>
      </div>
      <DummyInfo startDate={formatDate(date.startDate)} />
      <button
        onClick={handleClick}
        className="w-[120px] py-4 bg-brand text-white rounded-lg"
      >
        예약 요청
      </button>
    </div>
  );
}
