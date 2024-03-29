import { useContext } from "react";
import { AccommodationInfo } from "../../types/accommodationInfo";
import { PaymentContext } from "../../context/PaymentProvider";
import { stayDuration } from "../../util/date";

type Props = {
  accommodation: AccommodationInfo;
};

export default function PriceInfo({ accommodation }: Props) {
  const { title, image1 } = accommodation;
  const { date, room, totalPrice, charge, finalPrice } =
    useContext(PaymentContext);

  return (
    <div className="basis-1/2 flex justify-end">
      <div className="w-[460px] h-min p-6 border rounded-lg sticky top-[200px]">
        <div className="flex border-b pb-6">
          <img
            className="w-[100px] h-[100px] rounded-lg object-cover shrink-0"
            src={image1}
            alt="stay image"
          />
          <div className="ml-4 flex flex-col justify-between">
            <p>{title}</p>
            <p>⭐️ 4.88 (후기 17개)</p>
          </div>
        </div>
        <div className="border-b py-6">
          <p className="text-[24px] mb-6">요금 세부정보</p>
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <p>
                {room}인실 x {stayDuration(date.startDate, date.endDate)}박
              </p>
              <p>{totalPrice.toLocaleString()}원</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="underline">미니비앤비 서비스 수수료</p>
              <p>{charge.toLocaleString()}원</p>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center pt-6">
          <p>총 합계</p>
          <p>{finalPrice.toLocaleString()}원</p>
        </div>
      </div>
    </div>
  );
}
