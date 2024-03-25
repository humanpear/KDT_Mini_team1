import ShareIcon from "../icons/ShareIcon";
import BookmarkIcon from "../icons/BookmarkIcon";
import ProductImage from "../components/productDetail/ProductImage";
import ProductInfo from "../components/productDetail/ProductInfo";
import ReservationCard from "../components/productDetail/ReservationCard";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getAccommodation } from "../util/http";

export default function ProductDetailPage() {
  const { id } = useParams();

  const { data: accommodation } = useQuery({
    queryKey: ["accommodation", id],
    queryFn: () => getAccommodation(id as string),
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
        <ReservationCard accommodation={accommodation} />
      </div>
    </section>
  );
}
