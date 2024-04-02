import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <section className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] flex flex-col items-center">
      <p className="font-bold text-[40px] text-brand mb-4">404 Not Found !</p>
      <Link to="/" className="bg-brand text-white p-2 rounded-lg text-xl">
        Home
      </Link>
    </section>
  );
}
