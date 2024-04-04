import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import ImageUpload from "../components/signup/ImageUpload";
import { PulseLoader } from "react-spinners";
import { signup } from "../util/auth";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export default function SignupPage() {
  const [file, setFile] = useState<File>();
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: signup,
  });

  useEffect(() => {
    if (isError) {
      setErrorMessage(error.message);
    }
  }, [isError, error]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const files = e.target.files;
    if (files && files[0]) {
      setFile(files[0]);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setErrorMessage("");
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());

    const namePattern = /^[A-Za-zㄱ-힣]+$/;
    const emailPattern = /^[A-Za-z0-9]+@[A-Za-z0-9]+\.[A-Za-z]+/;
    const passwordPattern = /^[A-Za-z0-9]+$/;

    if (!data.name) {
      setErrorMessage("이름을 입력해주세요.");
      return;
    }

    if (!namePattern.test(data.name as string)) {
      setErrorMessage("이름의 형식이 올바르지 않습니다.");
      return;
    }

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

    if (!data["password-check"]) {
      setErrorMessage("비밀번호 확인을 입력해주세요.");
      return;
    }

    if (data.password !== data["password-check"]) {
      setErrorMessage("비밀번호 확인이 잘못되었습니다.");
      return;
    }

    const signupData = {
      username: data.email as string,
      password: data.password as string,
      name: data.name as string,
      profile_image:
        "https://github.com/humanpear/KDT_Mini_team1/assets/102540636/54738902-5dfd-4cc9-8da4-68bff10df040",
    };

    mutate({ signupData, navigate });
  };

  return (
    <section className="w-11/12 max-w-[520px] shadow-basic rounded-lg mx-auto mt-16 mb-8">
      <div className="h-16 font-bold text-center leading-[64px] border-b">
        회원가입
      </div>
      <div className="p-6">
        <p className="text-xl mb-4">미니비앤비에 오신 것을 환영합니다.</p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <ImageUpload handleChange={handleChange} file={file} />
          <div>
            <p>이름</p>
            <input
              className="rounded-lg outline-none pl-4 py-3 border border-black w-full"
              placeholder="이름을 입력해주세요"
              name="name"
            />
          </div>
          <div>
            <p>이메일</p>
            <input
              type="email"
              className="rounded-lg outline-none pl-4 py-3 border border-black w-full"
              placeholder="이메일을 입력해주세요"
              name="email"
            />
          </div>
          <div>
            <p>비밀번호</p>
            <input
              type="password"
              className="rounded-lg outline-none pl-4 py-3 border border-black w-full"
              placeholder="비밀번호를 입력해주세요"
              name="password"
            />
          </div>
          <div>
            <p>비밀번호 확인</p>
            <input
              type="password"
              className="rounded-lg outline-none pl-4 py-3 border border-black w-full"
              placeholder="비밀번호를 한번 더 입력해주세요"
              name="password-check"
            />
          </div>
          {errorMessage && (
            <p className="bg-red-300 text-red-400 text-center rounded-lg p-1">
              {errorMessage}
            </p>
          )}
          <button
            className="bg-[#F42C5B] py-3 rounded-lg text-white"
            disabled={isPending}
          >
            {isPending ? (
              <PulseLoader className="translate-y-[4px]" color="white" />
            ) : (
              "회원가입"
            )}
          </button>
        </form>
      </div>
    </section>
  );
}
