import { configureStore } from "@reduxjs/toolkit";
import UserDataReducer from "./features/UserDataSlice";

export const store = configureStore({
  reducer: {
    userData: UserDataReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
