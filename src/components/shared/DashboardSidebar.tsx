"use client"

import * as React from "react"
import {
  Plus,
  Minus,
  Briefcase
} from "lucide-react"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
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
} from "@/components/ui/sidebar"
import { Separator } from "../ui/separator"
import { dashboardNavigation } from "@/core/constants/dashboard-navigation.const"
import { recruiterNavigation } from "@/core/constants/recruiter-navigation.const"
import Link from "next/link"
import { usePathname } from "next/navigation"
// import type { MenuSection, MenuItem } from "@/core/constants/dashboard-navigation.const"
// import type { RecruiterMenuSection, RecruiterMenuItem } from "@/core/constants/recruiter-navigation.const"

interface DashboardSidebarProps extends React.ComponentProps<typeof Sidebar> {
  userRole?: 'admin' | 'recruiter' | 'candidate';
}

export function DashboardSidebar({ userRole = 'recruiter', ...props }: DashboardSidebarProps) {
  const pathname = usePathname()

  // Get navigation items based on user role
  const getNavigationItems = () => {
    if (userRole === 'recruiter') {
      return recruiterNavigation.navMain.map(section => ({
        ...section,
        isActive: pathname === section.url,
        items: section.items.map(item => ({
          ...item,
          isActive: pathname === item.url
        }))
      }));
    }

    return dashboardNavigation.navMain.filter(section =>
      section.roles?.includes(userRole)
    ).map(section => ({
      ...section,
      isActive: pathname === section.url,
      items: section.items.filter(item =>
        item.roles?.includes(userRole)
      ).map(item => ({
        ...item,
        isActive: pathname === item.url
      }))
    }));
  };

  const navigationItems = getNavigationItems();

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild tooltip="Jobs Platform">
              <a href="/recruiter/dashboard">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Briefcase className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">JobsBoard</span>
                  <span className="text-xs text-muted-foreground">
                    {userRole.charAt(0).toUpperCase() + userRole.slice(1)} Portal
                  </span>
                </div>
              </a>
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
                defaultOpen={item.title === 'Dashboard'}
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton tooltip={item.title} className={`hover:text-primaryHex-600 dark:hover:text-primaryHex-400 transition-colors ${item.isActive ? 'text-primaryHex-600 dark:text-primaryHex-400 font-medium' : ''}`}>
                      {item.icon && <item.icon className={`mr-2 size-4 transition-colors ${item.isActive ? 'text-primaryHex-600 dark:text-primaryHex-400' : ''}`} />}
                      {item.items?.length > 0
                        ? (
                          <>
                            <Link href={item.url}>{item.title}</Link>
                            <Plus className="ml-auto group-data-[state=open]/collapsible:hidden" />
                            <Minus className="ml-auto group-data-[state=closed]/collapsible:hidden" />
                          </>
                        )
                        : <Link href={item.url}>{item.title}</Link>}
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  {item.items?.length ? (
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.items.map((subItem) => (
                          <SidebarMenuSubItem key={subItem.title}>
                            <SidebarMenuSubButton
                              asChild
                              isActive={subItem.isActive}
                              className={`min-h-[40px] py-1.5 hover:text-primaryHex-600 dark:hover:text-primaryHex-400 transition-colors ${subItem.isActive ? 'text-primaryHex-600 dark:text-primaryHex-400 font-medium' : ''}`}
                            >
                              <a href={subItem.url}>
                                {subItem.icon && <subItem.icon className="mr-2 size-4" />}
                                {subItem.title}
                              </a>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  ) : null}
                </SidebarMenuItem>
              </Collapsible>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
      <Separator />
      <SidebarFooter className="text-center">© {new Date().getFullYear()} JobsBoard</SidebarFooter>
    </Sidebar>
  )
}