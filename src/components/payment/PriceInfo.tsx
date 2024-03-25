import { SelectedAccommodation } from "../../types/selectedAccommodation";

type Props = {
  selectedAccommodation: SelectedAccommodation;
};

export default function PriceInfo({ selectedAccommodation }: Props) {
  const { title, image1 } = selectedAccommodation;

  return (
    <div className="basis-1/2 flex justify-end">
      <div className="w-[460px] h-min p-6 border rounded-lg sticky top-[200px]">
        <div className="flex border-b pb-6">
          <img
            className="w-[100px] h-[100px] rounded-lg object-cover shrink-0"
            src={image1}
            alt="stay image"
          />
          <div className="ml-4 flex flex-col justify-between">
            <p>{title}</p>
            <p>⭐️ 4.88 (후기 17개)</p>
          </div>
        </div>
        <div className="border-b py-6">
          <p className="text-[24px] mb-6">요금 세부정보</p>
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <p>₩700,000 x 5박</p>
              <p>₩3,500,000</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="underline">미니비앤비 서비스 수수료</p>
              <p>₩434,826</p>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center pt-6">
          <p>총 합계</p>
          <p>₩3,934,826</p>
        </div>
      </div>
    </div>
  );
}
