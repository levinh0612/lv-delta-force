import { lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout } from "./components/Layout";
import { RouteError } from "./components/RouteError";
import { ToastProvider } from "./hooks/useToast";
import HomePage from "./pages/HomePage";

const PlanPage = lazy(() => import("./pages/PlanPage"));
const BasicsPage = lazy(() => import("./pages/BasicsPage"));
const MapsPage = lazy(() => import("./pages/MapsPage"));
const OperatorsPage = lazy(() => import("./pages/OperatorsPage"));
const TipsPage = lazy(() => import("./pages/TipsPage"));
const ToolsPage = lazy(() => import("./pages/ToolsPage"));
const QuizPage = lazy(() => import("./pages/QuizPage"));
const MetaPage = lazy(() => import("./pages/MetaPage"));
const NotFound = lazy(() => import("./pages/NotFound"));

const router = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: <RouteError />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "plan", element: <PlanPage /> },
      { path: "basics", element: <BasicsPage /> },
      { path: "maps", element: <MapsPage /> },
      { path: "meta", element: <MetaPage /> },
      { path: "operators", element: <OperatorsPage /> },
      { path: "tips", element: <TipsPage /> },
      { path: "tools", element: <ToolsPage /> },
      { path: "quiz", element: <QuizPage /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

export default function App() {
  return (
    <ToastProvider>
      <RouterProvider router={router} />
    </ToastProvider>
  );
}
