import prisma from "@/config/prisma";
import { NextRequest } from "next/server";

// Update the Content in those Pages
export async function POST(req: Request) {
  const pid = req.url.split("http://localhost:3000/api/content-update?pid=")[1];
  const { pageContent } = await req.json();

  try {
    await prisma.pages.update({
      where: { pid: pid }, // update should be used with unique field
      data: { content: pageContent },
    });

    return new Response(JSON.stringify({ message: "Updated", success: true }), {
      status: 200,
    });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ message: err, success: false }), {
      status: 500,
    });
  }
}

export async function GET(req: NextRequest) {
  // get the pid
  const searchParams = req.nextUrl.searchParams;
  const pid = searchParams.get("pid") as string; // page id

  console.log("getting request");
  try {
    const response = await prisma.pages.findUnique({ where: { pid: pid } });

    if (!response) {
      return Response.json(
        {
          message: "No Cotent Found",
          success: false,
        },
        { status: 400 }
      );
    }

    console.log("Response : ", response);

    return Response.json({
      message: "Content Found",
      success: true,
      data: response.content,
    });
  } catch (err) {
    console.error(err);
    return Response.json({ message: err, success: false }, { status: 400 });
  }
}
