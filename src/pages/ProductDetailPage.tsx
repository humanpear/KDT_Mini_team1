import ShareIcon from "../icons/ShareIcon";
import BookmarkIcon from "../icons/BookmarkIcon";
import ProductImage from "../components/productDetail/ProductImage";
import ProductInfo from "../components/productDetail/ProductInfo";
import ReservationCard from "../components/productDetail/ReservationCard";

export default function ProductDetailPage() {

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
