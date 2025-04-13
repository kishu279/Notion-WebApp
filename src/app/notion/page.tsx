import NotionDynamicPage from "@/pages/DynamicPage";
import NotionAdverPage from "@/pages/NotionAdverPage";

interface PageProps {
  searchParams?: Record<string, string | string[] | undefined>;
}

export default function Page({ searchParams }: PageProps) {
  const pid = searchParams?.pid;

  if (!pid) {
    return <NotionAdverPage />;
  }

  return <NotionDynamicPage pid={pid as string} />;
}
