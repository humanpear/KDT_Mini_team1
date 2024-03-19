export default function MyPage() {
  return (
  <section className="absolute top-1/2 left-1/2 w-[520px] shadow-basic translate-x-[-50%] translate-y-[-50%] rounded-lg">
  <div className="h-16 font-bold text-center leading-[64px]">
    마이페이지
    </div>
  <div className="p-6 flex flex-col border-t">
  <div className="pb-6 flex flex-row items-center ">
    <p>pibmaru@naver.com</p>
    {/* 이메일 받아서 표시 */}
    <button className="ml-auto border rounded-lg px-3 py-1">회원정보 수정</button>
  
  </div>
  <button className="bg-[#F42C5B] py-3 rounded-lg text-white">
            예약내역 확인
          </button>
          </div>
</section>
  );
}

// 이미지 이름 연락처 이메일 패스워드
// 
// 회원정보/수정 / 예약내역