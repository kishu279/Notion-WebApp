import NotionDynamicPage from "@/pages/DynamicPage";
import NotionAdverPage from "@/pages/NotionAdverPage";

interface PageProps {
  searchParams: Promise< {pid:string}> ;
}

export default async  function Page({ searchParams }: PageProps) {
  const pid =  (await (searchParams)).pid

  if (!pid) {
    return <NotionAdverPage />;
  }

  return <NotionDynamicPage pid={pid as string} />;
}