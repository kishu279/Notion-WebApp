"use client";

import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function MainTextArea() {
  const [text, setText] = useState<string>("");

  // fetchin the data

  // Debounce for saving the data in the text area
  useEffect(() => {
    const timer = setTimeout(async () => {
      console.log(text);
      const response = await axios.post(
        "/api/content-update",
        {
          pageContent: text,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response);
    }, 1000);

    return () => clearTimeout(timer);
  }, [text]);

  return (
    <>
      <Textarea
        value={text}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
          setText(e.target.value)
        }
      />
    </>
  );
}
