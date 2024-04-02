import { useQuery } from "@tanstack/react-query";
import ProductImage from "../components/productDetail/ProductImage";
import ProductInfo from "../components/productDetail/ProductInfo";
import { getAccommodation } from "../util/http";
import { useParams } from "react-router-dom";
import OptionProvider from "../context/OptionProvider";
import ReservationCard from "../components/productDetail/ReservationCard";
import LoadingSpinner from '../UI/LoadingSpinner';

export default function ProductDetailPage() {
  const { id } = useParams();
  const { data: accommodationData, isLoading } = useQuery({
    queryKey: ["accommodation", id],
    queryFn: () => getAccommodation(id as string),
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <OptionProvider product={accommodationData}>
      <section className="w-[1120px] mx-auto relative p-4">
        <ProductImage accommodationData={accommodationData} />
        <div className="flex gap-20 mt-10">
          <ProductInfo accommodationData={accommodationData} />
          <ReservationCard accommodationData={accommodationData} />
        </div>
      </section>
    </OptionProvider>
  );
}
