import Cookies from "js-cookie";
import type { User } from "@/types/user";

export const getUser = (): User | null => {
  const raw = localStorage.getItem("user");
  return raw ? JSON.parse(raw) : null;
};

const ACCESS_COOKIE = "accessToken";

export const isAuthenticated = (): boolean => {
  const accessToken = Cookies.get(ACCESS_COOKIE);
  if (accessToken) return true;
  else return false;
};
