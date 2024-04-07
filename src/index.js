import "./index.css";
import App from "./App";
import React from "react";
import ReactDOM from "react-dom/client";
import { Sidebar } from "./components/Sidebar/Sidebar";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// react-router-dom used for client side routing
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
    <RouterProvider router={router} />
  </React.StrictMode>
);
