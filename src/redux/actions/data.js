import { SET_DATA, CLEAR_DATA } from "./types";
import DashboardService from "@/services/dashboard.service";
import { message } from "antd";
import getDataHandler from "@/utils/getDataHandler";

export const getData = (pageName) => (dispatch) => {
  return DashboardService.getList(pageName).then(
    (data) => {
      const result = getDataHandler(data.result, pageName);
      dispatch({
        type: SET_DATA,
        payload: result,
      });

      return Promise.resolve();
    },
    (error) => {
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
            message.error("Problem.");
            return Promise.reject();
          });
      } else {
        message.error("Problem.");
        return Promise.reject("Server problem.");
      }
    },
    (error) => {
      message.error("Problem.");
      return Promise.reject(error);
    }
  );
};

export const removeData = (pageName, payload) => (dispatch) => {
  console.log(pageName, payload);
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
