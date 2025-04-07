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
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  AudioWaveform,
  BadgeCheck,
  BadgePlus,
  Bell,
  ChevronRight,
  ChevronsUpDown,
  Command,
  CreditCard,
  GalleryVerticalEnd,
  LogOut,
  Plus,
  Sparkles,
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
import Link from "next/link";
import { toast } from "sonner";

import { useUser } from "@clerk/nextjs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface UserDetails {
  name: string | undefined | null;
  email: string | undefined;
  image: string | undefined;
}

export default function AppSideBar() {
  const [pages, setPages] =
    useState<{ name: string; items: { title: string; url: string }[] }[]>();
  const [loading, setLoading] = useState(false); // spiner
  const { user } = useUser();
  console.log(user);

  const userDetails: UserDetails = {
    name: user?.fullName,
    email: user?.emailAddresses[0].emailAddress,
    image: user?.imageUrl,
  };

  const WorkSpace = {
    workspace: [
      {
        name: "Sourav",
        logo: GalleryVerticalEnd,
        plan: "Free",
      },
      { name: "SUBH", logo: AudioWaveform, plan: "free" },
      {
        name: "Evil Corp.",
        logo: Command,
        plan: "Free",
      },
    ],
  };

  // fetch the data
  async function getData() {
    try {
      const response = await axios.get("/api/pages-created", {
        headers: { "Content-Type": "application/json" },
      });

      const fetchData = response.data.response;
      // userData.setPrivateField(data);
      setPages(fetchData);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    setLoading(true)
    getData();
  }, []);

  if (loading) {
    return <MySideBarSkeleton />;
  }

  return (
    <Sidebar
      collapsible="icon"
      variant="floating"
      className="flex flex-col h-full"
    >
      <SidebarHeader>
        <NavWorkSpaceSwitcher workspace={WorkSpace.workspace} />
      </SidebarHeader>
      <SidebarContent className="flex-grow overflow-y-auto">
        {!pages ? (
          <div className="p-4 text-gray-600">Loading...</div>
        ) : (
          <Pages items={pages.items} refreshFunction={getData} />
        )}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={userDetails} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

function Pages({
  items,
  refreshFunction,
}: {
  items: { name: string; items: { title: string; url: string }[] }[];
  refreshFunction: () => void;
}) {
  return (
    <>
      <SidebarGroup>
        <SidebarGroupLabel>Pages</SidebarGroupLabel>

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
                        <Link href={`/notion?pid=${subItem.url}`}>
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
                    <AlertDialogDemo refreshFunction={refreshFunction} />
                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90 " />
                  </div>
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {items[0].items?.map((subItem) => (
                    <SidebarMenuSubItem key={subItem.url}>
                      <SidebarMenuSubButton asChild>
                        <Link href={`/notion?pid=${subItem.url}`}>
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

function AlertDialogDemo({ refreshFunction }: { refreshFunction: () => void }) {
  const [pageName, setPageName] = useState<string>("");

  async function handleSubmit() {
    console.log("clicked");

    if (pageName.length === 0) {
      console.error("Input field should not be empty");
      return;
    }

    // send the request to the backend
    try {
      const response = await axios.post("/api/create", {
        pageName: pageName,
      });

      if (!response.status) {
        console.error("ERR");
        return;
      }

      toast(response.data.message);

      // we can also redirect it to the page which is currrently created
      // router.push("/notion");
      refreshFunction();
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

function NavUser({ user }: { user: UserDetails }) {
  const { isMobile } = useSidebar();

  return (
    <>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={user.image} alt={user.name} />
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{user.name}</span>
                  <span className="truncate text-xs">{user.email}</span>
                </div>
                <ChevronsUpDown className="ml-auto size-4" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
              side={isMobile ? "bottom" : "right"}
              align="end"
              sideOffset={4}
            >
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src={user.image} alt={user.name} />
                    <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">{user.name}</span>
                    <span className="truncate text-xs">{user.email}</span>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <Sparkles />
                  Upgrade to Pro
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <BadgeCheck />
                  Account
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <CreditCard />
                  Billing
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Bell />
                  Notifications
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </>
  );
}

function NavWorkSpaceSwitcher({
  workspace,
}: {
  workspace: {
    name: string;
    logo: React.ElementType;
    plan: string;
  }[];
}) {
  const { isMobile } = useSidebar();
  const [activeTeam, setActiveTeam] = useState(workspace[0]);

  return (
    <>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <activeTeam.logo className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">
                    {activeTeam.name}
                  </span>
                  <span className="truncate text-xs">{activeTeam.plan}</span>
                </div>
                <ChevronsUpDown className="ml-auto" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
              align="start"
              side={isMobile ? "bottom" : "right"}
              sideOffset={4}
            >
              <DropdownMenuLabel className="text-xs text-muted-foreground">
                Teams
              </DropdownMenuLabel>
              {workspace.map((team, index) => (
                <DropdownMenuItem
                  key={team.name}
                  onClick={() => setActiveTeam(team)}
                  className="gap-2 p-2"
                >
                  <div className="flex size-6 items-center justify-center rounded-sm border">
                    <team.logo className="size-4 shrink-0" />
                  </div>
                  {team.name}
                  <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem className="gap-2 p-2">
                <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                  <Plus className="size-4" />
                </div>
                <div className="font-medium text-muted-foreground">
                  Add team
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </>
  );
}

function MySideBarSkeleton() {
  return (
    <SidebarMenu className="w-[250px]">
      {Array.from({ length: 10 }).map((_, index) => (
        <SidebarMenuItem key={index}>
          <SidebarMenuSkeleton />
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
