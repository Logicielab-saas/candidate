# Postuly Platform

A modern recruitment platform built with Next.js 15, TypeScript, and Shadcn UI, designed to streamline the hiring process by connecting recruiters with candidates.

## 🚀 Features

- **Multi-Role System**:
  - Admin: System management and oversight
  - Recruiter: Job posting and candidate management
  - Candidate: Profile management and job applications

- **Key Functionalities**:
  - Advanced candidate filtering and search
  - Interview scheduling and management
  - Real-time chat interface
  - Comprehensive candidate tracking
  - Responsive dashboard interfaces

## 🛠️ Tech Stack

- **Frontend**: Next.js 15 (App Router), TypeScript
- **UI Components**: Shadcn UI, Radix UI
- **Styling**: Tailwind CSS
- **State Management**: Server Components, nuqs for URL state
- **Authentication**: Custom Auth

## 📋 Prerequisites

- Node.js 18.x or higher
- pnpm (recommended) or npm
- Git

## 🔧 Installation

1. Clone the repository:

   ```shell
   git clone https://github.com/Logicielab-saas/jobdashboard.git
   cd jobdashboard
   ```

2. Install dependencies:

   ```shell
   pnpm install
   ```

3. Set up environment variables:

   ```shell
   cp .env.example .env.local
   ```

   Then edit `.env.local` with your configuration.

4. Run the development server:

   ```shell
   pnpm dev
   ```

## 🌐 Usage

Access the application at `http://localhost:3000`

### Role-Based Access

1. **Admin Dashboard**
   - URL: `/admin`
   - Manage users, roles, and system settings

2. **Recruiter Portal**
   - URL: `/recruiter`
   - Post jobs
   - Review applications
   - Schedule interviews
   - Communicate with candidates

3. **Candidate Interface**
   - URL: `/candidate`
   - Create and manage profile
   - Apply for positions
   - Track application status
   - Participate in interviews

## 📚 File Structure

- **Features focused Structure**

```plaintext
└── 📁src
    └── 📁app
        └── 📁(auth)
            └── 📁login
                └── page.tsx
        └── 📁(dashboard)
            └── layout.tsx
            └── 📁recruiter
                └── 📁annonces
                    └── 📁details
                        └── 📁[id]
                            └── page.tsx
                    └── page.tsx
                └── 📁candidates
                    └── page.tsx
                └── 📁dashboard
                    └── page.tsx
                └── 📁interviews
                    └── page.tsx
                └── layout.tsx
                └── 📁messages
                    └── page.tsx
                └── 📁parametres
                    └── 📁company
                    └── 📁company-settings
                        └── page.tsx
                        └── page.tsx
                    └── 📁notifications
                        └── page.tsx
                    └── 📁users
                        └── page.tsx
                └── 📁stats
                    └── page.tsx
        └── favicon.ico
        └── globals.css
        └── layout.tsx
        └── page.tsx
    └── 📁components
        └── 📁shared
            └── DashboardBreadcrumb.tsx
            └── DashboardSidebar.tsx
            └── DataTable.tsx
            └── DataTablePagination.tsx
            └── ThemeButton.tsx
        └── 📁ui
            └── alert-dialog.tsx
            └── avatar.tsx
            └── badge.tsx
            └── breadcrumb.tsx
            └── button.tsx
            └── calendar.tsx
            └── card.tsx
            └── checkbox.tsx
            └── collapsible.tsx
            └── command.tsx
            └── dialog.tsx
            └── dropdown-menu.tsx
            └── form.tsx
            └── input.tsx
            └── label.tsx
            └── multi-select.tsx
            └── popover.tsx
            └── radio-group.tsx
            └── scroll-area.tsx
            └── select.tsx
            └── separator.tsx
            └── sheet.tsx
            └── sidebar.tsx
            └── skeleton.tsx
            └── table.tsx
            └── tabs.tsx
            └── textarea.tsx
            └── toast.tsx
            └── toaster.tsx
            └── tooltip.tsx
    └── 📁core
        └── 📁constants
            └── dashboard-navigation.const.ts
            └── recruiter-navigation.const.ts
        └── 📁types
            └── jwt-payload.type.ts
    └── 📁features
        └── 📁recruiter
            └── 📁annonces
                └── 📁actions
                └── 📁components
                    └── 📁annonces
                        └── AnnonceColumn.tsx
                        └── AnnonceDataTable.tsx
                        └── AnnonceDescription.tsx
                        └── AnnonceDetails.tsx
                        └── AnnoncesContainer.tsx
                        └── AnnonceSelectFilter.tsx
                        └── AnnonceTabs.tsx
                        └── PerformanceCard.tsx
                └── 📁hooks
            └── 📁candidatures
                └── 📁actions
                └── 📁components
                    └── ActionCell.tsx
                    └── AppelerDialog.tsx
                    └── CandidateColumns.tsx
                    └── CandidateDataTable.tsx
                    └── CandidateFilters.tsx
                    └── CandidateFiltersAnnonceMenu.tsx
                    └── CandidateFilterTabs.tsx
                    └── ContactInterfaceChat.tsx
                    └── EntretienPlanDialog.tsx
                    └── EntretienPlanRightSide.tsx
                    └── SupprimerDialog.tsx
                └── 📁hooks
    └── 📁hooks
        └── use-mobile.tsx
        └── use-toast.ts
    └── 📁lib
        └── axios.ts
        └── 📁providers
            └── ReactQueryProvider.tsx
            └── ThemeProvider.tsx
        └── utils.ts
    └── middleware.ts
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support, raise an issue in the repository.
