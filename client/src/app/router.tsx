import { RouterProvider, createBrowserRouter } from "react-router";
import Main from "../layout";
import * as Pages from "../pages";
import ProtectedRoutes from "../components/Common/ProtectedRoutes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Pages.HomePage />,
      },
      {
        path: "about",
        element: <Pages.AboutPage />,
      },
      {
        path: "contact",
        element: <Pages.ContactPage />,
      },
      {
        path: "gallery",
        element: <Pages.GalleryPage />,
      },

      {
        path: "*",
        element: <Pages.NotFoundPage />,
      },
    ],
  },
  {
    path: "admin",
    element: (
      <ProtectedRoutes>
        <Pages.AdminPanel />
      </ProtectedRoutes>
    ),
  },
  {
    path: "login",
    element: <Pages.LoginPage />,
  },
  {
    path: "signup",
    element: <Pages.SignupPage />,
  },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
