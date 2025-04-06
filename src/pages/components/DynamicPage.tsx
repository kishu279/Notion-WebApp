"use client";

import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

export default function NotionDynamicPage({ pid }: { pid: string }) {
  const [fetchData, setFetchData] = useState<string>("");
  const [text, setText] = useState<string>("");
  const [, setLoading] = useState<boolean>(false);

  // send data
  async function setData() {
    try {
      const response = await axios.post(
        "/api/content-update",
        {
          pageContent: text,
        },
        {
          params: { pid: pid },
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.status) {
        toast("Error Occurred Refresh Again!!!");
        throw new Error(response.data.message);
      }

      console.log(response.data.message);
      toast("Updated Successfully");
    } catch (err) {
      console.error(err);
      throw new Error(err);
    }
  }

  async function getData() {
    setLoading(true);
    try {
      const response = await axios.get("/api/content-update", {
        params: {
          pid: pid,
        },
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log(response);

      if (!response.status) {
        throw new Error(response.data.message);
      }

      setFetchData(response.data?.data);
      setText(response.data?.data);
    } catch (err) {
      console.error(err);
      throw new Error(err as string);
    } finally {
      setLoading(false);
    }
  }

  // fetch the data
  useEffect(() => {
    getData();
  }, [, pid]);

  // useDebounce for delayed request
  useEffect(() => {
    const timer = setTimeout(() => {
      // check for the difference
      if (text.length !== fetchData.length) {
        console.log("sending the requyest");
        setData();
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [fetchData]);

  return (
    <>
      <Textarea
        className="w-3/3 h-3/3 "
        placeholder="Text ..."
        value={fetchData}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>): void => {
          setFetchData(e.target.value);
        }}
      />
    </>
  );
}
