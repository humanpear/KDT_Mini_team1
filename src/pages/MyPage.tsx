import { useState, useRef } from "react";
import { useUserStore } from "../store/user";
import UserIcon from "../icons/UserIcon";

export default function MyPage() {
  const divRef = useRef(null);

  //이름
  const [editModeName, setEditModeName] = useState(false);
  const changeToEditModeName = () => {
    setEditModeName(true);
    setEditModePw(false);
  };
  const changeToReadModeName = () => {
    setEditModeName(false);
  };

  //비밀번호
  const [editModePw, setEditModePw] = useState(false);
  const changeToEditModePw = () => {
    setEditModePw(true);
    setEditModeName(false);
    adjustDivHeight();
  };
  const changeToReadModePw = () => {
    setEditModePw(false);
    adjustDivHeight();
  };

  const adjustDivHeight = () => {
    if (divRef.current) {
      divRef.current.style.height = "auto";
    }
  };

  const { loginUser } = useUserStore();

  return (
    <section
      className="mx-auto mt-6 w-[520px] shadow-basic rounded-lg"
      ref={divRef}
    >
      <div className="h-16 font-bold text-center leading-[64px]">
        마이페이지
      </div>

      {/* 개인정보 */}

      <div className="p-6 flex flex-col border-t" ref={divRef}>
        <h1 className="text-xl font-bold pb-4">개인 정보</h1>
        <div className="pb-6 flex flex-row place-items-start">
          {loginUser?.image ? (
            <img className="rounded-full w-32" src={loginUser?.image} />
          ) : (
            <UserIcon className="w-[90px] h-[90px] text-[#717171]"/>
          )}
          <div className="w-80 flex flex-col ml-6">
            <div className="pb-4 border-b">
              {editModeName ? (
                <div className="flex flex-row">
                  <p className="w-24  text-slate-500">이름</p>
                  <input className="w-40" type="text" placeholder="이름" />
                  <button className="ml-auto text-xs">저장</button>
                  <button
                    className="ml-1 text-xs"
                    onClick={changeToReadModeName}
                  >
                    취소
                  </button>
                </div>
              ) : (
                <div className="flex flex-row items-center">
                  <p className="w-24 text-slate-500">이름</p>
                  <p>{loginUser?.name}</p>
                  <button
                    className="ml-auto text-xs text-blue-500"
                    onClick={changeToEditModeName}
                  >
                    수정하기
                  </button>
                </div>
              )}
            </div>
            <div className="py-4 border-b">
              <div className="flex flex-row">
                <p className="w-24 text-slate-500">이메일</p>
                <p>{loginUser?.email}</p>
              </div>
            </div>

            <div className="py-4 border-b" ref={divRef}>
              {editModePw ? (
                <div className="flex flex-row ">
                  <p className="w-24 text-slate-500">비밀번호</p>
                  <div className="flex flex-col">
                    <input
                      className="pb-2 border-b w-40"
                      type="text"
                      placeholder="현재 비밀번호"
                    />
                    <input
                      className="py-2 border-b w-40"
                      type="text"
                      placeholder="새 비밀번호"
                    />
                    <input
                      className="pt-2 w-40"
                      type="text"
                      placeholder="새 비밀번호 확인"
                    />
                  </div>
                  <button className="place-self-end ml-auto text-xs">
                    저장
                  </button>
                  <button
                    className="place-self-end ml-1 text-xs"
                    onClick={changeToReadModePw}
                  >
                    취소
                  </button>
                </div>
              ) : (
                <div className="flex flex-row items-center">
                  <p className="w-24 text-slate-500">비밀번호</p>
                  <p>●●●●●●●●</p>
                  <button
                    className="ml-auto text-xs text-blue-500"
                    onClick={changeToEditModePw}
                  >
                    수정하기
                  </button>
                </div>
              )}
            </div>
            {/* 이메일 받아서 표시 */}
          </div>
        </div>
      </div>

      {/* 예약 내역 */}
      <div className="pl-6 pb-6">
        <h1 className="text-xl pb-4 font-bold">예약된 여행</h1>
        <div className="flex flex-row">
          <img
            className="rounded-lg w-[72px] h-[72px]"
            src="http://tong.visitkorea.or.kr/cms/resource/00/2626200_image2_1.jpg"
          ></img>
          <div className="pl-4">
            <p className="font-semibold">
              가경재 [한국관광 품질인증/Korea Quality]
            </p>
            <p>경상북도 경주시 대경로 4821-5</p>
            <p>2024.03.19 ~ 2024.03.24</p>
          </div>
        </div>
      </div>
      <div className="pl-6 pb-6">
        <h1 className="text-xl pb-4 font-bold">이전 여행지</h1>
        <div className="flex flex-row">
          <img
            className="rounded-lg w-[72px] h-[72px]"
            src="http://tong.visitkorea.or.kr/cms/resource/00/2626200_image2_1.jpg"
          ></img>
          <div className="pl-4">
            <p className="font-semibold">
              가경재 [한국관광 품질인증/Korea Quality]
            </p>
            <p>경상북도 경주시 대경로 4821-5</p>
            <p>2024.03.19 ~ 2024.03.24</p>
          </div>
        </div>
      </div>
    </section>
  );
}

// 이미지 이름 연락처 이메일 패스워드
// 수정 버튼 누르면 비밀번호 입력 후 이동
// 회원정보/수정 / 예약내역
