import { createSlice } from "@reduxjs/toolkit";

export interface UserDataState {
  items: {
    title: string;
    items?: {
      title: string;
      url: string;
      content: string;
    }[];
  }[];
}

const initialState: UserDataState = {
  items: [
    { title: "Private Pages", items: [] },
    { title: "Public Pages", items: [] },
  ],
};

export const userDataSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    addPrivateDetails: (state) => {},

    addFavouriteDetails: (state) => {},
  },
});
