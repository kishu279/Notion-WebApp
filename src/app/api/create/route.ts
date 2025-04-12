import prisma from "@/config/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const {
    email,
    title,
    ppid,
  }: { email: string; title: string; ppid?: string } = await req.json();

  try {
    // find for the user exists
    if (!(await prisma.user.findUnique({ where: { email: email } }))) {
      const user = await currentUser();

      await prisma.user.create({
        data: {
          email: email,
          name: user?.fullName as string,
          // name: "Sourav",
        },
      });

      console.log("User Createed");
    }

    // crate page
    const response = await prisma.pages.create({
      data: { email: email as string, title: title, parentPageId: ppid },
    });

    if (!response) {
      return new Response(
        JSON.stringify({
          message: "ERROR while creating pages",
          success: false,
        }),
        { status: 400 }
      );
    }

    return new Response(
      JSON.stringify({
        message: "Created Successfully",
        pid: response.pid,
        success: true,
      }),
      {
        status: 200,
      }
    );
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ message: "Error creating page", success: false }), {
      status: 400,
    });
  }
}
