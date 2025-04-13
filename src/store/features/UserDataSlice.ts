import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserData {
  uid: string;
  name: string;
  email: string;
  image: string;
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
      image: "",
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
      state.user.email = actions.payload.email;
      state.user.uid = actions.payload.uid;
      state.user.image = actions.payload.image;
      state.user.name = actions.payload.name;

      console.log("UserDataSlice: ", state.user);
    },
    setPages: () => {},
  },
});

export const { setUser, setPages } = UserDataSlice.actions;
export default UserDataSlice.reducer;
