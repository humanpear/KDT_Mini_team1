import { useNavigate, useSearchParams } from "react-router-dom";
import { AccommodationInfo } from "../../types/AccommodationInfo";
import { useState } from "react";
import { useToggle } from "../../hooks/useToggle";
import { RangeKeyDict } from "react-date-range";
import { formatDate } from "../../util/date";
import DatePicker from "../../UI/DatePicker";
import DummyInfo from "./DummyInfo";
import { useQuery } from "@tanstack/react-query";

type Props = {
  accommodation: AccommodationInfo;
};

export default function PaymentInfo({ accommodation }: Props) {
  const { contentid } = accommodation;
  // const { data: cartItems, isLoading } = useQuery({
  //   queryKey: ["carts"],
  //   queryFn: getCarts,
  // });
  const [query, setQuery] = useSearchParams();

  const [date, setDate] = useState({
    startDate: new Date(query.get("check_in") as string),
    endDate: new Date(query.get("check_out") as string),
    key: "selection",
  });

  const [openDate, toggleDate] = useToggle();

  const navigate = useNavigate();

  const handleChangeDate = (ranges: RangeKeyDict) => {
    const { startDate, endDate } = ranges.selection;
    setDate({ startDate: startDate!, endDate: endDate!, key: "selection" });
    setQuery({
      check_in: formatDate(ranges.selection.startDate!),
      check_out: formatDate(ranges.selection.endDate!),
    });
  };

  async function handleClick() {
    let url;

    await fetch("/api/reservations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...accommodation }),
    });
    navigate(`/payment/${contentid}/complete`);
  }

  return (
    <div className="basis-1/2 pb-12">
      <div className="border-b">
        <p className="text-[24px] mb-6">예약 정보</p>
        <div className="flex flex-col gap-4 pb-6">
          <div className="flex justify-between items-center">
            <div>
              <p>날짜</p>
              <p>
                {formatDate(date.startDate)} ~ {formatDate(date.endDate)}
              </p>
            </div>
            <p
              className="hover:bg-stone-100 cursor-pointer p-1 rounded-md transition"
              onClick={toggleDate}
            >
              수정
            </p>
            {openDate && (
              <div
                className="fixed top-0 left-0 w-full h-full bg-black/70 flex justify-center items-center z-10"
                onClick={(event) => {
                  if (event.target === event.currentTarget) {
                    toggleDate();
                  }
                }}
              >
                <DatePicker date={date} handleChangeDate={handleChangeDate} />
              </div>
            )}
          </div>
          <div className="flex justify-between items-center">
            <div>
              <p>게스트</p>
              {/* <p>게스트 {paymentInfo.guest}명</p> */}
            </div>
            <p className="hover:bg-stone-100 cursor-pointer p-1 rounded-md transition">
              수정
            </p>
          </div>
        </div>
      </div>
      <DummyInfo startDate={formatDate(date.startDate)} />
      <button
        onClick={handleClick}
        className="w-[120px] py-4 bg-[#FF385C] text-white rounded-lg"
      >
        예약 요청
      </button>
    </div>
  );
}
