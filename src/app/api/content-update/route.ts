import prisma from "@/config/prisma";
import { currentUser } from "@clerk/nextjs/server";

export async function POST(req: Request) {
  const user = await currentUser();
  const userEmail = user?.emailAddresses[0].emailAddress;
  const { pageContent } = await req.json();

  try {
    const pageResponse = await prisma.pages.update({
      where: { email: userEmail }, // update should be used with unique field
      data: { content: pageContent },
    });

    return new Response(
      { message: "Updated", success: true },
      {
        status: 200,
      }
    );
  } catch (err) {
    console.error(err);
    return new Response({ message: err, success: false }, { status: 500 });
  }
}
