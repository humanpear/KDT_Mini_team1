import { useQuery } from "@tanstack/react-query";
import ProductImage from "../components/productDetail/ProductImage";
import ProductInfo from "../components/productDetail/ProductInfo";
import ReservationCard from "../components/productDetail/ReservationCard";
import { getAccommodation } from "../util/http";
import { useParams } from "react-router-dom";

export default function ProductDetailPage() {
  const { id } = useParams();

  const { data: accommodation } = useQuery({
    queryKey: ["accommodation", id],
    queryFn: () => getAccommodation(id as string),
  });
	const { id } = useParams();
	const { data } = useQuery({
		queryKey: ["product"],
		queryFn: () => getAccommodation(`${id}`),
	});

  return (
    <section className="w-[1120px] mx-auto relative p-4">
      <div className="flex justify-between mb-2">
        <p className="text-2xl font-semibold">상세페이지</p>
        <div className="flex gap-4">
          <ShareIcon />
          <BookmarkIcon />
        </div>
      </div>
      <ProductImage />
      <div className="flex gap-20 mt-10">
        <ProductInfo />
        <ReservationCard />
      </div>
    </section>
  );
}
