"use client";

import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function NotionDynamicPage() {
  const [fetchData, setFetchData] = useState<string>("");
  const [text, setText] = useState<string>("");
  const params = useParams<{ pageid: string }>();
  const pageid = params?.pageid;
  const [, setLoading] = useState<boolean>(false);

  // send data
  async function setData() {
    console.log("sending the request");
  }

  async function getData() {
    setLoading(true);
    try {
      const response = await axios.get("/api/content-update", {
        params: {
          pid: pageid,
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
    } catch (err) {
      console.error(err);
      throw new Error(err as string);
    } finally {
      setLoading(false);
      console.log("Loaded Data: ", fetchData);
    }
  }

  // fetch the data
  useEffect(() => {
    getData();
  }, []);

  // useDebounce for delayed request
  useEffect(() => {
    const timer = setTimeout(() => {
      // check for the data it contains
      setData();
    }, 2000);

    return () => clearTimeout(timer);
  }, [text]);

  return (
    <>
      <Textarea
        className="w-3/3 h-3/3 "
        placeholder="Text ..."
        value={fetchData}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>): void => {
          setText(e.target.value);
        }}
      />
    </>
  );
}
