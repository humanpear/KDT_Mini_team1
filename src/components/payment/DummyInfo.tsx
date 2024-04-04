import AllCheckBox from "../../icons/AllCheckBox";
import CheckBox from "../../icons/CheckBox";

type Agreement = { agree1: boolean; agree2: boolean; agree3: boolean };

type Props = {
  startDate: string;
  agreement: Agreement;
  allChecked: boolean;
  setAgreement: (value: Agreement | ((value: Agreement) => Agreement)) => void;
};

export default function DummyInfo({
  startDate,
  agreement,
  allChecked,
  setAgreement,
}: Props) {
  function allCheck() {
    if (!agreement.agree1 || !agreement.agree2 || !agreement.agree3) {
      setAgreement({
        agree1: true,
        agree2: true,
        agree3: true,
      });
    } else {
      setAgreement({
        agree1: false,
        agree2: false,
        agree3: false,
      });
    }
  }

  function check(type: keyof Agreement) {
    setAgreement((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  }

  return (
    <>
      <div className="border-b py-6">
        <p className="text-[24px] mb-6">환불 정책</p>
        <p>
          체크인 날짜인 {startDate} 전에 취소하면 부분 환불을 받으실 수
          있습니다. 그 이후에는 취소 시점에 따라 환불액이 결정됩니다.
        </p>
      </div>
      <div className="border-b py-6">
        <p className="text-[24px] mb-6">기본 규칙</p>
        <p>
          훌륭한 게스트가 되기 위한 몇 가지 간단한 규칙을 지켜주실 것을 모든
          게스트에게 당부드리고 있습니다.
        </p>
        <div className="mt-4">
          <p>・ 숙소 이용규칙을 준수하세요.</p>
          <p>・ 숙소를 자신의 집처럼 아껴주세요.</p>
        </div>
      </div>
      <div className="py-6 flex flex-col gap-4">
        <div
          className="flex items-center cursor-pointer w-max"
          onClick={allCheck}
        >
          <AllCheckBox
            className={`text-2xl transition ${!allChecked && "text-stone-300"}`}
          />
          <p className="ml-2 font-bold text-lg">필수 약관 전체 동의</p>
        </div>
        <div
          className={`flex items-center cursor-pointer w-max ml-1 transition ${
            !agreement.agree1 && "text-stone-300"
          }`}
          onClick={() => check("agree1")}
        >
          <CheckBox />
          <p className="ml-2">[필수] 만 14세 이상 이용 동의</p>
        </div>
        <div
          className={`flex items-center cursor-pointer w-max ml-1 transition ${
            !agreement.agree2 && "text-stone-300"
          }`}
          onClick={() => check("agree2")}
        >
          <CheckBox />
          <p className="ml-2">[필수] 개인정보 수집 및 이용</p>
        </div>
        <div
          className={`flex items-center cursor-pointer w-max ml-1 transition ${
            !agreement.agree3 && "text-stone-300"
          }`}
          onClick={() => check("agree3")}
        >
          <CheckBox />
          <p className="ml-2">[필수] 개인정보 제 3자 제공</p>
        </div>
      </div>
    </>
  );
}
