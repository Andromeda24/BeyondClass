import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import './index.css'
import "./i18n"; 

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Theme appearance="light" grayColor="slate" accentColor="green">
      <App />
    </Theme>
  </React.StrictMode>
);
