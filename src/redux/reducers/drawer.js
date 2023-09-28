import { SHOW_DRAWER, HIDE_DRAWER } from "../actions/types";

const initialState = {
  id: undefined,
  show: false,
  title: undefined,
};

export function drawer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SHOW_DRAWER:
      return payload;

    case HIDE_DRAWER:
      return initialState;

    default:
      return state;
  }
}
export default drawer;
