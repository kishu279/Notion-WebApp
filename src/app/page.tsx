import { LandingPageOnSignIn } from "@/pages/LandingPage";
import { SignedOut } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";

import { redirect } from "next/navigation";

export default async function Page() {
  const { userId } = await auth();

  if (userId) {
    // revalidatePath("/notion");
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
