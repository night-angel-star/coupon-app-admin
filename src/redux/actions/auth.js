import { LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, SET_MESSAGE } from "./types";

import AuthService from "@/services/auth.service";

export const login = (username, password) => (dispatch) => {
  return AuthService.login(username, password).then(
    (data) => {
      let permission = {};
      if (data.user.level_id === 1) {
        permission = { level: { view: 1, add: 1, edit: 1, del: 1 } };
      }
      data.user.role.map(
        (r) =>
          (permission = {
            ...permission,
            [r.page]: {
              ...permission[r.page],
              [r.operation]: 1,
            },
          })
      );
      const user = {
        id: data.user.id,
        name: data.user.name,
        level: data.user.level_id,
        permission: permission,
        token: data.access_token,
      };
      localStorage.setItem("token", data.access_token);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: { user },
      });

      return Promise.resolve();
    },
    (error) => {
      let message = "";
      switch (error.code) {
        case "ERR_NETWORK":
          message = "Network problem.";
          break;
        case "ERR_BAD_REQUEST":
          if (error.response.data.status === 401) {
            message = "User name or password is incorrect.";
          } else {
            message = "Unknown error. Please contact admin.";
          }

          break;
        default:
          message = "Unknown error. Please contact admin.";
          break;
      }

      dispatch({
        type: LOGIN_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const logout = () => (dispatch) => {
  AuthService.logout();
  localStorage.clear();
  dispatch({
    type: LOGOUT,
  });
};
