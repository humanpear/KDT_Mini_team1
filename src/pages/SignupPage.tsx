export default function SignupPage() {
  return (
    <section className="absolute top-1/2 left-1/2 w-[520px] shadow-basic translate-x-[-50%] translate-y-[-50%] rounded-lg">
      <div className="h-16 font-bold text-center leading-[64px] border-b">
        회원가입
      </div>
      <div className="p-6">
        <p className="text-xl mb-4">미니비앤비에 오신 것을 환영합니다.</p>
        <div className="flex flex-col gap-4">
          <div>
            <p>이메일</p>
            <input
              type="email"
              className="rounded-lg outline-none pl-4 py-3 border border-black w-full"
              placeholder="이메일을 입력해주세요"
            />
          </div>
          <div>
            <p>비밀번호</p>
            <input
              type="password"
              className="rounded-lg outline-none pl-4 py-3 border border-black w-full"
              placeholder="비밀번호를 입력해주세요"
            />
          </div>
          <div>
            <p>비밀번호 확인</p>
            <input
              type="password"
              className="rounded-lg outline-none pl-4 py-3 border border-black w-full"
              placeholder="비밀번호를 한번 더 입력해주세요"
            />
          </div>
          <button className="bg-[#F42C5B] py-3 rounded-lg text-white">
            회원가입
          </button>
        </div>
      </div>
    </section>
  );
}
