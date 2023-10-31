import axios from "axios";
import authHeader from "./auth-header";
import { message } from "antd";

import API_URL from "./API";
import { logout } from "../redux/actions/auth";
import configureStore from "../redux/configureStore";
import { SET_DATA } from "../redux/actions/types";

const { store } = configureStore();

const getList = (pageName, params) => {
  let url = API_URL + (pageName === "login" ? "nvlogin" : pageName) + "/view";
  if (params) {
    url = url + params;
  }
  return axios
    .get(url, {
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
    })
    .catch((error) => {
      if (error.response.data.status === 401) {
        message.error("Unauthorized");
        store.dispatch(logout());
      } else {
        console.log(error);
        message.error("Del Data Exception");
      }
    });
};

const delUpload = (payload) => {
  return axios
    .post(API_URL + "file/delete", payload, { headers: authHeader() })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      if (error.response.data.status === 401) {
        message.error("Unauthorized");
        store.dispatch(logout());
      } else {
        console.log(error);
        message.error("Del Data Exception");
      }
    });
};

const getAdverts = () => {
  return axios
    .get(API_URL + "file/getadverts", { headers: authHeader() })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      if (error.response.data.status === 401) {
        message.error("Unauthorized");
        store.dispatch(logout());
      } else {
        console.log(error);
        message.error("Del Data Exception");
      }
    });
};

const delAdvert = (payload) => {
  return axios
    .post(API_URL + "file/deleteadvert", payload, { headers: authHeader() })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      if (error.response.data.status === 401) {
        message.error("Unauthorized");
        store.dispatch(logout());
      } else {
        console.log(error);
        message.error("Del Data Exception");
      }
    });
};

const getFamily = () => {
  return axios
    .post(API_URL + "member/family", {}, { headers: authHeader() })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      if (error.response.data.status === 401) {
        message.error("Unauthorized");
        store.dispatch(logout());
      } else {
        console.log(error);
        message.error("Get Data Exception");
      }
    });
};

const getPermission = (id) => {
  return axios
    .post(API_URL + "level/get", { id }, { headers: authHeader() })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      if (error.response.data.status === 401) {
        message.error("Unauthorized");
        store.dispatch(logout());
      } else {
        console.log(error);
        message.error("Get Data Exception");
      }
    });
};
const getJobLogin = () => {
  return axios
    .post(API_URL + "job/getlogin", {}, { headers: authHeader() })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      if (error.response.data.status === 401) {
        message.error("Unauthorized");
        store.dispatch(logout());
      } else {
        console.log(error);
        message.error("Get Data Exception");
      }
    });
};
const getCategory = () => {
  return axios
    .get(API_URL + "coupon_category/view", { headers: authHeader() })
    .then((response) => {
      return response.data.result;
    })
    .catch((error) => {
      if (error.response.data.status === 401) {
        message.error("Unauthorized");
        store.dispatch(logout());
      } else {
        console.log(error);
        message.error("Get Data Exception");
      }
    });
};
const getBrands = () => {
  return axios
    .get(API_URL + "brand/view", { headers: authHeader() })
    .then((response) => {
      return response.data.result;
    })
    .catch((error) => {
      if (error.response.data.status === 401) {
        message.error("Unauthorized");
        store.dispatch(logout());
      } else {
        console.log(error);
        message.error("Get Data Exception");
      }
    });
};
const getCategoryForCoupon = () => {
  return axios
    .get(API_URL + "coupon_category/getforcoupon", { headers: authHeader() })
    .then((response) => {
      return response.data.result;
    })
    .catch((error) => {
      if (error.response.data.status === 401) {
        message.error("Unauthorized");
        store.dispatch(logout());
      } else {
        console.log(error);
        message.error("Get Data Exception");
      }
    });
};
const getCategoryForParentSelect = (id) => {
  return axios
    .post(
      API_URL + "coupon_category/getwillparent",
      { id: id },
      { headers: authHeader() }
    )
    .then((response) => {
      return response.data.result;
    })
    .catch((error) => {
      if (error.response.data.status === 401) {
        message.error("Unauthorized");
        store.dispatch(logout());
      } else {
        console.log(error);
        message.error("Get Data Exception");
      }
    });
};
const changeStatus = (payload) => {
  return axios
    .post(API_URL + "coupon_category/change_status", payload, {
      headers: authHeader(),
    })
    .then((response) => {
      console.log(response.data.result);
      store.dispatch({
        type: SET_DATA,
        payload: response.data.result,
      });
      return response.data;
    })
    .catch((error) => {
      if (error.response.data.status === 401) {
        message.error("Unauthorized");
        store.dispatch(logout());
      } else {
        console.log(error);
        message.error("Get Data Exception");
      }
    });
};
const dashboardService = {
  getList,
  add,
  edit,
  del,
  getFamily,
  getPermission,
  getJobLogin,
  getCategory,
  getCategoryForParentSelect,
  getCategoryForCoupon,
  getBrands,
  changeStatus,
  delUpload,
  getAdverts,
  delAdvert,
};

export default dashboardService;
