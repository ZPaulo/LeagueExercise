import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap-theme.css";
import React from "react";
import { render } from "react-dom";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

render(React.createElement(App, null, null), document.getElementById("root"));
registerServiceWorker();
