import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./util/http";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import RootLayout from "./UI/RootLayout";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CartPage from "./pages/CartPage";
import MyPage from "./pages/MyPage";
import OrderDetailPage from "./pages/OrderDetailPage";
import PaymentPage from "./pages/PaymentPage";
import OrderCompletePage from "./pages/OrderCompletePage";
import { checkAuthLoader, protectLoginPageLoader } from "./util/auth";
import NotFoundPage from "./pages/NotFoundPage";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        { index: true, element: <HomePage /> },
        { path: "signup", element: <SignupPage /> },
        {
          path: "login",
          element: <LoginPage />,
          loader: protectLoginPageLoader,
        },
        { path: "product/:id", element: <ProductDetailPage /> },
        { path: "cart", element: <CartPage />, loader: checkAuthLoader },
        { path: "mypage", element: <MyPage />, loader: checkAuthLoader },
        {
          path: "order/:id",
          element: <OrderDetailPage />,
          loader: checkAuthLoader,
        },
        {
          path: "payment/:id",
          children: [
            { index: true, element: <PaymentPage />, loader: checkAuthLoader },
            {
              path: "complete",
              element: <OrderCompletePage />,
              loader: checkAuthLoader,
            },
          ],
        },
        {
          path: "*",
          element: <NotFoundPage />,
        },
      ],
    },
  ]);

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
