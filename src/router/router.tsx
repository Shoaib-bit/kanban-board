import { createBrowserRouter } from "react-router";
import { requireAuth } from "./guards";
import { lazy } from "./lazy";
import { WebLayout } from "@/components/layout/WebLayout";

export const router = createBrowserRouter([
  { path: "/login", element: lazy(() => import("@/pages/auth/LoginPage")) },

  {
    id: "userRoot",
    loader: requireAuth,
    Component: WebLayout,
    children: [
      { index: true, element: lazy(() => import("@/pages/web/HomePage")) },
    ],
  },
]);
