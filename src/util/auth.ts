import { LoginUser, SignUpData } from "../types/user";
import { redirect } from "react-router";

export async function getUser() {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/members/my-page`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }
    );

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function login(
  email: string,
  password: string,
  navigate: (arg: string) => void,
  setIsLoading: (arg: boolean) => void,
  setLoginUser: (arg: LoginUser) => void
) {
  setIsLoading(true);
  try {
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

    if (!response.ok) {
      return;
    }

    const data = await response.json();

    if (data.result.code === 200) {
      localStorage.setItem("access_token", data.body.access_token);
    }
    const loginUser = await getUser();
    setLoginUser(loginUser.body);
    navigate("/");
  } catch (error) {
    console.error(error);
  } finally {
    setIsLoading(false);
  }
}

export async function logout(
  navigate: (arg: string) => void,
  setLoginUser: (arg: LoginUser | null) => void
) {
  await fetch(`${import.meta.env.VITE_API_URL}/api/members/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  });
  setLoginUser(null);
  localStorage.removeItem("access_token");
  navigate("/login");
}

export async function signup(
  signupData: SignUpData,
  setIsLoading: (arg: boolean) => void
) {
  setIsLoading(true);

  try {
    await fetch(`${import.meta.env.VITE_API_URL}/api/members/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signupData),
    });
  } catch (error) {
    console.error(error);
  } finally {
    setIsLoading(false);
  }
}

export function getAuthToken() {
  const token = localStorage.getItem("access_token");
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
