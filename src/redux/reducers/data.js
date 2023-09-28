import { SET_DATA, CLEAR_DATA } from "../actions/types";

const initialState = {data:[]};

export function data(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_DATA:
      return { data: payload };
    case CLEAR_DATA:
      return { data: [] };

    default:
      return state;
  }
}
export default data;

