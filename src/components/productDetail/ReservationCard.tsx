export default function ReservationCard() {
	return (
		<div className="w-4/12">
			<div className=" h-min p-6 border rounded-lg sticky top-[200px]">
				<div className="flex items-center gap-2 mb-4">
					<p className="text-xl font-semibold">₩160,000</p>
					<p className="text-sm text-gray-600">/ 박</p>
				</div>
				<div className="border rounded mb-4">
					<div className="grid grid-cols-2 border-b p-2">
						<div>
							<p>체크인</p>
							<p>2024.03.19</p>
						</div>
						<div>
							<p>체크아웃</p>
							<p>2024.03.24</p>
						</div>
					</div>
					<div className="p-2">
						<p>인원</p>
						<p>게스트 1명</p>
					</div>
				</div>
				<button className="w-full py-2 mb-4 bg-brand text-white rounded hover:brightness-110">예약 하기</button>
				<p className="mb-4">예약 확정 전에는 요금이 청구되지 않습니다.</p>
				<div className="flex justify-between pb-4 border-b">
					<p className="underline">₩160,000 x 5박</p>
					<p>₩800,000</p>
				</div>
				<div className="flex justify-between pt-4">
					<p>총 합계</p>
					<p>₩800,000</p>
				</div>
			</div>
		</div>
	);
}
