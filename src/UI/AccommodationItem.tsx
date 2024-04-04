import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { queryClient, removeCartItem } from "../util/http";
import {
  AccommodationWithOption,
  CartItemWithOption,
} from "../types/AccommodationInfo";
import { getStayDuration } from "../util/date";
import CloseIcon from "../icons/CloseIcon";
import { useUserStore } from "../store/user";

type Props = {
  item: AccommodationWithOption | CartItemWithOption;
  type: string;
};

export default function AccommodationItem({ item, type }: Props) {
  const member_id = useUserStore((state) => state.loginUser?.member_id);
  const { title, address, image1, id } = item.accommodation;
  const {
    start_date,
    end_date,
    total_price,
    capacity: guest,
    max_capacity: room,
    id: option_id,
  } = item.option!;

  const { mutate } = useMutation({
    mutationFn: removeCartItem,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["carts", member_id],
      });
    },
  });

  function handleClick() {
    mutate(option_id);
  }

  return (
    <li className="shadow-basic p-3 md:p-6 rounded-md relative">
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
        <div className="pl-4 text-[14px] md:text-[16px]">
          <p>
            {start_date} ~ {end_date} |{" "}
            {getStayDuration(new Date(start_date), new Date(end_date))}박
          </p>
          <p>인원 : {guest}명</p>
          <p>객실 : {room}인실</p>
        </div>
      </div>
      <div className="flex justify-end items-center gap-4">
        <p className="text-end font-bold text-lg">
          {total_price.toLocaleString()}원
        </p>
        {type === "cart" && (
          <Link
            to={`/payment/${id}?check_in=${start_date}&check_out=${end_date}&guest=${guest}&room=${room}&cartid=${option_id}`}
            className="bg-brand text-white py-1 px-2 rounded-lg"
          >
            예약
          </Link>
        )}
        {type === "reservation" && (
          <Link
            to={`/payment/${option_id}/complete`}
            className="bg-brand text-white py-1 px-2 rounded-lg"
          >
            상세
          </Link>
        )}
      </div>
      {type === "cart" && (
        <CloseIcon
          className="absolute top-6 right-6 text-2xl cursor-pointer"
          onClick={handleClick}
        />
      )}
    </li>
  );
}
