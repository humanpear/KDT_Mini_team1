import { useQuery } from "@tanstack/react-query";
import { getCarts } from "../util/http";
import CartNoItem from "../components/cart/CartNoItem";

export default function CartPage() {
  const { data: cartItems, isLoading } = useQuery({
    queryKey: ["carts"],
    queryFn: getCarts,
  });

  console.log(cartItems);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <section className="w-[1120px] mx-auto mt-16">
      <p className="text-2xl font-bold text-center mb-4">장바구니</p>
      {cartItems.length === 0 && <CartNoItem />}
      <ul>
        {cartItems.map((cartItem) => (
          <li key={cartItem.contentid}>
            <p>{cartItem.title}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
