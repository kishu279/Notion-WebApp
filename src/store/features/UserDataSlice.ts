import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LucideProps } from "lucide-react";
import { pid } from "process";
import React from "react";

export interface UserTypes {
  uid: string;
  name: string;
  email: string;
  image: string;
}

export interface WorkSpaceTypes {
  wid: string;
  name: string;
  // more to be added
}

export interface PagesTypes {
  pid: string;
  ppid: string;
  title: string;
  private: boolean;
}

export interface ContentTypes {
  pid: string;
  cid: string;
  type: string;
  content: string;
  order: number;
}

export interface UserDataType {
  user: UserTypes;
  workspace: WorkSpaceTypes[];
  pages: PagesTypes[];
  contents: ContentTypes[];
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
        ppid: "",
        title: "",
        private: false,
      },
    ],

    content: [
      {
        pid: "",
        cid: "",
        types: "",
        content: "",
        order: 0,
      },
    ],
  },
  reducers: {
    setUser: (state, actions: PayloadAction<UserTypes>) => {
      state.user.email = actions.payload.email;
      state.user.uid = actions.payload.uid;
      state.user.image = actions.payload.image;
      state.user.name = actions.payload.name;
    },
    setWorkSpace: (state, actions: PayloadAction<WorkSpaceTypes[]>) => {
      actions.payload.map((data) =>
        state.workspace.push({
          wid: data.wid,
          name: data.name,
        })
      );
    },
    setPages: (state, actions: PayloadAction<PagesTypes[]>) => {
      actions.payload.map((data) =>
        state.pages.push({
          pid: data.pid,
          ppid: data.ppid,
          title: data.title,
          private: data.private,
        })
      );
    },
    setContents: (state, actions: PayloadAction<ContentTypes[]>) => {
      actions.payload.map((data) =>
        state.content.push({
          pid: data.pid,
          cid: data.cid,
          types: data.type,
          content: data.content,
          order: data.order,
        })
      );
    },
  },
});

export const { setUser, setPages, setContents } = UserDataSlice.actions;
export default UserDataSlice.reducer;
