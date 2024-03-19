import { Outlet, useNavigate } from "react-router-dom";
import Header from "../components/layout/Header";
import { useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getUsers } from "../firebase/firebase";
import { useUserStore } from "../store/user";
import { LoginUser } from "../types/user";

export default function RootLayout() {
  const navigate = useNavigate();
  const { setLoginUser } = useUserStore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), (user) => {
      if (user) {
        getUsers()
          .then((users) => users.find((u: LoginUser) => u.email === user.email))
          .then((user) => setLoginUser(user))
          .then(() => navigate("/"));
      } else {
        setLoginUser(null);
        navigate("/login");
      }
    });

    return () => unsubscribe();
  }, [navigate, setLoginUser]);

  return (
    <section>
      <Header />
      <main className="max-w-[2360px] w-11/12 mx-auto">
        <Outlet />
      </main>
    </section>
  );
}
