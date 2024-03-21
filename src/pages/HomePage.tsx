import { useQuery } from "@tanstack/react-query";
import { getStaies } from "../util/http";
import AccommodationCard from "../components/homepage/AccommodationCard";
import { AccommodationInfo } from "../types/AccommodationInfo";

const filters = [
	"관광호텔",
	"콘도미니엄",
	"유스호스텔",
	"펜션",
	"모텔",
	"민박",
	"게스트하우스",
	"홈스테이",
	"서비스드레지던스",
	"한옥",
];

export default function HomePage() {
	const { isLoading, data: accommodation } = useQuery<AccommodationInfo[]>({
		queryKey: ["accommodation"],
		queryFn: getStaies,
	});

	return (
		<div className="p-4">
			{isLoading && <p>Loading...</p>}
			<div className="flex justify-center flex-wrap gap-4">
				{filters.map(filter => (
					<p className="text-lg font-semibold p-4">{filter}</p>
				))}
			</div>
			{accommodation && (
				<ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5 gap-y-4">
					{accommodation.map(item => (
						<AccommodationCard key={item.contentid} accommodation={item} />
					))}
				</ul>
			)}
		</div>
	);
}