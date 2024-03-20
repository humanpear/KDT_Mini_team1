import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import uuid from "react-uuid";
import { SignUpData } from "../types/user";

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

export async function signup(data: SignUpData) {
  const users = await getUsers();

  const userData = {
    id: uuid(),
    email: data.email,
    name: data.name,
    image: "",
  };

  await fetch(
    "https://mini-demo-server-default-rtdb.asia-southeast1.firebasedatabase.app/users.json",
    {
      method: "PUT",
      body: JSON.stringify([...users, userData]),
    }
  );
  await createUserWithEmailAndPassword(auth, data.email, data.password);
}

export async function login(email: string, password: string) {
  signInWithEmailAndPassword(auth, email, password);
}

export async function logout() {
  signOut(auth);
}
