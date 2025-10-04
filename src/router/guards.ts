import { redirect } from "react-router";
import { getUser, isAuthenticated } from "@/lib/helper";

export async function requireAuth() {
  const user = getUser();
  if (!user || !isAuthenticated) {
    throw redirect("/login");
  }
  return user;
}
