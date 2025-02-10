import type { LucideIcon } from "lucide-react"
import {
  Building,
  Briefcase,
  FileText,
  UserCheck,
  MessageSquare,
  Settings,
  LayoutDashboard,
  Calendar,
  BarChart,
  Users,
  Bell,
  NotepadTextDashed,
} from "lucide-react"

export interface RecruiterMenuItem {
  title: string
  url: string
  icon?: LucideIcon
  isActive?: boolean
}

export interface RecruiterMenuSection {
  title: string
  url: string
  icon?: LucideIcon
  items: RecruiterMenuItem[]
}

export interface RecruiterNavigation {
  navMain: RecruiterMenuSection[]
}

export const recruiterNavigation: RecruiterNavigation = {
  navMain: [
    {
      title: "Tableau de bord",
      url: "/recruiter/dashboard",
      icon: LayoutDashboard,
      items: [],
    },
    {
      title: "Mes Annonces",
      url: "/recruiter/annonces",
      icon: Briefcase,
      items: [],
    },
    {
      title: "Candidatures reçues",
      url: "/recruiter/candidates",
      icon: UserCheck,
      items: [],
    },
    {
      title: "Entretiens",
      url: "/recruiter/interviews",
      icon: Calendar,
      items: [],
    },
    {
      title: "Statistiques",
      url: "/recruiter/stats",
      icon: BarChart,
      items: [],
    },
    {
      title: "Messagerie",
      url: "/recruiter/messages",
      icon: MessageSquare,
      items: [],
    },
    {
      title: "Paramètres",
      url: "#",
      icon: Settings,
      items: [
        {
          title: "Utilisateurs",
          url: "/recruiter/parametres/users",
          icon: Users,
        },
        {
          title: "Fiche d'entreprise",
          url: "/recruiter/parametres/company",
          icon: Building,
        },
        {
          title: "Paramétres de l'entreprise",
          url: "/recruiter/parametres/company-settings",
          icon: NotepadTextDashed,
        },
        {
          title: "Notifications",
          url: "/recruiter/parametres/notifications",
          icon: Bell,
        }
      ]
    }
  ]
}