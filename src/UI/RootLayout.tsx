import { Outlet } from "react-router-dom";
import Header from "../components/layout/Header";

export default function RootLayout() {
  return (
    <section>
      <Header />
      <main className="max-w-[2360px] w-11/12 mx-auto">
        <Outlet />
      </main>
    </section>
  );
}
