import { useQuery } from "@tanstack/react-query";
import PaymentInfo from "../components/payment/PaymentInfo";
import PriceInfo from "../components/payment/PriceInfo";
import { useParams, useSearchParams } from "react-router-dom";
import { getAccommodation } from "../util/http";
import { useEffect } from "react";
import OptionProvider from "../context/OptionProvider";
import LoadingSpinner from "../UI/LoadingSpinner";

export default function PaymentPage() {
  const { id } = useParams();
  const { data: product, isPending } = useQuery({
    queryKey: ["accommodation", id],
    queryFn: () => getAccommodation(id as string),
  });
  const [query] = useSearchParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (isPending) {
    return <LoadingSpinner />;
  }

  if (
    !query.get("check_in") ||
    !query.get("check_out") ||
    !query.get("room") ||
    !query.get("guest")
  ) {
    return <p>예약중인 숙소 정보가 없습니다.</p>;
  }

  return (
    <OptionProvider product={product}>
      <section className="w-full md:w-[1120px] mx-auto mt-16 relative">
        <p className="text-3xl font-bold mb-4 md:mb-12">예약 요청</p>
        <div className="flex flex-col-reverse md:flex-row">
          <PaymentInfo />
          <PriceInfo product={product} />
        </div>
      </section>
    </OptionProvider>
  );
}
