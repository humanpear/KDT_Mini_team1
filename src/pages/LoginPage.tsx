import { FormEvent, useState } from "react";
import { PulseLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { login } from "../util/auth";
import { useUserStore } from "../store/user";

export default function LoginPage() {
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { setLoginUser } = useUserStore();

  const navigate = useNavigate();

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setErrorMessage("");
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());

    const emailPattern = /^[A-Za-z0-9]+@[A-Za-z0-9]+\.[A-Za-z]+/;
    const passwordPattern = /^[A-Za-z0-9]+$/;

    if (!data.email) {
      setErrorMessage("이메일을 입력해주세요.");
      return;
    }

    if (!emailPattern.test(data.email as string)) {
      setErrorMessage("이메일의 형식이 올바르지 않습니다.");
      return;
    }

    if (!data.password) {
      setErrorMessage("비밀번호를 입력해주세요.");
      return;
    }

    if (!passwordPattern.test(data.password as string)) {
      setErrorMessage("비밀번호의 형식이 올바르지 않습니다.");
      return;
    }

    login(
      data.email as string,
      data.password as string,
      navigate,
      setIsLoading,
      setLoginUser
    );
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
          {errorMessage && (
            <p className="bg-red-300 text-red-400 text-center rounded-lg p-1">
              {errorMessage}
            </p>
          )}
          <button
            className="bg-[#F42C5B] py-3 rounded-lg text-white"
            disabled={isLoading}
          >
            {isLoading ? (
              <PulseLoader className="translate-y-[4px]" color="white" />
            ) : (
              "로그인"
            )}
          </button>
        </div>
      </form>
    </section>
  );
}
