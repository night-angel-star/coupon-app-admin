import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8000/";

const getList = (pageName) => {
  return axios
    .get(API_URL + (pageName === "login" ? "nvlogin" : pageName) + "/view", {
      headers: authHeader(),
    })
    .then((response) => {
      return response.data;
    });
};

const add = (pageName, payload, isEdit) => {
  if (isEdit) {
    return edit(pageName, payload);
  }
  return axios
    .post(
      API_URL + (pageName === "login" ? "nvlogin" : pageName) + "/add",
      payload,
      { headers: authHeader() }
    )
    .then((response) => {
      return response.data;
    });
};

const edit = (pageName, payload) => {
  return axios
    .post(
      API_URL + (pageName === "login" ? "nvlogin" : pageName) + "/edit",
      payload,
      { headers: authHeader() }
    )
    .then((response) => {
      return response.data;
    });
};
const del = (pageName, payload) => {
  return axios
    .post(
      API_URL + (pageName === "login" ? "nvlogin" : pageName) + "/delete",
      payload,
      { headers: authHeader() }
    )
    .then((response) => {
      return response.data;
    });
};

const getFamily = () => {
  return axios
    .post(API_URL + "member/family", {}, { headers: authHeader() })
    .then((response) => {
      return response.data;
    });
};

const dashboardService = {
  getList,
  add,
  edit,
  del,
  getFamily,
};

export default dashboardService;
