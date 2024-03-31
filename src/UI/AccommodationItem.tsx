import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { queryClient, removeCartItem } from "../util/http";
import { AccommodationWithOption } from "../types/AccommodationInfo";
import { getStayDuration } from "../util/date";

type Props = {
  item: AccommodationWithOption;
  type: string;
};

export default function AccommodationItem({ item }: Props) {
  const { title, address, image1 } = item.accommodation;
  const { start_date, end_date, total_price } = item.reservation;

  // const { mutate } = useMutation({
  //   mutationFn: removeCartItem,
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({
  //       queryKey: ["carts"],
  //     });
  //   },
  // });

  // function handleClick() {
  //   mutate(contentid);
  // }

  return (
    <li className="shadow-basic p-6 rounded-md relative">
      <div className="border-b pb-4">
        <p>{title}</p>
        <p className="text-[13px] text-stone-400">{address}</p>
      </div>
      <div className="flex pt-4">
        <img
          src={image1}
          alt={`${title} 숙소 이미지`}
          className="w-[100px] h-[100px] object-cover rounded-lg"
        />
        <div className="pl-4">
          <p>
            {start_date} ~ {end_date} |{" "}
            {getStayDuration(new Date(start_date), new Date(end_date))}박
          </p>
          {/* <p>인원 : {guest}명</p> */}
        </div>
      </div>
      <div className="flex justify-end items-center gap-4">
        <p className="text-end font-bold text-lg">
          {total_price.toLocaleString()}원
        </p>
        {/* <Link
          to={`/payment/${contentid}?check_in=${start_date}&check_out=${end_date}&guest=${guest}&room=${room}`}
          className="bg-brand text-white py-1 px-2 rounded-lg"
        >
          예약
        </Link> */}
      </div>
      {/* <CloseIcon
        className="absolute top-6 right-6 text-2xl cursor-pointer"
        onClick={handleClick}
      /> */}
    </li>
  );
}
