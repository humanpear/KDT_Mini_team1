import { useState } from "react";
import FilterCategory from "../components/homepage/FilterCategory";
import AccommodationList from "../components/homepage/AccommodationList";

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

export const categoryMap: { [key: string]: string } = {
	관광호텔: "B02010100",
	콘도미니엄: "B02010500",
	유스호스텔: "B02010600",
	펜션: "B02010700",
	모텔: "B02010900",
	민박: "B02011000",
	게스트하우스: "B02011100",
	홈스테이: "B02011200",
	서비스드레지던스: "B02011300",
	한옥: "B02011600",
};

const HomePage = () => {
	const [filter, setFilter] = useState(filters[0]);

	const handleFilterChange = (selectedFilter: string) => {
		setFilter(selectedFilter);
	};

	return (
		<div className="p-4">
			<FilterCategory filters={filters} onFilterChange={handleFilterChange} />
			<AccommodationList filter={filter} />
		</div>
	);
};

export default HomePage;
