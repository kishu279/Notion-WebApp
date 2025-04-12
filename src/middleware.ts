import {
  clerkMiddleware,
  ClerkMiddlewareAuth,
  createRouteMatcher,
} from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher([""]);

export default clerkMiddleware(async (auth: ClerkMiddlewareAuth, req) => {
  const { userId, redirectToSignIn } = await auth();
  // const user = await currentUser(); // not usable in middleware

  if (!userId && isProtectedRoute(req)) {
    return redirectToSignIn();
  }

  //  for specific routes
  // if (req.nextUrl.pathname === "/api/create") {
  //   // console.log("user is authenticated");
  //   // create user if not exists
  //   // check from prisma same email exists
  //   console.log(user);
  // }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
