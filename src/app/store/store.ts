import { configureStore } from "@reduxjs/toolkit";

const userDetails = () => {};

export const store = configureStore({
  reducer: {},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
