import { useQuery } from "@tanstack/react-query";
import PaymentInfo from "../components/payment/PaymentInfo";
import PriceInfo from "../components/payment/PriceInfo";
import PrevIcon from "../icons/PrevIcon";
import { getReservation } from "../util/http";

export default function PaymentPage() {
  const { data: selectedAccommodation } = useQuery({
    queryKey: ["reservation"],
    queryFn: getReservation,
  });

  if (!selectedAccommodation) {
    return <p>Loading...</p>;
  }

  return (
    <section className="w-[1120px] mx-auto mt-16 relative">
      <p className="text-3xl font-bold mb-12">예약 요청</p>
      <PrevIcon />
      <div className="flex">
        <PaymentInfo selectedAccommodation={selectedAccommodation} />
        <PriceInfo selectedAccommodation={selectedAccommodation} />
      </div>
    </section>
  );
}
