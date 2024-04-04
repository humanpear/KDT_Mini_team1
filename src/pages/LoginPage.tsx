import { FormEvent, useEffect, useState } from "react";
import { PulseLoader } from "react-spinners";
import { login } from "../util/auth";
import { useMutation } from "@tanstack/react-query";
import { Link } from "react-router-dom";

export default function LoginPage() {
  const [errorMessage, setErrorMessage] = useState("");
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: login,
  });

  useEffect(() => {
    if (isError) {
      setErrorMessage(error.message);
    }
  }, [isError, error]);

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

    mutate({
      email: data.email as string,
      password: data.password as string,
    });
  }

  return (
    <section className="absolute top-1/2 left-1/2 w-11/12 max-w-[520px] shadow-basic translate-x-[-50%] translate-y-[-50%] rounded-lg">
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
          {!errorMessage && (
            <Link
              to="/signup"
              className="text-gray-300 text-center hover:underline"
            >
              혹시 아직 회원이 아니신가요 ?
            </Link>
          )}
          <button
            className="bg-[#F42C5B] py-3 rounded-lg text-white"
            disabled={isPending}
          >
            {isPending ? (
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
