import { lazy } from "react";
import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
  {
    path: "/",
    Component: lazy(() => import("./pages/ProtectedRoute.tsx")),
    children: [
      {
        index: true,
        Component: lazy(() => import("./pages/dashboard/Home.tsx")),
      },
      {
        path: "login",
        Component: lazy(() => import("@/pages/auth/sign/In.tsx")),
      },
      {
        path: "sign-up",
        Component: lazy(() => import("@/pages/auth/sign/Up.tsx")),
      },
      {
        path: "confirm-signup",
        Component: lazy(() => import("@/pages/auth/sign/Confirm.tsx")),
      },
      {
        path: "verify-token",
        Component: lazy(() => import("./pages/auth/VerifyTokenPage.tsx")),
      },
      {
        path: "forgot-password",
        Component: lazy(() => import("@/pages/auth/pass/Forgot.tsx")),
      },
      {
        path: "update-password",
        Component: lazy(() => import("@/pages/auth/pass/Update.tsx")),
      },
    ]
  },
], {
  basename: import.meta.env.MODE === 'production' ? "/ClassOrchestrationPlatform" : '/',
});

export default router;