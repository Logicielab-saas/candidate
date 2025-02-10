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
import type { MenuSection, MenuItem } from "@/core/constants/dashboard-navigation.const"

interface DashboardSidebarProps extends React.ComponentProps<typeof Sidebar> {
  userRole?: 'admin' | 'recruiter' | 'candidate';
}

export function DashboardSidebar({ userRole = 'candidate', ...props }: DashboardSidebarProps) {
  // Filter menu items based on user role
  const filteredNavMain = dashboardNavigation.navMain.filter(section =>
    section.roles?.includes(userRole)
  ).map(section => ({
    ...section,
    items: section.items.filter(item =>
      item.roles?.includes(userRole)
    )
  }));

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild tooltip="Jobs Platform">
              <a href="/dashboard">
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
            {filteredNavMain.map((item: MenuSection) => (
              <Collapsible
                key={item.title}
                defaultOpen={item.title === 'Dashboard'}
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton tooltip={item.title}>
                      {item.icon && <item.icon className="mr-2 size-4" />}
                      {item.title}
                      {item.items?.length > 0 && (
                        <>
                          <Plus className="ml-auto group-data-[state=open]/collapsible:hidden" />
                          <Minus className="ml-auto group-data-[state=closed]/collapsible:hidden" />
                        </>
                      )}
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  {item.items?.length ? (
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.items.map((subItem: MenuItem) => (
                          <SidebarMenuSubItem key={subItem.title}>
                            <SidebarMenuSubButton
                              asChild
                              isActive={subItem.isActive}
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