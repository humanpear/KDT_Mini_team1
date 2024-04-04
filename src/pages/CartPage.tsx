import { useQuery } from "@tanstack/react-query";
import { getCarts } from "../util/http";
import CartNoItem from "../components/cart/CartNoItem";
import AccommodationItem from "../UI/AccommodationItem";
import { CartItemWithOption } from "../types/AccommodationInfo";
import { useUserStore } from "../store/user";
import LoadingSpinner from "../UI/LoadingSpinner";

export default function CartPage() {
  const member_id = useUserStore((state) => state.loginUser?.member_id);
  const { data, isPending } = useQuery({
    queryKey: ["carts", member_id],
    queryFn: getCarts,
  });

  const cartItems = data?.body.map((cartItem: CartItemWithOption) => {
    const newCartItem = {
      ...cartItem,
      option: {
        ...cartItem.cart,
      },
    };
    delete newCartItem.cart;

    return newCartItem;
  });

  return (
    <section className="w-full max-w-[800px] mx-auto py-16">
      <p className="text-2xl font-bold text-center mb-4">장바구니</p>
      {isPending && <LoadingSpinner />}
      {!isPending && cartItems.length === 0 && <CartNoItem />}
      <ul className="flex flex-col gap-4">
        {!isPending &&
          cartItems.length > 0 &&
          cartItems.map((cartItem: CartItemWithOption) => (
            <AccommodationItem
              key={cartItem.option!.id}
              item={cartItem}
              type="cart"
            />
          ))}
      </ul>
    </section>
  );
}
