import prisma from "@/config/prisma";
import { auth, currentUser } from "@clerk/nextjs/server";

export async function POST(req: Request) {
  // protected the route
  // await auth.protect();

  const user = await currentUser();
  const userEmail = user?.emailAddresses[0].emailAddress;
  const userName = user?.fullName;

  try {
    const userFound = await prisma.user.findUnique({
      where: { email: userEmail },
    });

    if (!userFound) {
      const newUser = await prisma.user.create({
        data: { name: userName, email: userEmail },
      });

      console.log("New User: ", newUser);
    }

    const { pageName }: { pageName: string } = await req.json();

    const newPage = await prisma.pages.create({
      data: {
        title: pageName,
        content: "Here is the Content",
        email: userFound?.email,
      },
    });

    return Response.json(
      {
        message: "Page Created Successfully",
        success: true,
      },
      {
        status: 200,
      }
    );
  } catch (err) {
    console.error(err);
    return Response.json(
      {
        message: err,
        success: false,
      },
      {
        status: 500,
      }
    );
  }
}
