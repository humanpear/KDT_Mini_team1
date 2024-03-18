import { Outlet } from "react-router-dom";
import Test from "../components/Test";

export default function RootLayout() {
  return (
    <>
      <header>헤더</header>
      <Test />
      <main>
        <Outlet />
      </main>
    </>
  );
}
