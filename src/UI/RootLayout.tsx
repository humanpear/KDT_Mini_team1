import { Outlet } from "react-router-dom";
import Header from "../components/layout/Header";
import { useEffect } from "react";
import { useUserStore } from "../store/user";
import { ACCESS_TOKEN, getUser } from "../util/auth";
import { useQuery } from "@tanstack/react-query";

export default function RootLayout() {
  const { setLoginUser } = useUserStore();
  const { data, isPending } = useQuery({
    queryKey: ["login"],
    queryFn: getUser,
  });

  useEffect(() => {
    if (!isPending && data) {
      setLoginUser(data.body);
    }
    if (!isPending && !data) {
      localStorage.removeItem(ACCESS_TOKEN);
    }
  }, [setLoginUser, data, isPending]);

  return (
    <section>
      <Header />
      <main className="max-w-[2360px] w-11/12 mx-auto">
        <Outlet />
      </main>
    </section>
  );
}
