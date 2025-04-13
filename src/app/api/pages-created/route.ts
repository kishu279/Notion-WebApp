import prisma from "@/config/prisma";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const { email }: { email: string } = await req.json();

  if (!email) {
    return new Response(
      JSON.stringify({
        message: "email not found on the database",
        success: false,
      }),
      {
        status: 400,
      }
    );
  }

  try {
    // Find for pages
    const UserPages = await prisma.pages.findMany({
      where: { email: email },
    });

    // If no pages created then there will be no content
    if (UserPages.length == 0) {
      return new Response(
        JSON.stringify({
          message: "Pages not created",
          data: { pages: [], contents: [], success: false },
        }),
        { status: 200 }
      );
    }

    const pagesData: {
      pid: string;
      ppid: string | null;
      private: boolean;
      title: string;
    }[] = [];

    const UserPagesContents: {
      pid: string;
      cid: string;
      type: string;
      content: string;
      order: number;
    }[] = [];

    for (const page of UserPages) {
      // arrange and store the data
      pagesData.push({
        pid: page.pid,
        ppid: page.parentPageId,
        private: page.private,
        title: page.title,
      });

      //  Fetching the contents
      const contents = await prisma.contents.findMany({
        where: { pid: page.pid },
      });

      // arrange the contents
      contents.forEach((content) => {
        UserPagesContents.push({
          pid: page.pid,
          cid: content.cid,
          type: content.type,
          content: content.content,
          order: content.order,
        });
      });
    }

    return new Response(
      JSON.stringify({
        message: "Pages",
        data: {
          // workspace
          pages: pagesData,
          contents: UserPagesContents,
        },
        success: true,
      }),
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ message: err, success: false }), {
      status: 400,
    });
  }
}
