import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useState } from "react";

type FiltersArray = {
	filters: string[];
	onFilterChange: (filter: string) => void;
};

const btnCustom = "p-2 rounded-full bg-gray-100 hover:brightness-90 absolute top-1/2 transform -translate-y-1/2";

export default function FilterCategory({ filters, onFilterChange }: FiltersArray) {
	const [swiper, setSwiper] = useState<SwiperClass>();
	const [activeFilter, setActiveFilter] = useState<string | null>(filters[0]);

	const handlePrev = () => {
		swiper?.slidePrev();
	};
	const handleNext = () => {
		swiper?.slideNext();
	};

	const handleClickFilter = (filter: string) => {
		onFilterChange(filter);
		setActiveFilter(filter);
	};

	return (
		<div className="relative">
			<Swiper
				modules={[Navigation]}
				navigation
				slidesPerView={1}
				spaceBetween={10}
				onSwiper={e => {
					setSwiper(e);
				}}
				updateOnWindowResize={true}
				breakpoints={{
					414: {
						slidesPerView: 2,
					},
					768: {
						slidesPerView: 3,
					},
					1024: {
						slidesPerView: 4,
					},
					1366: {
						slidesPerView: 6,
					},
				}}
				className="md:w-8/12 gap-4 mb-4">
				{filters.map((filter, index) => (
					<SwiperSlide key={index} className="flex justify-center">
						<button
							onClick={() => handleClickFilter(filter)}
							className={`w-[150px] font-semibold p-2 rounded-full ${
								activeFilter === filter ? "bg-brand text-white" : "bg-gray-100 text-black"
							}`}>
							{filter}
						</button>
					</SwiperSlide>
				))}
			</Swiper>
			<div className="hidden md:block">
				<button onClick={handlePrev} className={`${btnCustom} left-2`}>
					<FaArrowLeft />
				</button>
				<button onClick={handleNext} className={`${btnCustom} right-2`}>
					<FaArrowRight />
				</button>
			</div>
		</div>
	);
}
