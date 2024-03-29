import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { IoCartOutline } from "react-icons/io5";
import { AccommodationInfo, Room } from "../../types/accommodationInfo";
import { useEffect, useRef, useState } from "react";
import { DateRange, RangeKeyDict } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import ko from "date-fns/locale/ko";
import {
  MdOutlineKeyboardArrowRight,
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";
import { FaPlus, FaMinus } from "react-icons/fa6";
import { formatDate, formattedDate } from "../../util/date";
import { RiCloseLine } from "react-icons/ri";

type Props = {
  accommodation: AccommodationInfo;
};

const textClass = "text-sm opacity-80";
const textFlex = "flex flex-col";
const iconClass = "text-xl font-semibold";
const btnCustom = "p-2 rounded-full bg-gray-200 hover:brightness-90";

export default function ReservationCard({ accommodation }: Props) {
  const navigate = useNavigate();
  const { id } = useParams();
  const currentDate = new Date();
  const tomorrowDate = new Date(currentDate.getTime() + 24 * 60 * 60 * 1000);

  const roomRef = useRef(null);
  const dateRef = useRef(null);
  const guestRef = useRef(null);

  const roomOpenRef = useRef(null);
  const dateOpenRef = useRef(null);
  const guestOpenRef = useRef(null);

  const [query, setQuery] = useSearchParams();
  const [date, setDate] = useState({
    startDate: new Date(query.get("check_in") || currentDate),
    endDate: new Date(query.get("check_out") || tomorrowDate),
    key: "selection",
  });

  const [paymentInfo, setPaymentInfo] = useState({
    room: query.get("room") || accommodation.room[0].max_capacity,
    startDate: query.get("check_in") || formatDate(currentDate),
    endDate: query.get("check_out") || formatDate(tomorrowDate),
    guest: query.get("guest") || "1",
  });

  useEffect(() => {
    setQuery({
      room: paymentInfo.room,
      check_in: paymentInfo.startDate,
      check_out: paymentInfo.endDate,
      guest: paymentInfo.guest,
    });
  }, [paymentInfo, setQuery]);

  const [openOptionType, setOpenOptionType] = useState("none");
  const isRoom = openOptionType === "room";
  const isDate = openOptionType === "date";
  const isGuest = openOptionType === "guest";

  function changeOpenOptionType(type: string) {
    if (openOptionType === type) {
      setOpenOptionType("none");
    } else {
      setOpenOptionType(type);
    }
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        (roomRef.current &&
          !(roomRef.current as HTMLElement).contains(event.target as Node) &&
          roomOpenRef.current &&
          !(roomOpenRef.current as HTMLElement).contains(
            event.target as Node
          )) ||
        (dateRef.current &&
          !(dateRef.current as HTMLElement).contains(event.target as Node) &&
          dateOpenRef.current &&
          !(dateOpenRef.current as HTMLElement).contains(
            event.target as Node
          )) ||
        (guestRef.current &&
          !(guestRef.current as HTMLElement).contains(event.target as Node) &&
          guestOpenRef.current &&
          !(guestOpenRef.current as HTMLElement).contains(event.target as Node))
      ) {
        setOpenOptionType("none");
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleChange = (ranges: RangeKeyDict) => {
    const { startDate, endDate } = ranges.selection;
    setDate({ startDate: startDate!, endDate: endDate!, key: "selection" });
    setPaymentInfo((prevInfo) => ({
      ...prevInfo,
      startDate: formatDate(ranges.selection.startDate!),
      endDate: formatDate(ranges.selection.endDate!),
    }));
  };

  const handleClickGuest = (value: number) => {
    setPaymentInfo((prevInfo) => {
      const newGuest = +prevInfo.guest + value;
      const maxCapacity = +prevInfo.room;

      if (newGuest >= 1 && newGuest <= maxCapacity) {
        return {
          ...prevInfo,
          guest: newGuest.toString(),
        };
      }
      return prevInfo;
    });
  };

  const handleClickRoom = (value: string) => {
    changeOpenOptionType("room");
    setPaymentInfo((prevInfo) => ({
      ...prevInfo,
      room: value,
    }));
  };

  const handleClearDate = () => {
    setDate({
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    });
  };

  const [success, setSuccess] = useState(false);

  const handleCart = async () => {
    await fetch("/api/carts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...accommodation, ...paymentInfo }),
    });
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  const numberOfNights = () => {
    if (date.startDate && date.endDate) {
      const time = Math.abs(date.endDate.getTime() - date.startDate.getTime());
      const days = Math.ceil(time / (1000 * 60 * 60 * 24));
      return days;
    }
  };

  const totalPrice = () => {
    const nights = numberOfNights();
    const selectedRoom = accommodation.room.find(
      (roomItem: Room) => roomItem.max_capacity === paymentInfo.room
    );

    if (nights && selectedRoom) {
      return nights * selectedRoom.price;
    }
  };

  return (
    <div className="w-5/12">
      <div className="h-min p-6 border rounded-lg sticky top-[200px]">
        <div className="flex items-center gap-2 mb-4">
          {paymentInfo.room && (
            <div>
              {accommodation.room.map((roomItem: Room) => {
                if (roomItem.max_capacity === paymentInfo.room) {
                  return (
                    <p key={roomItem.id} className="text-xl font-semibold">
                      ₩{roomItem.price}
                    </p>
                  );
                }
              })}
            </div>
          )}
          <p className="text-sm text-gray-600">/ 박</p>
        </div>
        <div className="border rounded mb-4">
          {/* 숙소형태 */}
          <div ref={roomOpenRef} className="relative border-b cursor-pointer">
            <div
              onClick={() => changeOpenOptionType("room")}
              className="flex justify-between items-center p-4"
            >
              <div>
                <span className={textClass}>객실형태</span>
                <p>{paymentInfo.room}인실</p>
              </div>
              {isRoom ? (
                <MdOutlineKeyboardArrowUp className={iconClass} />
              ) : (
                <MdOutlineKeyboardArrowDown className={iconClass} />
              )}
            </div>
            {isRoom && (
              <div
                ref={roomRef}
                className="w-full z-10 absolute left-0 p-4 flex flex-col gap-2 bg-white border shadow-md rounded"
              >
                {accommodation.room.map((roomItem: Room) => (
                  <button
                    key={roomItem.id}
                    onClick={() => handleClickRoom(roomItem.max_capacity)}
                    className="bg-gray-100 p-2 rounded hover:brightness-90"
                  >{`${roomItem.max_capacity} 인실`}</button>
                ))}
              </div>
            )}
          </div>
          {/* 체크인-체크아웃 */}
          <div ref={dateOpenRef} className="relative border-b">
            <div
              onClick={() => changeOpenOptionType("date")}
              className="flex justify-between items-center cursor-pointer p-4"
            >
              <div className={textFlex}>
                <span className={textClass}>체크인</span>
                {formattedDate(date.startDate)}
              </div>
              <MdOutlineKeyboardArrowRight className={iconClass} />
              <div className={textFlex}>
                <span className={textClass}>체크아웃</span>
                {formattedDate(date.endDate)}
              </div>
            </div>
            {isDate && (
              <div
                ref={dateRef}
                className="z-10 absolute -top-1/2 -right-1/2 bg-white border shadow-md p-4"
              >
                <DateRange
                  locale={ko}
                  ranges={[date]}
                  onChange={handleChange}
                  minDate={new Date()}
                  months={2}
                  direction="horizontal"
                />
                <div className="flex justify-end gap-6">
                  <button className="underline" onClick={handleClearDate}>
                    날짜지우기
                  </button>
                </div>
              </div>
            )}
          </div>
          {/* 인원 */}
          <div ref={guestOpenRef} className="relative">
            <div
              onClick={() => changeOpenOptionType("guest")}
              className="flex justify-between items-center cursor-pointer p-4"
            >
              <div>
                <span className={textClass}>인원</span>
                <p>
                  게스트 {paymentInfo.guest === "" ? "1" : paymentInfo.guest}명
                </p>
              </div>
              {isGuest ? (
                <MdOutlineKeyboardArrowUp className={iconClass} />
              ) : (
                <MdOutlineKeyboardArrowDown className={iconClass} />
              )}
            </div>
            <div>
              {isGuest && (
                <div
                  ref={guestRef}
                  className="flex flex-col gap-4 w-full p-6 z-10 absolute left-0 bg-white border shadow-md rounded"
                >
                  <div className="flex gap-6 justify-between">
                    <div className="flex flex-wrap">
                      <p className={iconClass}>인원</p>
                      <span className={textClass}>
                        유아 및 아동도 인원수에 포함해주세요.
                      </span>
                    </div>
                    <div className="flex justify-between items-center gap-4">
                      <button
                        onClick={() => handleClickGuest(1)}
                        className={btnCustom}
                      >
                        <FaPlus />
                      </button>
                      {paymentInfo.guest}
                      <button
                        onClick={() => handleClickGuest(-1)}
                        className={btnCustom}
                      >
                        <FaMinus />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex justify-end items-center mb-4 gap-2">
          <button
            onClick={handleCart}
            className="p-2 text-2xl bg-gray-100 rounded hover:brightness-90"
          >
            <IoCartOutline />
          </button>
          <button
            onClick={() =>
              navigate(
                `/payment/${id}?room=${paymentInfo.room}&check_in=${paymentInfo.startDate}&check_out=${paymentInfo.endDate}&guest=${paymentInfo.guest}`
              )
            }
            className="w-10/12 py-2 bg-brand text-white rounded hover:brightness-110"
          >
            예약 하기
          </button>
        </div>
        {success ? (
          <div className="flex justify-between mb-4">
            <p>✅장바구니에 추가되었습니다.</p>
            <button className="underline" onClick={() => navigate(`/cart`)}>
              장바구니 보기
            </button>
          </div>
        ) : (
          <p className="mb-4">예약 확정 전에는 요금이 청구되지 않습니다.</p>
        )}
        <div className="flex justify-between pb-4 border-b">
          <div className="flex items-center gap-2">
            {paymentInfo.room && (
              <div>
                {accommodation.room.map((roomItem: Room) => {
                  if (roomItem.max_capacity === paymentInfo.room) {
                    return <p key={roomItem.id}>₩{roomItem.price}</p>;
                  }
                })}
              </div>
            )}
            <RiCloseLine className="text-sm" />
            <p>{numberOfNights()}박</p>
          </div>
          <p>₩{totalPrice()}</p>
        </div>
        <div className="flex justify-between pt-4 text-xl font-semibold">
          <p>총 합계</p>
          <p>₩{totalPrice()}</p>
        </div>
      </div>
    </div>
  );
}
