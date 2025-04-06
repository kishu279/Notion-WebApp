"use client";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { BadgePlus, ChevronRight } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import axios from "axios";
import pagesListSingletonModule from "@/lib/utils";
import type { UserData } from "@/lib/utils";
import Link from "next/link";

export default function AppSideBar() {
  // upon successfull connection fetch the use Detaails
  const userData = pagesListSingletonModule.getInstance();
  const [loading, setLoading] = useState(true);

  // fetch the data
  async function getData() {
    try {
      const response = await axios.get("/api/pages-created", {
        headers: { "Content-Type": "application/json" },
      });

      const data = response.data.response;
      userData.setPrivateField(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Sidebar collapsible="icon" className={loading ? "blur" : "bg-amber-300"}>
        <SidebarHeader>Header Content</SidebarHeader>
        <SidebarContent>
          <Pages items={userData.getPrivateField().items} />
        </SidebarContent>
        <SidebarFooter>Footer Content</SidebarFooter>
      </Sidebar>
    </>
  );
}

export function Pages({ items }: UserData) {
  const [addPages, setAddPages] = useState(false);

  useEffect(() => {
    setAddPages(true);
  }, []);

  return (
    <>
      <SidebarGroup>
        <SidebarGroupLabel>Pages</SidebarGroupLabel>

        <SidebarMenu>
          <Collapsible asChild defaultOpen={true} className="group/collapsible">
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton
                  tooltip={"Private Pages"}
                  className="flex justify-between"
                >
                  <p>
                    {/* {items[0].title} */}
                    Private Pages
                  </p>
                  {/* create pages */}
                  <div className="flex items-center gap-3">
                    {addPages && <AlertDialogDemo />}
                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90 " />
                  </div>
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {items[0].items?.map((subItem) => (
                    <SidebarMenuSubItem key={subItem.url}>
                      <SidebarMenuSubButton asChild>
                        <Link href={`/notion/${subItem.url}`}>
                          <span className="overflow-hidden text-ellipsis">
                            {subItem.title}
                          </span>
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        </SidebarMenu>

        {/* Favourite Pages */}
        <SidebarMenu>
          <Collapsible
            asChild
            defaultOpen={false}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton
                  tooltip={"Favourite Pages"}
                  className="flex justify-between"
                >
                  <p className=" text-ellipsis overflow-hidden whitespace-nowrap">
                    Favourite Pages
                  </p>
                  <div>
                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </div>
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {items[1].items?.map((subItem) => (
                    <SidebarMenuSubItem key={subItem.url}>
                      <SidebarMenuSubButton asChild>
                        <Link href={`/notion/${subItem.url}`}>
                          <span className="overflow-hidden text-ellipsis">
                            {subItem.title}
                          </span>
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        </SidebarMenu>

        {/* Settings */}
      </SidebarGroup>
    </>
  );
}

export function AlertDialogDemo() {
  const [pageName, setPageName] = useState<string>("");
  // const { user } = useUser();

  async function handleSubmit() {
    console.log("clicked");

    if (pageName.length === 0) {
      console.error("input field should not be empty");
      return;
    }

    // send the request to the backend
    try {
      const response = await axios.post("/api/create", {
        pageName: pageName,
      });

      if (response.status) {
        console.log("success");
      } else {
        console.error("ERR");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setPageName("");
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <BadgePlus size={20} className="ml-2" />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Enter the name of the page</AlertDialogTitle>
          <AlertDialogDescription>
            <Input
              placeholder="Name..."
              value={pageName}
              onChange={(e) => {
                setPageName(e.target.value);
              }}
            />
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleSubmit}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
