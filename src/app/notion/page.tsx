"use client";

import NotionDynamicPage from "@/pages/components/DynamicPage";
import NotionAdverPage from "@/pages/components/NotionAdverPage";
import { useSearchParams } from "next/navigation";

export default function Page() {
  const searchParams = useSearchParams();
  const pid = searchParams?.get("pid");

  if (!pid) {
    return (
      <>
        <NotionAdverPage />
      </>
    );
  }

  return (
    <>
      <NotionDynamicPage pid={pid} />
    </>
  );
}
