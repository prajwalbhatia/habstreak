import React from "react";
import ReactDOM from "react-dom/client";
import "./Styles/main.scss";
import App from "./App";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import store from "./Redux/Store/store";

let persistor = persistStore(store);

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </PersistGate>
  </Provider>
);
