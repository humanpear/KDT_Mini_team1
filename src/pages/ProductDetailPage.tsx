import { useQuery } from "@tanstack/react-query";
import ProductImage from "../components/productDetail/ProductImage";
import ProductInfo from "../components/productDetail/ProductInfo";
import ReservationCard from "../components/productDetail/ReservationCard";
import { getAccommodation } from "../util/http";
import { useParams } from "react-router-dom";

export default function ProductDetailPage() {
	const { id } = useParams();
	const { data } = useQuery({
		queryKey: ["product"],
		queryFn: () => getAccommodation(`${id}`),
	});

	return (
		<section className="w-[1120px] mx-auto relative p-4">
			<ProductImage data={data} />
			<div className="flex gap-20 mt-10">
				<ProductInfo data={data} />
				<ReservationCard />
			</div>
		</section>
	);
}
