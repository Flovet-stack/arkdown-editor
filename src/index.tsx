import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import { DefualtProvider } from "./context/DefualtProvider";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <DefualtProvider>
      <App />
    </DefualtProvider>
  </React.StrictMode>
);
