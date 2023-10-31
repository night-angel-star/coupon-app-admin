// import { useRoutes } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import "./App.css";
import { useSelector } from "react-redux";
import { Suspense } from "react";
import { Spin } from "antd";

const App = () => {
  // const routes = useRoutes(AppRoutes);
  // return routes;
  const pageName = useSelector((state) => state.route.name);
  const route = AppRoutes.find((r) => r.path === pageName);
  if (route) {
    return (
      <Suspense
        fallback={
          <Spin spinning={true}>
            <div style={{ height: "100vh", width: "100vw" }}></div>
          </Spin>
        }
      >
        {route.element}
      </Suspense>
    );
  } else {
    return null; // or return a default component if no matching route is found
  }
};

export default App;
