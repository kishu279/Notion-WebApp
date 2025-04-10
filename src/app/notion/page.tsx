import NotionDynamicPage from "@/pages/DynamicPage";
import NotionAdverPage from "@/pages/NotionAdverPage";

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { pid } = searchParams;

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
