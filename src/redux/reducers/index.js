import { combineReducers } from "redux";
import auth from "./auth";
import message from "./message";
import data from "./data";
import drawer from "./drawer";
import search from "./search";

export default combineReducers({
  auth,
  message,
  data,
  drawer,
  search,
});
