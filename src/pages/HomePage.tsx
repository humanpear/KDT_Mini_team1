import { useInfiniteQuery } from "@tanstack/react-query";
import { getAccommodations } from "../util/http";
import AccommodationCard from "../components/homepage/AccommodationCard";
import FilterCategory from "../components/homepage/FilterCategory";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { AccommodationInfo } from "../types/AccommodationInfo";

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
	const { ref, inView } = useInView();

	const {
		data: accommodation,
		status,
		error,
		fetchNextPage,
		isFetchingNextPage,
		hasNextPage,
	} = useInfiniteQuery({
		queryKey: ["accommodation"],
		queryFn: getAccommodations,
		initialPageParam: 1,
		getNextPageParam: (lastPage, allPage) => {
			const nextPage = lastPage.length ? allPage.length + 1 : undefined;
			return nextPage;
		},
	});

	useEffect(() => {
		if (inView && hasNextPage) {
			console.log("fire!");

			fetchNextPage();
		}
	}, [inView, hasNextPage, fetchNextPage]);

	if (status === "pending") {
		return <p>Loading...</p>;
	}

	if (status === "error") {
		return <p>Error: {error.message}</p>;
	}

	return (
		<div className="p-4">
			<FilterCategory filters={filters} />
			{accommodation.pages && (
				<ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5 gap-y-4">
					{accommodation?.pages.map(page =>
						page.map((item: AccommodationInfo, index: number) => {
							if (item.length == index + 1) {
								return <AccommodationCard innerRef={ref} key={index} accommodation={item} />;
							}
							return <AccommodationCard key={index} accommodation={item} />;
						}),
					)}
				</ul>
			)}
			{isFetchingNextPage && <h3>Loading...</h3>}
		</div>
	);
}
