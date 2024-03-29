import { useInfiniteQuery } from "@tanstack/react-query";
import { getAccommodations } from "../util/http";
import AccommodationCard from "../components/homepage/AccommodationCard";
import FilterCategory from "../components/homepage/FilterCategory";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
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

const categoryMap: { [key: string]: string } = {
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

export default function HomePage() {
  const [filter, setFilter] = useState(filters[0]);
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
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  if (status === "pending") {
    return <p>Loading...</p>;
  }

  if (status === "error") {
    return <p>Error: {error.message}</p>;
  }

  const handleFilterChange = (selectedFilter: string) => {
    setFilter(selectedFilter);
  };

  const filteredAccommodations = getFilteredItems(accommodation.pages, filter);

  return (
    <div className="p-4">
      <FilterCategory filters={filters} onFilterChange={handleFilterChange} />
      {filteredAccommodations && (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5 gap-y-4">
          {filteredAccommodations.map((page) =>
            page.map((item: AccommodationInfo, index: number) => {
              if (item.length == index + 1) {
                return (
                  <AccommodationCard
                    innerRef={ref}
                    key={item.contentid}
                    accommodation={item}
                  />
                );
              }
              return (
                <AccommodationCard key={item.contentid} accommodation={item} />
              );
            })
          )}
        </ul>
      )}
      {isFetchingNextPage && <h3>Loading...</h3>}
    </div>
  );
}

function getFilteredItems(
  accommodation: AccommodationInfo[][],
  filter: string
) {
  if (filter === "전체") {
    return accommodation;
  } else {
    const categoryCode = categoryMap[filter];
    return accommodation.map((item) =>
      item.filter((it) => it.category === categoryCode)
    );
  }
}