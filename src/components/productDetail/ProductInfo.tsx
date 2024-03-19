import RatingIcon from "../../icons/RatingIcon";
import { FaRegCalendar, FaSwimmingPool, FaBed } from "react-icons/fa";

export default function ProductInfo() {
	return (
		<div className="w-8/12 flex flex-col">
			<div className="border-b">
				<p className="text-2xl font-semibold">경주, 한옥호텔춘추관펜션</p>
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

			<div className="flex gap-6 py-6 border-b">
				<img
					className="w-[40px] h-[40px] rounded-full"
					src="https://a0.muscache.com/im/pictures/user/bf1c26fa-0759-4d96-88a6-ab71b2aa6278.jpg?im_w=240"
					alt="host"
				/>
				<div>
					<p>호스트: Onda 님</p>
					<p className="text-sm">호스팅 경력 4년</p>
				</div>
			</div>

			<div className="border-b">
				<div className="flex gap-6 py-6">
					<FaRegCalendar className="text-2xl" />
					<p>3월 30일 전까지 무료 취소 가능</p>
				</div>
				<div className="flex gap-6">
					<FaSwimmingPool className="text-2xl" />
					<div>
						<p>마음껏 물놀이를 즐기세요</p>
						<span>해당 지역에서 수영장을 갖춘 몇 안 되는 숙소 중 하나입니다.</span>
					</div>
				</div>
				<div className="flex gap-6 py-6">
					<RatingIcon />
					<div>
						<p>경험이 풍부한 호스트</p>
						<span>Onda님은 다른 숙소에 대해 1487개의 후기가 있습니다.</span>
					</div>
				</div>
			</div>

			<div className="border-b">
				<p className="pt-6">
					안녕하세요. 저희는 다양한 휴식 공간을 연구하고 제공하는 Onda입니다. 이 곳에서 머무르실 모든 분들께서
					편안하고 행복한 시간을 보내시길 바랍니다.
					<br />
					[숙소 소개] 배산임수의 아늑함과 편안함을 누리며 자연과 하나 되어 자유를 만끽할 수 있는 새로운 휴식 문화
					공간의 숙소입니다....
				</p>
				<button className="underline py-6">더 보기</button>
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
						alt=""
					/>
					<p className="pt-6">경상북도 경주시 대경로 4821-5</p>
				</div>
			</div>
		</div>
	);
}
