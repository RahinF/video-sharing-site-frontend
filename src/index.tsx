import { disableReactDevTools } from "@fvilers/disable-react-devtools";
import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "./app/App";
import { store } from "./app/store";
import "./tailwind.css";

if (process.env.NODE_ENV === "production") {
  disableReactDevTools();
}

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
