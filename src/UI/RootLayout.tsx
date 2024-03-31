import { Outlet } from "react-router-dom";
import Header from "../components/layout/Header";
import { useEffect } from "react";
import { useUserStore } from "../store/user";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "../util/auth";

export default function RootLayout() {
  const { setLoginUser } = useUserStore();
  const { data } = useQuery({
    queryKey: ["login"],
    queryFn: getUser,
  });

  useEffect(() => {
    if (data) {
      setLoginUser(data.body);
    } else {
      localStorage.removeItem("access_token");
    }
  }, [setLoginUser, data]);

  return (
    <section>
      <Header />
      <main className="max-w-[2360px] w-11/12 mx-auto">
        <Outlet />
      </main>
    </section>
  );
}
