import { SET_FILTER, CLEAR_FILTER } from "../actions/types";

const initialState = { key: "", value: "" };

export function message(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_FILTER:
      return { key: payload.key, value: payload.value };

    case CLEAR_FILTER:
      return initialState;

    default:
      return state;
  }
}
export default message;
