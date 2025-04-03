import prisma from "@/config/prisma";
import { UserData } from "@/lib/utils";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  // const url = new URL(req.url);
  const user = await currentUser();
  const userEmail = user?.emailAddresses[0].emailAddress;

  // const privateField = url.searchParams.get("private");

  try {
    const response = await prisma.pages.findMany({
      where: {
        email: userEmail,
        // private: privateField === "true" ? true : false,
      },
    });

    const responseData: UserData = {
      items: [
        { name: "Private Page", items: [] },
        { name: "Favourite Page", items: [] },
      ],
    };

    response.forEach((item) => {
      if (item.private) {
        responseData.items[0].items.push({ title: item.title, url: item.pid });
      } else {
        responseData.items[1].items.push({ title: item.title, url: item.pid });
      }
    });

    return new Response(
      JSON.stringify({
        message: "GOT the data",
        response: responseData,
        success: true,
      }),
      {
        status: 200,
      }
    );
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ message: err, success: false }), {
      status: 400,
    });
  }
}
