import { useQuery } from "@tanstack/react-query";
import { getStaies } from "../util/http";
import AccommodationCard from "../components/homepage/AccommodationCard";
import { AccommodationInfo } from "../types/AccommodationInfo";
import FilterCategory from "../components/homepage/FilterCategory";

const filters = [
	"전체",
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
	// const [filter, setFilter] = useState(filters[0]);
	// const filtered = getFilteredItems(accommodation, filter);

	return (
		<div className="p-4">
			{isLoading && <p>Loading...</p>}
			<FilterCategory filters={filters} />
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

// function getFilteredItems(accommodation, filter) {
// 	if (filter === "전체") {
// 		return accommodation;
// 	} else if (filter == "관광호텔") {
// 		return accommodation.filter(item => item.code === "");
// 	} 
// }
