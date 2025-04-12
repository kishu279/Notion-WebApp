import { LandingPageOnSignIn } from "@/pages/LandingPage";
import { SignedOut } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";

import { redirect } from "next/navigation";

export default async function Page() {
  const user = await currentUser();

  if (user) {
    redirect("/notion");
  }

  return (
    <>
      <SignedOut>
        <LandingPageOnSignIn />
      </SignedOut>
    </>
  );
}
