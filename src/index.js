import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import reportWebVitals from "./reportWebVitals";
import { ConfigProvider } from "antd";
import antdConfig from "./antd.config";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import configureStore from "./redux/configureStore";
import { HappyProvider } from '@ant-design/happy-work-theme';
const root = ReactDOM.createRoot(document.getElementById("root"));

const {store,persistor}=configureStore();

root.render(
  // <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <ConfigProvider theme={antdConfig}>
          <HappyProvider><App /></HappyProvider>
        </ConfigProvider>
      </BrowserRouter>
      </PersistGate>
    </Provider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
