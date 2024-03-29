import TimerIcon from "../../icons/TimerIcon";

type Props = {
  startDate: string;
};

export default function DummyInfo({ startDate }: Props) {
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
          <p>・ 호스트의 집도 자신의 집처럼 아껴주세요.</p>
        </div>
      </div>
      <div className="border-b py-6">
        <div className="flex items-center">
          <TimerIcon />
          <p className="ml-6">
            호스트가 24시간 이내 예약 요청을 수락하기 전까지는 예약이 아직
            확정된 것이 아닙니다. 예약 확정 전까지는 요금이 청구되지 않습니다.
          </p>
        </div>
      </div>
      <div className="py-6">
        <p className="text-[12px]">
          아래 버튼을 선택하면 호스트가 설정한 숙소 이용규칙, 게스트에게
          적용되는 기본 규칙, 에어비앤비 재예약 및 환불 정책에 동의하며, 피해에
          대한 책임이 본인에게 있을 경우 미니비앤비가 결제 수단으로 청구의
          조치를 취할 수 있다는 사실에 동의하는 것입니다. 호스트가 예약 요청을
          수락하면 표시된 총액이 결제되는 데 동의합니다.
        </p>
      </div>
    </>
  );
}
