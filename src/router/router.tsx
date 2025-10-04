import { createBrowserRouter } from "react-router";
import { noAuth, requireAuth } from "./guards";
import { lazy } from "./lazy";
import { WebLayout } from "@/components/layout/WebLayout";
import NotFoundPage from "@/pages/NotFoundPage";

export const router = createBrowserRouter([
  {
    path: "/login",
    loader: noAuth,
    element: lazy(() => import("@/pages/auth/LoginPage")),
  },
  {
    path: "/signup",
    loader: noAuth,
    element: lazy(() => import("@/pages/auth/SignupPage")),
  },

  {
    id: "userRoot",
    loader: requireAuth,
    Component: WebLayout,
    children: [
      { index: true, element: lazy(() => import("@/pages/web/HomePage")) },
    ],
  },
  // catch-all for unknown routes
  { path: "*", element: <NotFoundPage /> },
]);
