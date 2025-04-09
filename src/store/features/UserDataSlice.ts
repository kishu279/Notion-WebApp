import { currentUser } from "@clerk/nextjs/server";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserData {
  uid: string;
  name: string;
  email: string;
  logo: string;
}

export interface UserDataType {
  user: UserData;

  workspace: {
    wid: string;
    name: string;
  }[];

  pages: {
    pid: string;
    name: string;
    private: boolean;
  }[];

  contents: {
    pid: string;
    content: string;
  }[];
}

export const UserDataSlice = createSlice({
  name: "userData",
  initialState: {
    user: {
      uid: "",
      name: "",
      email: "",
      logo: "",
    },

    workspace: [
      {
        wid: "",
        name: "",
      },
    ],

    pages: [
      {
        pid: "",
        name: "",
        private: false,
      },
    ],

    content: [
      {
        pid: "",
        content: "",
      },
    ],
  },
  reducers: {
    setUser: (state, actions: PayloadAction<UserData>) => {
      state.user = actions.payload;
    },
    getUser: () => {},
    setPages: () => {},
    getPages: () => {},
  },
});

export const { setUser, getUser, setPages, getPages } = UserDataSlice.actions;
export default UserDataSlice.reducer;
