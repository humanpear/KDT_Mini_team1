import RatingIcon from "../../icons/RatingIcon";
import { FaRegCalendar, FaSwimmingPool, FaBed } from "react-icons/fa";
import { AccommodationInfo } from "../../types/AccommodationInfo";

interface ProductProps {
	accommodationData: AccommodationInfo;
}

export default function ProductInfo({ accommodationData }: ProductProps) {
	const { title, description, address } = accommodationData;

	return (
		<div className="flex flex-col lg:w-6/12 xl:w-8/12">
			<div className="border-b">
				<p className="text-2xl font-semibold">{title}</p>
				<p>최대 인원 4명 &middot; 침실 1개 &middot; 침대 2개 &middot;욕실 1개</p>
				<div className="flex gap-2 pb-6">
					<div className="flex items-center gap-2">
						<RatingIcon />
						<p className="text-xl">4.82</p>
					</div>
					&middot;
					<p className="text-xl underline">후기 110개</p>
				</div>
			</div>

			<div className="border-b">
				<div className="flex gap-6 py-6">
					<FaRegCalendar className="text-2xl" />
					<p>일주일 전까지 무료 취소 가능</p>
				</div>
				<div className="flex gap-6">
					<FaSwimmingPool className="text-2xl" />
					<div>
						<p>다양한 편의시설</p>
						<span>숙박시설에서 제공하는 다양한 편의시설을 사용할 수 있습니다.</span>
					</div>
				</div>
				<div className="flex gap-6 py-6">
					<RatingIcon />
					<div>
						<p>인증된 숙박시설</p>
						<span>한국관광공사에서 직접 인증한 숙박시설로 안심할 수 있습니다.</span>
					</div>
				</div>
			</div>

			<div className="py-6 border-b">
				<p className="text-2xl font-semibold">숙소 소개</p>
				<p className="pt-6">{description}</p>
			</div>

			<div className="py-6 border-b">
				<p className="text-2xl font-semibold pb-6">숙박 장소</p>
				<div className="flex flex-col gap-4 w-[200px] p-6 border rounded-lg">
					<FaBed className="text-2xl" />
					<p>공용 공간</p>
					<p>더블 침대 1개</p>
				</div>
			</div>

			<div className="py-6 border-b">
				<p className="text-2xl font-semibold">숙소 편의시설</p>
				<div className="grid grid-cols-2 py-6">
					<div>
						<p>주방</p>
						<p>건물 내 무료 주차</p>
						<p>TV</p>
						<p>헤어드라이어</p>
						<p>숙소 내 보안 카메라</p>
					</div>
					<div>
						<p>무선 인터넷</p>
						<p>수영장</p>
						<p>에어컨</p>
						<p>냉장고</p>
						<p>일산화탄소 경보기</p>
					</div>
				</div>
				<button className="w-6/12 py-2 mb-4 bg-[#D9D9D9] rounded hover:brightness-110">
					편의시설 19개 모두 보기
				</button>
			</div>

			<div className="py-6 border-b">
				<p className="text-2xl font-semibold">숙소 위치</p>
				<div className="py-6">
					<img
						src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FTXzOu%2FbtsFR8YW19o%2FUqxF3Qof8FGIURzuICTBbK%2Fimg.png"
						alt={address}
					/>
					<p className="pt-6">{address}</p>
				</div>
			</div>
		</div>
	);
}
