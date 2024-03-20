import { ChangeEvent, FormEvent, useState } from "react";
import ImageUpload from "../components/signup/ImageUpload";
import { signup } from "../firebase/firebase";
import { SignUpData } from "../types/user";

export default function SignupPage() {
  const [file, setFile] = useState<File>();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const files = e.target.files;
    if (files && files[0]) {
      setFile(files[0]);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());

    signup(data as SignUpData);
  };

  return (
    <section className="w-[520px] shadow-basic rounded-lg mx-auto mt-16">
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
          <button className="bg-[#F42C5B] py-3 rounded-lg text-white">
            회원가입
          </button>
        </form>
      </div>
    </section>
  );
}
