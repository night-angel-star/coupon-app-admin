// import { useRoutes } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import "./App.css";
import { useSelector } from "react-redux";

const App = () => {
  // const routes = useRoutes(AppRoutes);
  // return routes;
  const pageName = useSelector((state) => state.route.name);
  const route = AppRoutes.find((r) => r.path === pageName);
  if (route) {
    return route.element;
  } else {
    return null; // or return a default component if no matching route is found
  }
};

export default App;
