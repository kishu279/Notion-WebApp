import { LandingPageOnSignIn } from "@/pages/LandingPage";
import { SignedIn, SignedOut } from "@clerk/nextjs";

export default function Page() {
  return (
    <>
      <SignedOut>
        <LandingPageOnSignIn />
      </SignedOut>
      <SignedIn>Hii there HomePage here</SignedIn>
    </>
  );
}
