import { useRoutes } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import "./App.css";

const App = () => {
  const routes = useRoutes(AppRoutes);
  return routes;
};

export default App;
