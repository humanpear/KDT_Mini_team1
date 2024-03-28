import { useQuery } from "@tanstack/react-query";
import ProductImage from "../components/productDetail/ProductImage";
import ProductInfo from "../components/productDetail/ProductInfo";
import ReservationCard from "../components/productDetail/ReservationCard";
import { getAccommodation } from "../util/http";
import { useParams } from "react-router-dom";
import { useToggle } from '../hooks/useToggle';

export default function ProductDetailPage() {
	const { id } = useParams();
	const { data: accommodation, isLoading } = useQuery({
		queryKey: ["accommodation", id],
		queryFn: () => getAccommodation(id as string),
	});

	if (isLoading) {
		return <p>Loading...</p>;
	}

	return (
		<section className="w-[1120px] mx-auto relative p-4">
			<ProductImage accommodation={accommodation} />
			<div className="flex gap-20 mt-10">
				<ProductInfo accommodation={accommodation} />
				<ReservationCard accommodation={accommodation} />
			</div>
		</section>
	);
}
