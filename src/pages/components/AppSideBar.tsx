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
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  AudioWaveform,
  BadgePlus,
  ChevronRight,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
} from "lucide-react";
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

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    // {
    //   title: "Playground",
    //   url: "#",
    //   icon: SquareTerminal,
    //   isActive: true,
    //   items: [
    //     {
    //       title: "History",
    //       url: "#",
    //     },
    //     {
    //       title: "Starred",
    //       url: "#",
    //     },
    //     {
    //       title: "Settings",
    //       url: "#",
    //     },
    //   ],
    // },
    // {
    //   title: "Models",
    //   url: "#",
    //   icon: Bot,
    //   items: [
    //     {
    //       title: "Genesis",
    //       url: "#",
    //     },
    //     {
    //       title: "Explorer",
    //       url: "#",
    //     },
    //     {
    //       title: "Quantum",
    //       url: "#",
    //     },
    //   ],
    // },
    // {
    //   title: "Documentation",
    //   url: "#",
    //   icon: BookOpen,
    //   items: [
    //     {
    //       title: "Introduction",
    //       url: "#",
    //     },
    //     {
    //       title: "Get Started",
    //       url: "#",
    //     },
    //     {
    //       title: "Tutorials",
    //       url: "#",
    //     },
    //     {
    //       title: "Changelog",
    //       url: "#",
    //     },
    //   ],
    // },
    // {
    //   title: "Settings",
    //   url: "#",
    //   icon: Settings2,
    //   items: [
    //     {
    //       title: "General",
    //       url: "#",
    //     },
    //     {
    //       title: "Team",
    //       url: "#",
    //     },
    //     {
    //       title: "Billing",
    //       url: "#",
    //     },
    //     {
    //       title: "Limits",
    //       url: "#",
    //     },
    //   ],
    // },
    {
      title: "Private Pages",
      url: "#",
      isActive: true,
      items: [
        { title: "1st Page", url: "23ojnsfd" },
        { title: "2nd Page", url: "312iojba" },
      ],
    },
    {
      title: "Favourite Pages",
      url: "#",
      items: [
        { title: "1st Page", url: "aawdasedas" },
        { title: "2nd Page", url: "aodho23" },
      ],
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
};

export default function AppSideBar() {
  // upon successfull connection fetch the use Detaails

  // fetch details from the user
  useEffect(() => {}, []);

  return (
    <>
      <Sidebar collapsible="icon">
        <SidebarHeader>Header Content</SidebarHeader>
        <SidebarContent>
          <Pages items={data.navMain} />
        </SidebarContent>
        <SidebarFooter>Footer Content</SidebarFooter>
      </Sidebar>
    </>
  );
}

export function Pages({
  items,
}: {
  items: {
    url: string;
    items?: {
      title: string;
      content: string;
      url: string;
    }[];
  }[];
}) {
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
                    <SidebarMenuSubItem key={subItem.title}>
                      <SidebarMenuSubButton asChild>
                        <a href={subItem.url}>
                          <span className="overflow-hidden text-ellipsis">
                            {subItem.title}
                          </span>
                        </a>
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
                    <SidebarMenuSubItem key={subItem.title}>
                      <SidebarMenuSubButton asChild>
                        <a href={subItem.url}>
                          <span className="overflow-hidden text-ellipsis">
                            {subItem.title}
                          </span>
                        </a>
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

      console.log(response.data);
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
