import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { ThirdwebProvider } from "thirdweb/react";
import * as HypeLabModule from "@hypelab/sdk-react"; 
import "./index.css";

// Достаем провайдер вручную, проверяя оба варианта экспорта
const HypeLabProvider = (HypeLabModule as any).HypeLabProvider || (HypeLabModule as any).default?.HypeLabProvider;

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThirdwebProvider>
      {HypeLabProvider ? (
        <HypeLabProvider>
          <App />
        </HypeLabProvider>
      ) : (
        <App /> // Если библиотека не загрузилась, приложение хотя бы не упадет в черный экран
      )}
    </ThirdwebProvider>
  </React.StrictMode>
);

