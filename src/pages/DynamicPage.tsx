"use client";

import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

export default function NotionDynamicPage({ pid }: { pid: string }) {
  const [fetchData, setFetchData] = useState<string>("");
  const [text, setText] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  // send data
  async function setData() {
    try {
      const response = await axios.post(
        "/api/content-update",
        {
          pageContent: fetchData,
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

      setText(fetchData);
      console.log(response.data.message);
      toast("Updated Successfully");
    } catch (err) {
      console.error(err);
      toast(err?.response.data.message);
      throw new Error(err?.response.data.message);
    }
  }

  async function getData() {
    try {
      const response = await axios.get("/api/content-update", {
        params: {
          pid: pid,
        },
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.status) {
        throw new Error(response.data.message);
      }

      setFetchData(response.data?.data);
      setText(response.data?.data);
    } catch (err) {
      console.error(err);
      toast(err.response.data.message);
      redirect("/notion");
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
        className="w-3/3 h-3/3 focus:outline-none"
        placeholder="Enter your cotent here..."
        value={fetchData}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>): void => {
          setFetchData(e.target.value);
        }}
        disabled={loading}
      />
    </>
  );
}
