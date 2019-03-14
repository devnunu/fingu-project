import * as React from "react";
import { render } from "react-dom";

import Router from "./router/Router";

import "./styles.scss";

function App() {
  return (
    <div className="App">
      <Router />
    </div>
  );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
