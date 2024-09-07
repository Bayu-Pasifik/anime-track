import ReactDOM from "react-dom/client";
import * as ReactDOMClient from "react-dom/client";
import { Provider } from "react-redux";
import store from "./redux/store";
import App from "./App";
import "./index.css";
import { StrictMode } from "react";


const rootElement = document.getElementById("root");
const root = ReactDOMClient.createRoot(rootElement as HTMLElement);

root.render(
  <>
    <Provider store={store}>
      <App />
    </Provider>
  </>
);
