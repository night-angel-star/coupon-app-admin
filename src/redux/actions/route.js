import { SET_ROUTE } from "./types";

export const setRoute = (pageName, param = null) => ({
  type: SET_ROUTE,
  payload: {
    name: pageName,
    param: param,
  },
});
