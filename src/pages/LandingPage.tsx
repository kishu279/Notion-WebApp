import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

import { SignInButton, SignUpButton } from "@clerk/nextjs";
import AppSideBar from "./components/AppSideBar";
import { Divide } from "lucide-react";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@radix-ui/react-separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Textarea } from "@/components/ui/textarea";

// Landing Page without signin
export function LandingPageOnSignIn() {
  return (
    <>
      <div>
        {/* Upper Box */}
        <div className="flex  place-items-center h-[80px]">
          <p className="ml-[40px] text-[24px] font-bold">Notion</p>
          {/* Navigation Flow */}
          <div className="ml-[30px] ">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Item One</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[300px] lg:grid-cols-[.75fr_1fr]"></ul>
                  </NavigationMenuContent>
                  <NavigationMenuTrigger>Item One</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[300px] lg:grid-cols-[.75fr_1fr]"></ul>
                  </NavigationMenuContent>
                  <NavigationMenuTrigger>Item One</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[300px] lg:grid-cols-[.75fr_1fr]"></ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
          {/* SignUp Flow */}
          <div className="right-[100px] absolute gap-4 flex">
            <button className="p-3 rounded-2xl hover:bg-gray-300">
              <SignUpButton />
            </button>
            <button className="p-3 rounded-2xl hover:bg-gray-300">
              <SignInButton />
            </button>
          </div>
        </div>

        {/* Main Body Content */}
        <div className="select-none">
          <p className="text-[150px] font-black font-serif ml-[200px] mt-[50px] ">
            NOTION
          </p>
          <p className="text-[50px] font-serif ml-[200px] -mt-[50px] font-stretch-extra-expanded">
            Create, Collaborate, and Stay Productive
          </p>
        </div>
      </div>
    </>
  );
}

export function NotionMainPage() {
  return (
    <SidebarProvider>
      <AppSideBar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width, height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div
            className="flex gap-2 items-center px-4
          "
          >
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4 " />

            {/* Breadcrunmbs */}
          </div>
        </header>

        <div>{/* content */}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
