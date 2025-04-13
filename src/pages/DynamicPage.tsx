// "use client";

// import { Textarea } from "@/components/ui/textarea";
// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { toast } from "sonner";

// export default function NotionDynamicPage({ pid }: { pid: string }) {
//   const [fetchData, setFetchData] = useState<string>("");
//   const [text, setText] = useState<string>("");
//   const [loading, setLoading] = useState<boolean>(false);

//   // using app selector we will fetch

//   // send data

//   // fetch the data
//   useEffect(() => {
//     const ResponseUserData = {
//       cid: null,
//       pid: pid,
//       data: {
//         data: "Hii this side sourav Poddar",
//       },
//     };

//     async function getData() {
//       // try {
//       //   const response = await axios.get("/api/content-update", {
//       //     params: {
//       //       pid: pid,
//       //     },
//       //     headers: {
//       //       "Content-Type": "application/json",
//       //     },
//       //   });

//       //   if (!response.status) {
//       //     throw new Error(response.data.message);
//       //   }

//       //   setFetchData(response.data?.data);
//       //   setText(response.data?.data);
//       // } catch (err) {
//       //   console.error(err);
//       //   toast(err.response.data.message);
//       //   redirect("/notion");
//       // } finally {
//       //   setLoading(false);
//       // }

//       setLoading(true);
//       try {
//         setFetchData(ResponseUserData.data.data);
//         setText(ResponseUserData.data.data);
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     }

//     getData();
//   }, [pid]); // [, pid]

//   // useDebounce for delayed request
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       // check for the difference
//       if (text.length !== fetchData.length) {
//         console.log("sending the requyest");

//         async function setData() {
//           try {
//             const response = await axios.post(
//               "/api/content-update",
//               {
//                 cid: null, // "ee675ec9-dcf6-4c4f-83f4-40ac3bf47f13"
//                 pid: pid,
//                 data: { content: fetchData, type: "text", order: 0 },
//               },
//               {
//                 headers: {
//                   "Content-Type": "application/json",
//                 },
//               }
//             );

//             if (!response.status) {
//               toast("Error Occurred Refresh Again!!!");
//               throw new Error(response.data.message);
//             }

//             setText(fetchData);
//             console.log(response.data.message);
//             toast("Updated Successfully");
//           } catch (err) {
//             console.error(err);
//             toast(err?.response.data.message);
//             setFetchData(text); // rollback it with previous message
//             throw new Error(err?.response.data.message);
//           }
//         }

//         setData();
//       }
//     }, 2000);

//     return () => clearTimeout(timer);
//   }, [fetchData, text, pid]);

//   return (
//     <>
//       <Textarea
//         className="w-3/3 h-3/3 focus:outline-none"
//         placeholder="Enter your cotent here..."
//         value={fetchData}
//         onChange={(e: React.ChangeEvent<HTMLTextAreaElement>): void => {
//           setFetchData(e.target.value);
//         }}
//         disabled={loading}
//       />
//     </>
//   );
// }

"use client";

import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

export default function NotionDynamicPage({ pid }: { pid: string }) {
  const [fetchData, setFetchData] = useState<string>("");
  const [text, setText] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  // Simulated default response (move it outside to avoid redefinition warning)
  const ResponseUserData = {
    cid: null,
    pid: pid,
    data: {
      data: "Hii this side sourav Poddar",
    },
  };

  // Fetch data on mount or when pid changes
  useEffect(() => {
    async function getData() {
      setLoading(true);
      try {
        // Use this for actual backend request
        // const response = await axios.get("/api/content-update", {
        //   params: { pid },
        //   headers: { "Content-Type": "application/json" },
        // });

        // Simulated response
        setFetchData(ResponseUserData.data.data);
        setText(ResponseUserData.data.data);
      } catch (err) {
        console.error(err);
        toast("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    }

    getData();
  }, [pid, ResponseUserData.data.data]);

  // Auto-save with debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      if (text.length !== fetchData.length) {
        console.log("sending the request");

        async function setData() {
          try {
            const response = await axios.post(
              "/api/content-update",
              {
                cid: null,
                pid: pid,
                data: { content: fetchData, type: "text", order: 0 },
              },
              {
                headers: { "Content-Type": "application/json" },
              }
            );

            if (!response.status) {
              toast("Error Occurred. Refresh Again!");
              throw new Error(response.data.message);
            }

            setText(fetchData);
            toast("Updated Successfully");
          } catch (err) {
            console.error(err);
            toast(err?.response?.data?.message || "Unknown error");
            setFetchData(text); // rollback to previous
          }
        }

        setData();
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [fetchData, text, pid]); // <-- FIXED: added `text` and `pid`

  return (
    <Textarea
      className="w-3/3 h-3/3 focus:outline-none"
      placeholder="Enter your content here..."
      value={fetchData}
      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>): void => {
        setFetchData(e.target.value);
      }}
      disabled={loading}
    />
  );
}
