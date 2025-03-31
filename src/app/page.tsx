import { LandingPageOnSignIn, NotionMainPage } from "@/pages/LandingPage";
import { SignedIn, SignedOut } from "@clerk/nextjs";

export default function Page() {
  return (
    <>
      <SignedOut>
        <LandingPageOnSignIn />
      </SignedOut>
      <SignedIn>
        <NotionMainPage />
      </SignedIn>
    </>
  );
}
