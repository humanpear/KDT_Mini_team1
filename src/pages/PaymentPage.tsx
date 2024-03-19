import PaymentInfo from "../components/payment/PaymentInfo";
import PriceInfo from "../components/payment/PriceInfo";
import PrevIcon from "../icons/PrevIcon";

export default function PaymentPage() {
  return (
    <section className="w-[1120px] mx-auto mt-16 relative">
      <p className="text-3xl font-bold mb-12">예약 요청</p>
      <PrevIcon />
      <div className="flex">
        <PaymentInfo />
        <PriceInfo />
      </div>
    </section>
  );
}
