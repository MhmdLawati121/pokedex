import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import { Sidebar } from "./components/Sidebar/Sidebar";
import { useParams } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [
      {
        path: "pokemon/:pokemonId",
        element: <Sidebar></Sidebar>,
      },
      {
        path: "",
        element: <div className="emptySidebar"></div>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
