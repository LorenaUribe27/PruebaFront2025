import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

// Creación del DOM, busco el elemento con Id "Root" creado en el index
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
