import type { LucideIcon } from "lucide-react"
import {
  LayoutDashboard,
  Users,
  Settings,
  Mail,
  Search,
  BookMarked,
  FileText,
  Briefcase,
  UserPlus,
  MessageSquare,
} from "lucide-react"

export interface MenuItem {
  title: string
  url: string
  icon?: LucideIcon
  isActive?: boolean
  roles?: string[]
}

export interface MenuSection {
  title: string
  url: string
  icon?: LucideIcon
  items: MenuItem[]
  roles?: string[]
}

export interface DashboardNavigation {
  navMain: MenuSection[]
}

export const dashboardNavigation: DashboardNavigation = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
      items: [],
      roles: ['admin', 'candidate']
    },
    {
      title: "User Management",
      url: "#",
      icon: Users,
      roles: ['admin'],
      items: [
        {
          title: "Create User",
          url: "/admin/users/create",
          icon: UserPlus,
          roles: ['admin']
        },
        {
          title: "Manage Users",
          url: "/admin/users",
          icon: Users,
          roles: ['admin']
        }
      ]
    },
    {
      title: "Job Search",
      url: "#",
      icon: Search,
      roles: ['candidate'],
      items: [
        {
          title: "Find Jobs",
          url: "/candidate/jobs",
          icon: Briefcase,
          roles: ['candidate']
        },
        {
          title: "My Applications",
          url: "/candidate/applications",
          icon: FileText,
          roles: ['candidate']
        },
        {
          title: "Saved Jobs",
          url: "/candidate/saved",
          icon: BookMarked,
          roles: ['candidate']
        },
        {
          title: "Messages",
          url: "/candidate/messages",
          icon: MessageSquare,
          roles: ['candidate']
        }
      ]
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings,
      roles: ['admin', 'candidate'],
      items: [
        {
          title: "Profile Settings",
          url: "/settings/profile",
          icon: Settings,
          roles: ['admin', 'candidate']
        }
      ]
    }
  ]
}