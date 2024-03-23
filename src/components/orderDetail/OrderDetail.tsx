import { Link } from "react-router-dom";
import NextIcon from "../../icons/NextIcon";

export default function OrderDetail() {
  return (
    <section className="py-16">
      <div className="text-center mb-12">
        <p className="text-3xl font-bold mb-6">
          예약이 정상적으로 완료되었습니다.
        </p>
        <p>아래의 주문내역을 확인해주세요.</p>
      </div>
      <div className="w-[600px] mx-auto">
        <p className="text-xl">
          [프라이빗 1일1팀]어비계곡 최상류_1만평 청정자연 단독사용/별장전체
          [양평 옥천] 용문산
        </p>
        <div className="flex justify-between items-center py-6 border-b">
          <div>
            <p>체크인</p>
            <p>2024년 3월 19일</p>
          </div>
          <NextIcon />
          <div>
            <p>체크아웃</p>
            <p>2024년 3월 24일</p>
          </div>
        </div>
        <div className="border-b py-6">
          <p className="text-[24px] mb-6">요금 세부정보</p>
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <p>₩700,000 x 5박</p>
              <p>₩3,500,000</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="underline">미니비앤비 서비스 수수료</p>
              <p>₩434,826</p>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center py-6">
          <p>총 합계</p>
          <p>₩3,934,826</p>
        </div>
        <Link to="/mypage">
          <button className="w-full py-4 bg-[#FF385C] text-white rounded-lg">
            마이페이지
          </button>
        </Link>
      </div>
    </section>
  );
}
