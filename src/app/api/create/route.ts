import prisma from "@/config/prisma";
import { currentUser } from "@clerk/nextjs/server";

// Page Creation
export async function POST(req: Request) {
  // protected the route
  // await auth.protect();

  const user = await currentUser();
  const userEmail: string = user?.emailAddresses[0].emailAddress as string;
  const userName: string = user?.fullName as string;

  try {
    const userFound = await prisma.user.findUnique({
      where: { email: userEmail },
    });

    if (!userFound) {
      const newUser = await prisma.user.create({
        data: { name: userName, email: userEmail },
      });

      if (!newUser) {
        return new Response(
          JSON.stringify({ message: "User Creation Failed", success: false }),
          { status: 400 }
        );
      }
    }

    const { pageName }: { pageName: string } = await req.json();

    const response = await prisma.pages.create({
      data: {
        title: pageName,
        content: "",
        email: userFound?.email as string,
        private: true,
      },
    });

    if (!response) {
      return new Response(
        JSON.stringify({ message: "ERR OCCURRED", success: false }),
        { status: 400 }
      );
    }

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
