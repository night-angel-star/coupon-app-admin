import axios from "axios";
import API_URL from "./API";

const login = (payload) => {
  return axios.post(API_URL + "login", payload).then((response) => {
    if (response.data.accessToken) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
  });
};

const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("persist:root");
};

const authService = {
  login,
  logout,
};

export default authService;
