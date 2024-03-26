import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { IoCartOutline } from "react-icons/io5";
import { AccommodationInfo } from "../../types/AccommodationInfo";
import { ChangeEvent, useEffect, useState } from "react";

type Props = {
  accommodation: AccommodationInfo;
};

export default function ReservationCard({ accommodation }: Props) {
  const navigate = useNavigate();
  const { id } = useParams();

  const [query, setQuery] = useSearchParams();
  const [paymentInfo, setPaymentInfo] = useState({
    startDate: query.get("check_in") || "",
    endDate: query.get("check_out") || "",
    guest: query.get("guest") || "",
  });

  useEffect(() => {
    setQuery({
      check_in: paymentInfo.startDate,
      check_out: paymentInfo.endDate,
      guest: paymentInfo.guest,
    });
  }, [paymentInfo, setQuery]);

  function handleChange(event: ChangeEvent<HTMLInputElement>, type: string) {
    setPaymentInfo((prevInfo) => ({
      ...prevInfo,
      [type]: event.target.value,
    }));
  }

  function handleClick(value: number) {
    setPaymentInfo((prevInfo) => ({
      ...prevInfo,
      guest: (+prevInfo.guest + value).toString(),
    }));
  }

  async function handleCart() {
    await fetch("/api/carts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...accommodation }),
    });
    navigate(`/cart`);
  }

  return (
    <div className="w-4/12">
      <div className=" h-min p-6 border rounded-lg sticky top-[200px]">
        <div className="flex items-center gap-2 mb-4">
          <p className="text-xl font-semibold">₩160,000</p>
          <p className="text-sm text-gray-600">/ 박</p>
        </div>
        <div className="border rounded mb-4">
          <div className="grid grid-cols-2 border-b p-2">
            <div>
              <input
                type="date"
                onChange={(event) => handleChange(event, "startDate")}
              />
              <p>체크인</p>
              <p>{paymentInfo.startDate}</p>
            </div>
            <div>
              <input
                type="date"
                onChange={(event) => handleChange(event, "endDate")}
              />
              <p>체크아웃</p>
              <p>{paymentInfo.endDate}</p>
            </div>
          </div>
          <div className="p-2">
            <p>인원</p>
            <p>게스트 {paymentInfo.guest}명</p>
            <button onClick={() => handleClick(1)}>+</button>
            <button onClick={() => handleClick(-1)}>-</button>
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
                `/payment/${id}?check_in=${paymentInfo.startDate}&check_out=${paymentInfo.endDate}&guest=${paymentInfo.guest}`
              )
            }
            className="w-8/12 py-2  bg-brand text-white rounded hover:brightness-110"
          >
            예약 하기
          </button>
        </div>
        <p className="mb-4">예약 확정 전에는 요금이 청구되지 않습니다.</p>
        <div className="flex justify-between pb-4 border-b">
          <p className="underline">₩160,000 x 5박</p>
          <p>₩800,000</p>
        </div>
        <div className="flex justify-between pt-4">
          <p>총 합계</p>
          <p>₩800,000</p>
        </div>
      </div>
    </div>
  );
}
