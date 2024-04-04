import { useNavigate, useSearchParams } from "react-router-dom";
import { useToggle } from "../../hooks/useToggle";
import { formatDate } from "../../util/date";
import DatePicker from "../../UI/DatePicker";
import DummyInfo from "./DummyInfo";
import { FaMinus, FaPlus } from "react-icons/fa";
import { useContext, useState } from "react";
import { OptionContext } from "../../context/OptionProvider";
import { useUserStore } from "../../store/user";
import { ACCESS_TOKEN } from "../../util/auth";

export default function PaymentInfo() {
  const member_id = useUserStore((state) => state.loginUser?.member_id);

  const {
    date,
    guest,
    selectedRoom,
    room,
    finalPrice,
    isInvalidDate,
    isSameDate,
    changeGuest,
    changeRoom,
  } = useContext(OptionContext);

  const [guery] = useSearchParams();
  const [agreement, setAgreement] = useState({
    agree1: false,
    agree2: false,
    agree3: false,
  });

  const allChecked = agreement.agree1 && agreement.agree2 && agreement.agree3;
  const allDone = allChecked && !isInvalidDate && !isSameDate;

  const [openDate, toggleDate] = useToggle();
  const navigate = useNavigate();
  const isActiveUp = +room > +guest;
  const isActiveDown = 1 < +guest;
  const activeBtn = "p-2 rounded-full bg-gray-200 hover:brightness-90";
  const inactiveBtn =
    "p-2 rounded-full border border-stone-200 text-stone-200 cursor-not-allowed w-[32px] h-[32px] box-border";

  async function handleClick() {
    let url;
    let request;

    if (guery.get("cartid")) {
      url = `${import.meta.env.VITE_API_URL}/api/payments/cart-reservation`;
      request = {
        cart_id: +guery.get("cartid")!,
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
        Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
      },
      body: JSON.stringify(request),
    });

    const data = await response.json();

    navigate(`/payment/${data.body.id}/complete`);
  }

  return (
    <div className="md:basis-1/2 pb-12">
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
              <p className={isInvalidDate ? "text-brand" : ""}>
                {formatDate(date.startDate)} ~ {formatDate(date.endDate)}
              </p>
            </div>
            <button className="hover:underline" onClick={toggleDate}>
              수정
            </button>
            {openDate && (
              <div
                className="fixed top-0 left-0 w-full h-full bg-black/70 flex flex-col justify-center items-center z-10"
                onClick={(event) => {
                  if (event.target === event.currentTarget) {
                    toggleDate();
                  }
                }}
              >
                <div className="md:hidden">
                  <DatePicker months={1} />
                </div>
                <div className="hidden md:block">
                  <DatePicker months={2} />
                </div>
                {isInvalidDate && (
                  <p className="bg-white w-[664px] text-center pb-2 text-brand">
                    선택불가능한 날짜입니다.
                  </p>
                )}
              </div>
            )}
          </div>
          <div className="flex justify-between items-center">
            <p>인원</p>
            <div className="flex items-center w-[100px] justify-between">
              <button
                onClick={() => changeGuest(-1)}
                className={isActiveDown ? activeBtn : inactiveBtn}
                disabled={!isActiveDown}
              >
                <FaMinus />
              </button>
              <p>{guest}명</p>
              <button
                onClick={() => changeGuest(1)}
                className={isActiveUp ? activeBtn : inactiveBtn}
                disabled={!isActiveUp}
              >
                <FaPlus />
              </button>
            </div>
          </div>
          {isInvalidDate && (
            <p className="text-brand">선택 불가능한 날짜입니다.</p>
          )}
        </div>
      </div>
      <DummyInfo
        startDate={formatDate(date.startDate)}
        agreement={agreement}
        setAgreement={setAgreement}
        allChecked={allChecked}
      />
      {(isInvalidDate || isSameDate) && (
        <p className="text-brand mb-2">선택하신 날짜를 변경해주세요.</p>
      )}
      <button
        onClick={handleClick}
        className={`w-full md:w-[120px] py-4 text-white rounded-lg ${
          allDone ? "bg-brand" : "bg-stone-200"
        } transition`}
        disabled={!allDone}
      >
        예약 요청
      </button>
    </div>
  );
}
