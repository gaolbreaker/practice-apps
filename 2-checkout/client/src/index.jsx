import React from "react";
import { render } from "react-dom";
import App from "./components/App.jsx";
// should use double quotes for imports for some reason, Elbert!

render(
  <div>
    <header><h1>Generic Shopping Website</h1></header>
    <p>
      <code>Page Cookie: {JSON.stringify(document.cookie, undefined, "\t")}</code>
    </p>
    <App />

  </div>,
  document.getElementById("root")
);
