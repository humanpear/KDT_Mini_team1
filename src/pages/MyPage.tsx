export default function MyPage() {
  function handleClick() {
    window.location.replace ("/order/:id")
  }

  return (
  <section className="absolute top-1/2 left-1/2 w-[520px] shadow-basic translate-x-[-50%] translate-y-[-50%] rounded-lg">
  <div className="h-16 font-bold text-center leading-[64px]">
    마이페이지
    </div>
  <div className="p-6 flex flex-col border-t">
  <div className="pb-6 flex flex-row items-center ">
    <img className="rounded-full w-32" src="https://this-person-does-not-exist.com/img/avatar-genb7923dc1293dbdb2a2be691c4f5b3445.jpg" />
    {/* <div className="flex flex-col pl-4 text-slate-500">
    <p className="mb-2">이름</p>
    <p className="mb-2">이메일</p>
    <p className="mb-2">비밀번호</p>
    <p className="mb-2">휴대폰번호</p>
    </div>
    <div className="flex flex-col pl-4">
    <p className="mb-2">박인배</p>
    <p className="mb-2">pibmaru@naver.com</p>
    <p className="mb-2">●●●●●●●●</p>
    <p className="mb-2">01041553356</p> */}
    {/* 이메일 받아서 표시 */}
    {/* <button className="border rounded-lg px-3 py-1 mt-3">회원정보 수정</button> */}
    {/* </div>
    <div className="flex flex-col pl-4 text-xs text-blue-500">
    <p className="mb-2">수정하기</p>
    <p className="mb-2">수정하기</p>
    <p className="mb-2">수정하기</p>
    <p className="mb-2">수정하기</p>
    </div> */}
    <div className="flex flex-col pl-4 text-slate-500">
    <p className="mb-2">이름</p>
    <p className="mb-2">이메일</p>
    <p className="mb-2">비밀번호</p>
    <p className="mb-2">휴대폰번호</p>
    </div>
    <div className="flex flex-col pl-4">
    <p className="mb-2">박인배</p>
    <p className="mb-2">pibmaru@naver.com</p>
    <p className="mb-2">●●●●●●●●</p>
    <p className="mb-2">01041553356</p> */}
    {/* 이메일 받아서 표시 */}
    {/* <button className="border rounded-lg px-3 py-1 mt-3">회원정보 수정</button> */}
    </div>
    <div className="flex flex-col pl-4 text-xs text-blue-500">
    <p className="mb-2">수정하기</p>
    <p className="mb-2">수정하기</p>
    <p className="mb-2">수정하기</p>
    <p className="mb-2">수정하기</p>
    </div>
  </div>
  <button className="bg-[#F42C5B] py-3 rounded-lg text-white" onClick={handleClick}>
            예약내역 확인
          </button>
          </div>
</section>
  );
}

// 이미지 이름 연락처 이메일 패스워드
// 수정 버튼 누르면 비밀번호 입력 후 이동
// 회원정보/수정 / 예약내역