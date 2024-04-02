import { LoginUser, SignUpData } from "../types/user";
import { redirect } from "react-router";

export const ACCESS_TOKEN = "access_token";

export async function getUser() {
  if (!localStorage.getItem(ACCESS_TOKEN)) {
    return null;
  }
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/members/my-page`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
      },
    }
  );

  const data = await response.json();

  return data;
}

export async function login({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/members/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: email, password: password }),
    }
  );

  const data = await response.json();

  if (data.result.code === 200) {
    localStorage.setItem(ACCESS_TOKEN, data.body.access_token);
  } else {
    throw new Error("로그인에 실패하였습니다.");
  }
  // const loginUser = await getUser();
  // setLoginUser(loginUser.body);
  // navigate("/");
  window.location.href = "/";
}

export async function logout(
  navigate: (arg: string) => void,
  setLoginUser: (arg: LoginUser | null) => void
) {
  await fetch(`${import.meta.env.VITE_API_URL}/api/members/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
    },
  });
  setLoginUser(null);
  localStorage.removeItem(ACCESS_TOKEN);
  navigate("/login");
}

export async function signup({
  signupData,
  navigate,
}: {
  signupData: SignUpData;
  navigate: (arg: string) => void;
}) {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/members/register`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signupData),
    }
  );

  if (!response.ok) {
    throw new Error("회원가입에 실패했습니다.");
  }
  navigate("/login");
}

export function getAuthToken() {
  const token = localStorage.getItem(ACCESS_TOKEN);
  return token;
}

export function checkAuthLoader() {
  const token = getAuthToken();

  if (!token) {
    return redirect("/login");
  }

  return null;
}

export function protectLoginPageLoader() {
  const token = getAuthToken();

  if (token) {
    return redirect("/");
  }

  return null;
}
