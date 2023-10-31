import { SET_DATA, CLEAR_DATA } from "./types";
import DashboardService from "../../services/dashboard.service";
import { message } from "antd";
import getDataHandler from "../../utils/getDataHandler";
import { logout } from "./auth";

export const getData = (pageName, params) => (dispatch) => {
  return DashboardService.getList(pageName, params).then(
    (data) => {
      const result = getDataHandler(data.result, pageName);
      dispatch({
        type: SET_DATA,
        payload: result,
      });

      return Promise.resolve();
    },
    (error) => {
      if (error.response.data.status === 401) {
        message.error("Unauthorized");
        dispatch(logout());
      } else {
        console.log(error);
        message.error("Get Data Exception");
      }

      return Promise.reject();
    }
  );
  //   {
  //   type: SET_DATA,
  //   payload: payload,
  // }
};

export const addData = (pageName, payload, isEdit) => (dispatch) => {
  return DashboardService.add(pageName, payload, isEdit).then(
    (data) => {
      if (data.status === 201 || data.status === 200) {
        dispatch(getData(pageName))
          .then(() => {
            return Promise.resolve();
          })
          .catch((err) => {
            message.error("Get Data Problem.");
            console.log(err);
            return Promise.reject();
          });
      } else {
        message.error("Add Data Problem.");
        return Promise.reject("Server problem.");
      }
    },
    (error) => {
      if (error.response.data.status === 401) {
        message.error("Unauthorized");
        dispatch(logout());
      } else {
        console.log(error);
        message.error("Add Data Exception");
      }
      return Promise.reject(error);
    }
  );
};

export const removeData = (pageName, payload) => (dispatch) => {
  return DashboardService.del(pageName, payload).then(
    (data) => {
      if (data.status === 201) {
        dispatch(getData(pageName))
          .then(() => {
            return Promise.resolve();
          })
          .catch(() => {
            return Promise.reject();
          });
      } else {
        return Promise.reject();
      }
    },
    (error) => {
      return Promise.reject(error);
    }
  );
};

export const clearData = () => ({
  type: CLEAR_DATA,
});
