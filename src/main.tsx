import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "@/App";
import { AuthProvider } from "@/integrations/auth/AuthProvider";
import { BackendProvider } from "@/integrations/backend/BackendProvider";

import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <BackendProvider>
        <App />
      </BackendProvider>
    </AuthProvider>
  </StrictMode>,
);
