import { useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getAccommodations } from "../../util/http";
import AccommodationCard from "../homepage/AccommodationCard";
import { AccommodationInfo } from "../../types/AccommodationInfo";
import LoadingSpinner from "../../UI/LoadingSpinner";

type AccommodationListProps = {
  filter: string;
};

export default function AccommodationList({ filter }: AccommodationListProps) {
  const {
    data: accommodation,
    status,
    error,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["accommodation", filter],
    queryFn: ({ pageParam }) =>
      filter === "전체"
        ? getAccommodations(pageParam, null)
        : getAccommodations(pageParam, filter),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPage) => {
      const nextPage = lastPage.length ? allPage.length + 1 : undefined;
      return nextPage;
    },
  });

  useEffect(() => {
    const handleScroll = () => {
      const isAtBottom =
        window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight;

      if (isAtBottom || isFetchingNextPage) {
        return;
      }

      if (hasNextPage) {
        fetchNextPage();
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  if (status === "pending") {
    return <LoadingSpinner />;
  }

  if (status === "error") {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div>
      {accommodation.pages && (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5 gap-y-4">
          {accommodation.pages.map((page) =>
            page.map((item: AccommodationInfo) => (
              <AccommodationCard key={item.id} accommodation={item} />
            ))
          )}
        </ul>
      )}
      {isFetchingNextPage && <LoadingSpinner />}
    </div>
  );
}
