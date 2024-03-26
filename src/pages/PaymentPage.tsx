import { useQuery } from "@tanstack/react-query";
import PaymentInfo from "../components/payment/PaymentInfo";
import PriceInfo from "../components/payment/PriceInfo";
import PrevIcon from "../icons/PrevIcon";
import { useParams } from "react-router-dom";
import { getAccommodation } from "../util/http";

export default function PaymentPage() {
  const { id } = useParams();
  const { data: accommodation, isLoading } = useQuery({
    queryKey: ["accommodation", id],
    queryFn: () => getAccommodation(id as string),
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <section className="w-[1120px] mx-auto mt-16 relative">
      <p className="text-3xl font-bold mb-12">예약 요청</p>
      <PrevIcon />
      <div className="flex">
        <PaymentInfo accommodation={accommodation} />
        <PriceInfo accommodation={accommodation} />
      </div>
    </section>
  );
}
