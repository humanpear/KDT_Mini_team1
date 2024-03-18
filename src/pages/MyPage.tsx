export default function MyPage() {
  return (
  <section className="absolute top-1/2 left-1/2 w-[520px] shadow-basic translate-x-[-50%] translate-y-[-50%] rounded-lg">
  <div className="h-16 font-bold text-center leading-[64px] border-b">
    마이페이지
  </div>
  <div className="p-6">
    <p>이메일</p>
    {/* 이메일 받아서 표시 */}
  </div>
  <button className="border rounded-lg px-3 py-1">수정</button>
  <div className="p-6">
    <p>이메일</p>
    {/* 이메일 받아서 표시 */}
    <button className="border rounded-lg px-3 py-1">수정</button>
  </div>
</section>
  );
}