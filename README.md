# Job Recruitment Platform

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

- **Frontend**: Next.js 14 (App Router), TypeScript, React
- **UI Components**: Shadcn UI, Radix UI
- **Styling**: Tailwind CSS
- **State Management**: Server Components, nuqs for URL state
- **Authentication**: Next-Auth

## 📋 Prerequisites

- Node.js 18.x or higher
- pnpm (recommended) or npm
- Git

## 🔧 Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/nightfall-storm/next_frontJob.git
   cd next_frontJob
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Set up environment variables:

   ```bash
   cp .env.example .env.local
   ```

   Then edit `.env.local` with your configuration.

4. Run the development server:

   ```bash
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

<!-- ## 📚 Documentation

For detailed documentation about specific features:

- [Authentication Guide](docs/authentication.md)
- [Recruiter Guide](docs/recruiter.md)
- [Candidate Guide](docs/candidate.md)
- [Admin Guide](docs/admin.md) -->

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
