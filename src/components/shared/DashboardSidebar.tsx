"use client";

import {
  Plus,
  Minus,
  Briefcase,
  HelpCircle,
  Settings,
  LogOut,
} from "lucide-react";
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
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import { Separator } from "../ui/separator";
import { recruiterNavigation } from "@/core/constants/recruiter-navigation.const";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ThemeButton } from "./ThemeButton";
import { Button } from "../ui/button";

interface DashboardSidebarProps {
  userRole?: "recruiter";
}

// Base styles that won't change between server and client
const activeItemClass =
  "text-primaryHex-600 dark:text-primaryHex-400 font-medium";
const hoverClass =
  "hover:text-primaryHex-600 dark:hover:text-primaryHex-400 transition-colors";

// Get navigation items based on user role
const getNavigationItems = (pathname: string) => {
  return recruiterNavigation.navMain.map((section) => {
    const items =
      section.items?.length > 0
        ? section.items.map((item) => ({
            ...item,
            isActive: pathname === item.url,
          }))
        : [];

    return {
      ...section,
      isActive:
        items.length > 0
          ? items.some((item) => item.isActive)
          : pathname === section.url,
      items,
    };
  });
};

export function DashboardSidebar({
  userRole = "recruiter",
  ...props
}: DashboardSidebarProps) {
  const pathname = usePathname();
  const { state } = useSidebar();

  const navigationItems = getNavigationItems(pathname);

  return (
    <>
      <Sidebar collapsible="icon" {...props}>
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" asChild tooltip="Postuly Platform">
                <Link href="/recruiter/dashboard">
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                    <Briefcase className="size-4" />
                  </div>
                  <div className="flex flex-col gap-0.5 leading-none">
                    <span className="font-semibold">Postuly</span>
                    <span className="text-xs text-muted-foreground">
                      {userRole.charAt(0).toUpperCase() + userRole.slice(1)}{" "}
                      Portal
                    </span>
                  </div>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <Collapsible
                  key={item.title}
                  defaultOpen={item.isActive || item.title === "Dashboard"}
                  className="group/collapsible"
                >
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton
                        tooltip={item.title}
                        className="w-full transition-colors"
                        asChild
                      >
                        <Link
                          href={item.url}
                          className={cn(
                            "group/main flex w-full items-center hover:bg-accent/50",
                            item.isActive ? activeItemClass : ""
                          )}
                        >
                          {item.icon && (
                            <item.icon
                              className={cn(
                                "mr-2 size-4 transition-colors group-hover/main:stroke-primaryHex-600 dark:group-hover/main:stroke-primaryHex-400",
                                item.isActive &&
                                  "[&>*]:stroke-primaryHex-600 dark:[&>*]:stroke-primaryHex-400"
                              )}
                            />
                          )}
                          <span
                            className={cn(
                              "flex-1 group-hover/main:text-primaryHex-600 dark:group-hover/main:text-primaryHex-400",
                              item.isActive ? activeItemClass : ""
                            )}
                          >
                            {item.title}
                          </span>
                          {item.items?.length > 0 && (
                            <>
                              <Plus className="ml-auto group-data-[state=open]/collapsible:hidden group-hover/main:stroke-primaryHex-600 dark:group-hover/main:stroke-primaryHex-400" />
                              <Minus className="ml-auto group-data-[state=closed]/collapsible:hidden group-hover/main:stroke-primaryHex-600 dark:group-hover/main:stroke-primaryHex-400" />
                            </>
                          )}
                        </Link>
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    {item.items?.length ? (
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.items.map((subItem) => {
                            const isSubItemActive = subItem.isActive;
                            return (
                              <SidebarMenuSubItem key={subItem.title}>
                                <SidebarMenuSubButton
                                  asChild
                                  isActive={isSubItemActive}
                                  className="w-full transition-colors"
                                >
                                  <Link
                                    href={subItem.url}
                                    className={cn(
                                      "group/item flex min-h-[40px] w-full items-center py-1.5 hover:bg-accent/50",
                                      isSubItemActive
                                        ? activeItemClass
                                        : " hover:text-primaryHex-600 dark:hover:text-primaryHex-400"
                                    )}
                                  >
                                    {subItem.icon && (
                                      <subItem.icon
                                        className={cn(
                                          "mr-2 size-4 transition-colors group-hover/item:stroke-primaryHex-600 dark:group-hover/item:stroke-primaryHex-400",
                                          isSubItemActive &&
                                            "[&>*]:stroke-primaryHex-600 dark:[&>*]:stroke-primaryHex-400"
                                        )}
                                      />
                                    )}
                                    <span
                                      className={` group-hover/item:text-primaryHex-600 dark:group-hover/item:text-primaryHex-400 ${hoverClass} ${
                                        isSubItemActive ? activeItemClass : ""
                                      }`}
                                    >
                                      {subItem.title}
                                    </span>
                                  </Link>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            );
                          })}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    ) : null}
                  </SidebarMenuItem>
                </Collapsible>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>

        <div className="mt-auto">
          <SidebarGroup>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  tooltip="Help & Support"
                  asChild
                  className="hover:text-primaryHex-600 dark:hover:text-primaryHex-400 hover:bg-accent/50"
                >
                  <Link href="#">
                    <HelpCircle className="size-4" />
                    <span>Help & Support</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  tooltip="Settings"
                  asChild
                  className="hover:text-primaryHex-600 dark:hover:text-primaryHex-400 hover:bg-accent/50"
                >
                  <Link href="#">
                    <Settings className="size-4" />
                    <span>Settings</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
          <Separator className="my-2" />
          <SidebarFooter className="py-2">
            <div
              className={cn(
                state !== "collapsed" &&
                  "flex flex-row items-center justify-between gap-2 px-2"
              )}
            >
              <ThemeButton />

              <Button
                variant="ghost"
                size="sm"
                className={cn(state !== "collapsed" ? "w-9" : "w-9 mt-2")}
              >
                <Link href="#">
                  <LogOut />
                </Link>
              </Button>
            </div>
          </SidebarFooter>
        </div>
        <SidebarRail />
      </Sidebar>
    </>
  );
}
