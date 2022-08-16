import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./firebase";
import "./index.scss"


const app = document.querySelector("#root");

if (!app) {
  throw new Error(" Root element not found");
}
createRoot(app).render(<React.StrictMode><App /></React.StrictMode>);
