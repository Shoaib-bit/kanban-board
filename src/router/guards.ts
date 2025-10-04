import { redirect } from "react-router";
import { getUser, isAuthenticated } from "@/lib/helper";

export function requireAuth() {
  const user = getUser();
  if (!user || !isAuthenticated) {
    throw redirect("/login");
  }
  return true;
}

export function noAuth() {
  const user = getUser();
  if (user) {
    throw redirect("/");
  }
  return true;
}
