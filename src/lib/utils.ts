import { clsx, type ClassValue } from "clsx";
import { stringify } from "querystring";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface UserData {
  items: { name: string; items: { title: string; url: string }[] }[];
}

const pagesListSingleton = (() => {
  let instance: {
    getPrivateField: () => UserData;
    setPrivateField: (data: UserData) => void;
  } | null = null;

  return {
    getInstance: () => {
      if (!instance) {
        const _privateField: UserData = {
          items: [
            {
              name: "Private page",
              items: [],
            },
            {
              name: "Favourite Page",
              items: [],
            },
          ],
        };

        instance = {
          getPrivateField: () => {
            return _privateField;
          },

          setPrivateField: (data) => {
            // _privateField.items[0] = data.items[0].items;
            // _privateField.items[1] = data.items[1].items;

            console.log(data);

            _privateField.items[0].items = data.items[0].items;
            _privateField.items[1].items = data.items[1].items;
          },
        };
      }

      return instance;
    },
  };
})();

export default pagesListSingleton;
