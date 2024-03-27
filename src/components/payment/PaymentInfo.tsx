import { useNavigate, useSearchParams } from "react-router-dom";
import TimerIcon from "../../icons/TimerIcon";
import { AccommodationInfo } from "../../types/AccommodationInfo";
import { useState } from "react";
import { useToggle } from "../../hooks/useToggle";
import { RangeKeyDict } from "react-date-range";
import { DateRange } from "react-date-range";
import ko from "date-fns/locale/ko";
import { formatDate } from "../../util/date";

type Props = {
  accommodation: AccommodationInfo;
};

export default function PaymentInfo({ accommodation }: Props) {
  const { contentid } = accommodation;
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
              <DateRange
                locale={ko}
                ranges={[date]}
                onChange={handleChangeDate}
                minDate={new Date()}
                months={2}
                direction="horizontal"
              />
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
      <div className="border-b py-6">
        <p className="text-[24px] mb-6">환불 정책</p>
        <p>
          체크인 날짜인 {formatDate(date.startDate)} 전에 취소하면 부분 환불을
          받으실 수 있습니다. 그 이후에는 취소 시점에 따라 환불액이 결정됩니다.
        </p>
      </div>
      <div className="border-b py-6">
        <p className="text-[24px] mb-6">기본 규칙</p>
        <p>
          훌륭한 게스트가 되기 위한 몇 가지 간단한 규칙을 지켜주실 것을 모든
          게스트에게 당부드리고 있습니다.
        </p>
        <div className="mt-4">
          <p>・ 숙소 이용규칙을 준수하세요.</p>
          <p>・ 호스트의 집도 자신의 집처럼 아껴주세요.</p>
        </div>
      </div>
      <div className="border-b py-6">
        <div className="flex items-center">
          <TimerIcon />
          <p className="ml-6">
            호스트가 24시간 이내 예약 요청을 수락하기 전까지는 예약이 아직
            확정된 것이 아닙니다. 예약 확정 전까지는 요금이 청구되지 않습니다.
          </p>
        </div>
      </div>
      <div className="py-6">
        <p className="text-[12px]">
          아래 버튼을 선택하면 호스트가 설정한 숙소 이용규칙, 게스트에게
          적용되는 기본 규칙, 에어비앤비 재예약 및 환불 정책에 동의하며, 피해에
          대한 책임이 본인에게 있을 경우 미니비앤비가 결제 수단으로 청구의
          조치를 취할 수 있다는 사실에 동의하는 것입니다. 호스트가 예약 요청을
          수락하면 표시된 총액이 결제되는 데 동의합니다.
        </p>
      </div>
      <button
        onClick={handleClick}
        className="w-[120px] py-4 bg-[#FF385C] text-white rounded-lg"
      >
        예약 요청
      </button>
    </div>
  );
}
