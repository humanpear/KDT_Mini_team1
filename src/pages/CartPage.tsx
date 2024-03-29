import { useQuery } from "@tanstack/react-query";
import { getCarts } from "../util/http";
import CartNoItem from "../components/cart/CartNoItem";
import CartItem from "../components/cart/CartItem";

export default function CartPage() {
  const { data: cartItems, isLoading } = useQuery({
    queryKey: ["carts"],
    queryFn: getCarts,
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  console.log(cartItems);

  return (
    <section className="w-[800px] mx-auto py-16">
      {/* <p className="text-2xl font-bold text-center mb-4">장바구니</p>
      {cartItems.length === 0 && <CartNoItem />}
      <ul className="flex flex-col gap-4">
        {cartItems.length > 0 &&
          cartItems.map((cartItem) => (
            <CartItem key={cartItem.contentid} cartItem={cartItem} />
          ))}
      </ul> */}
    </section>
  );
}
