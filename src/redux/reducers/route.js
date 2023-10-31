import { SET_ROUTE } from "../actions/types";

const initialState = {
  name: "auth/login",
  param: null,
};

export function route(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_ROUTE:
      return { name: payload.name, param: payload.param };
    default:
      return state;
  }
}
export default route;
