import { Link } from "react-router-dom";
import { ReservedAccommodation } from "../../types/reservedAccommodation";
import CloseIcon from "../../icons/CloseIcon";
import { useMutation } from "@tanstack/react-query";
import { queryClient, removeCartItem } from "../../util/http";

type Props = {
  cartItem: ReservedAccommodation;
};

export default function CartItem({ cartItem }: Props) {
  const { title, address, startDate, endDate, guest, image1, contentid } =
    cartItem;

  const { mutate } = useMutation({
    mutationFn: removeCartItem,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["carts"],
      });
    },
  });

  function handleClick() {
    mutate(contentid);
  }

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
            {startDate} ~ {endDate} | 2박
          </p>
          <p>인원 : {guest}명</p>
        </div>
      </div>
      <div className="flex justify-end items-center gap-4">
        <p className="text-end font-bold text-lg">50,000원</p>
        <Link
          to={`/payment/${contentid}?check_in=${startDate}&check_out=${endDate}&guest=${guest}`}
          className="bg-[#FF385C] text-white py-1 px-2 rounded-lg"
        >
          예약
        </Link>
      </div>
      <CloseIcon
        className="absolute top-6 right-6 text-2xl cursor-pointer"
        onClick={handleClick}
      />
    </li>
  );
}
