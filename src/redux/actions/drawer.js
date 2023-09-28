import { SHOW_DRAWER, HIDE_DRAWER } from "./types";

export const showDrawer = (payload) => ({
  type: SHOW_DRAWER,
  payload: payload,
});

export const hideDrawer = (payload) => ({
  type: HIDE_DRAWER,
  payload: payload,
});
