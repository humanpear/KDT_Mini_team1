import { FormEvent } from "react";
import { login } from "../firebase/firebase";

export default function LoginPage() {
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());

    login(data.email as string, data.password as string);
  }

  return (
    <section className="absolute top-1/2 left-1/2 w-[520px] shadow-basic translate-x-[-50%] translate-y-[-50%] rounded-lg">
      <div className="h-16 font-bold text-center leading-[64px] border-b">
        로그인
      </div>
      <form onSubmit={handleSubmit} className="p-6">
        <p className="text-xl mb-4">미니비앤비에 오신 것을 환영합니다.</p>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col border border-black rounded-lg">
            <input
              type="email"
              className="rounded-t-lg outline-none pl-4 py-3 border-b border-black"
              placeholder="이메일을 입력해주세요"
              name="email"
            />
            <input
              type="password"
              className="rounded-b-lg outline-none pl-4 py-3"
              placeholder="비밀번호를 입력해주세요"
              name="password"
            />
          </div>
          <button className="bg-[#F42C5B] py-3 rounded-lg text-white">
            로그인
          </button>
        </div>
      </form>
    </section>
  );
}
