import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Header } from "@/components/header/header";
import "@/services/api";

import App from "./App";
import "./i18n";
import "./index.css";

createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <Header />
    <App />
  </StrictMode>
);
