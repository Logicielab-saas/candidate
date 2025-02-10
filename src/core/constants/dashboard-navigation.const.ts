import type { LucideIcon } from "lucide-react"
import {
  LayoutDashboard,
  Users,
  Briefcase,
  Building,
  FileText,
  UserPlus,
  Settings,
  Mail,
  Search,
  BookMarked,
  UserCheck,
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
      roles: ['admin', 'recruiter', 'candidate']
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
      title: "Recruiter Tools",
      url: "#",
      icon: Building,
      roles: ['recruiter'],
      items: [
        {
          title: "Post Job",
          url: "/recruiter/jobs/create",
          icon: Briefcase,
          roles: ['recruiter']
        },
        {
          title: "My Job Posts",
          url: "/recruiter/jobs",
          icon: FileText,
          roles: ['recruiter']
        },
        {
          title: "Applications",
          url: "/recruiter/applications",
          icon: UserCheck,
          roles: ['recruiter']
        },
        {
          title: "Messages",
          url: "/recruiter/messages",
          icon: MessageSquare,
          roles: ['recruiter']
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
          icon: Mail,
          roles: ['candidate']
        }
      ]
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings,
      roles: ['admin', 'recruiter', 'candidate'],
      items: [
        {
          title: "Profile Settings",
          url: "/settings/profile",
          icon: Settings,
          roles: ['admin', 'recruiter', 'candidate']
        }
      ]
    }
  ]
}