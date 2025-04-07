import { currentUser } from "@clerk/nextjs/server";

export default async function NotionAdverPage() {
  const user = await currentUser();
  // console.log("User : ", user);
  return (
    <>
      <div>
        <div className="border h-[100px] text-5xl">NOTION</div>
      </div>
    </>
  );
}
