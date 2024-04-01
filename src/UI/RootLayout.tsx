import { Outlet } from "react-router-dom";
import Header from "../components/layout/Header";
import { useEffect } from "react";
import { useUserStore } from "../store/user";
import { getUser } from "../util/auth";
import { useQuery } from "@tanstack/react-query";

export default function RootLayout() {
  const { setLoginUser } = useUserStore();
  const { data, isPending } = useQuery({
    queryKey: ["login"],
    queryFn: getUser,
    gcTime: 0,
  });

  useEffect(() => {
    if (!isPending && data) {
      setLoginUser(data.body);
    }
    if (!isPending && !data) {
      localStorage.removeItem("access_token");
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
