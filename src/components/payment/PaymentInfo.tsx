import { useNavigate, useSearchParams } from "react-router-dom";
import { AccommodationInfo } from "../../types/AccommodationInfo";
import { useState } from "react";
import { useToggle } from "../../hooks/useToggle";
import { RangeKeyDict } from "react-date-range";
import { formatDate } from "../../util/date";
import DatePicker from "../../UI/DatePicker";
import DummyInfo from "./DummyInfo";
import { useQuery } from "@tanstack/react-query";
import { getCarts } from "../../util/http";
import { ReservedAccommodation } from "../../types/reservedAccommodation";
import { FaMinus, FaPlus } from "react-icons/fa";

type Props = {
  accommodation: AccommodationInfo;
};

export default function PaymentInfo({ accommodation }: Props) {
  const { contentid } = accommodation;
  const { data: cartItems } = useQuery({
    queryKey: ["carts"],
    queryFn: getCarts,
  });
  const [query, setQuery] = useSearchParams();

  const [date, setDate] = useState({
    startDate: new Date(query.get("check_in") as string),
    endDate: new Date(query.get("check_out") as string),
    key: "selection",
  });

  const [room, setRoom] = useState(query.get("room"));
  const [guest, setGuest] = useState(query.get("guest"));

  const [openDate, toggleDate] = useToggle();

  const navigate = useNavigate();

  const handleChangeDate = (ranges: RangeKeyDict) => {
    const { startDate, endDate } = ranges.selection;
    setDate({ startDate: startDate!, endDate: endDate!, key: "selection" });
    setQuery((prevQuery) => ({
      ...Object.fromEntries([...prevQuery]),
      check_in: formatDate(ranges.selection.startDate!),
      check_out: formatDate(ranges.selection.endDate!),
    }));
  };

  const changeRoom = (value: string) => {
    setRoom(value);
    setQuery((prevQuery) => ({
      ...Object.fromEntries([...prevQuery]),
      room: value,
    }));
  };

  const changeGuest = (value: number) => {
    setGuest((prev) => (+prev! + value).toString());
    setQuery((prevQuery) => ({
      ...Object.fromEntries([...prevQuery]),
      guest: (+prevQuery.get("guest")! + value).toString(),
    }));
  };

  async function handleClick() {
    let url;

    if (
      cartItems.find(
        (item: ReservedAccommodation) => item.contentid === contentid
      )
    ) {
      url = "/api/payments/cart-reservation";
    } else {
      url = "/api/payments/reservation";
    }

    await fetch(url, {
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
                <DatePicker date={date} handleChangeDate={handleChangeDate} />
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
