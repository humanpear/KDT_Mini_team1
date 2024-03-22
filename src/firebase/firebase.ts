import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import uuid from "react-uuid";
import { LoginUser, SignUpData } from "../types/user";

const firebaseConfig = {
  apiKey: "AIzaSyCeJCfWwmLd30VjrslZeyoYxKD0IIFYQMI",
  authDomain: "mini-demo-server.firebaseapp.com",
  projectId: "mini-demo-server",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export async function getUsers() {
  const response = await fetch(
    "https://mini-demo-server-default-rtdb.asia-southeast1.firebasedatabase.app/users.json"
  );

  const users = await response.json();
  return users;
}

export async function signup(
  data: SignUpData,
  setIsLoading: (arg: boolean) => void,
  setErrorMessage: (arg: string) => void
) {
  const userData = {
    id: uuid(),
    email: data.email,
    name: data.name,
    image: "",
  };

  setIsLoading(true);

  try {
    const users = await getUsers();

    const user = users.find((u: LoginUser) => u.email === data.email);

    if (user) {
      setErrorMessage("이미 존재하는 이메일입니다.");
      return;
    }
    await fetch(
      "https://mini-demo-server-default-rtdb.asia-southeast1.firebasedatabase.app/users.json",
      {
        method: "PUT",
        body: JSON.stringify([...users, userData]),
      }
    );
    await createUserWithEmailAndPassword(auth, data.email, data.password);
  } catch (error) {
    setErrorMessage("에러 발생 !!!");
  } finally {
    setIsLoading(false);
  }
}

export async function login(
  email: string,
  password: string,
  setIsLoading: (arg: boolean) => void,
  setErrorMessage: (arg: string) => void,
  navigate: (arg: string) => void
) {
  setIsLoading(true);

  try {
    const users = await getUsers();
    const user = users.find((u: LoginUser) => u.email === email);

    if (!user) {
      setErrorMessage("존재하지 않는 아이디입니다.");
      return;
    }
    await signInWithEmailAndPassword(auth, email, password);
    navigate("/");
  } catch (error) {
    setErrorMessage("잘못된 비밀번호입니다.");
  } finally {
    setIsLoading(false);
  }
}

export async function logout() {
  signOut(auth);
}
