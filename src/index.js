import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import { Sidebar } from "./components/Sidebar/Sidebar";
import { useParams } from "react-router-dom";

const PokemonDetails = () => {
  const { pokemonId } = useParams();

  // Use the pokemonId to fetch data or display details
  return (
    <div>
      <h1>Viewing Pokemon: {pokemonId}</h1>
      {/* Display details based on pokemonId */}
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [
      {
        path: "pokemon/:pokemonId",
        element: <Sidebar></Sidebar>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
