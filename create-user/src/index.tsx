import React from "react";
import ReactDOM from "react-dom/client";
import CreateUserComponent from "./components/CreateUserComponent";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <CreateUserComponent />
  </React.StrictMode>
);
