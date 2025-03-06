/**
 * Mock data for courses
 *
 * Contains sample course data for development and testing
 */

import type {
  Course,
  CourseDetails,
  CourseVideo,
  CourseModule,
} from "@/core/interfaces/";

export const mockCourses: Course[] = [
  {
    id: "1",
    title: "Laravel PHP Framework Tutorial",
    description: "Learn the basics of Laravel, from routing to eloquent ORM",
    imageUrl: "/courses/laravel.webp",
    author: "The Test Author",
    progress: 45,
    review: 4.3,
    category: "web",
    duration: 480, // 8 hours
  },
  {
    id: "2",
    title: "Advanced Flutter Development",
    description:
      "Deep dive into advanced Flutter concepts and state management",
    imageUrl: "/courses/flutter.webp",
    author: "The Test Author",
    review: 4.3,
    category: "mobile",
    duration: 360, // 6 hours
  },
  {
    id: "3",
    title: "Dart Programming Language",
    description:
      "Master Dart programming language fundamentals and advanced concepts",
    imageUrl: "/courses/dart.webp",
    author: "The Test Author",
    progress: 75,
    review: 4.3,
    category: "mobile",
    duration: 300, // 5 hours
  },
  {
    id: "4",
    title: "NestJS Enterprise Development",
    description:
      "Master NestJS framework for building scalable and maintainable enterprise Node.js applications",
    imageUrl: "/courses/nestjs.png",
    author: "The Test Author",
    progress: 25,
    review: 4.5,
    category: "web",
    duration: 420, // 7 hours
  },
  {
    id: "5",
    title: "Advanced TypeScript Development",
    description:
      "Master TypeScript's type system, advanced features, and best practices for large-scale applications",
    imageUrl: "/courses/typescript.jpg",
    author: "The Test Author",
    review: 4.7,
    category: "web",
    duration: 540, // 9 hours
  },
  // Data Science Courses
  {
    id: "6",
    title: "Data Science with Python",
    description:
      "Learn data analysis, visualization, and machine learning with Python, pandas, and scikit-learn",
    imageUrl: "/courses/python-data.jpg",
    author: "Data Science Pro",
    review: 4.8,
    category: "data",
    duration: 720, // 12 hours
  },
  {
    id: "7",
    title: "Advanced SQL for Data Analytics",
    description:
      "Master complex SQL queries, window functions, and database optimization for data analysis",
    imageUrl: "/courses/sql-analytics.jpg",
    author: "DB Master",
    progress: 30,
    review: 4.6,
    category: "data",
    duration: 360, // 6 hours
  },
  // Cloud & DevOps Courses
  {
    id: "8",
    title: "AWS Solutions Architect",
    description:
      "Comprehensive guide to AWS services, architecture best practices, and cloud solutions",
    imageUrl: "/courses/aws.png",
    author: "Cloud Expert",
    review: 4.9,
    category: "cloud",
    duration: 840, // 14 hours
  },
  {
    id: "9",
    title: "Docker & Kubernetes Mastery",
    description:
      "Learn container orchestration, microservices deployment, and DevOps practices",
    imageUrl: "/courses/kubernetes.png",
    author: "DevOps Guru",
    progress: 60,
    review: 4.7,
    category: "cloud",
    duration: 600, // 10 hours
  },
  // AI/ML Courses
  {
    id: "10",
    title: "Deep Learning Fundamentals",
    description:
      "Build and train neural networks using TensorFlow and PyTorch for computer vision and NLP",
    imageUrl: "/courses/deep-learning.png",
    author: "AI Researcher",
    review: 4.8,
    category: "ai",
    duration: 900, // 15 hours
  },
  {
    id: "11",
    title: "Machine Learning Engineering",
    description:
      "End-to-end ML pipeline development, model deployment, and MLOps best practices",
    imageUrl: "/courses/ml-eng.webp",
    author: "ML Engineer",
    progress: 40,
    review: 4.6,
    category: "ai",
    duration: 780, // 13 hours
  },
  // Security Courses
  {
    id: "12",
    title: "Ethical Hacking Bootcamp",
    description:
      "Learn penetration testing, vulnerability assessment, and security best practices",
    imageUrl: "/courses/ethical-hacking.jpg",
    author: "Security Expert",
    review: 4.9,
    category: "security",
    duration: 720, // 12 hours
  },
  {
    id: "13",
    title: "Web Application Security",
    description:
      "Master OWASP top 10, secure coding practices, and web security testing",
    imageUrl: "/courses/web-security.png",
    author: "Security Pro",
    progress: 55,
    review: 4.7,
    category: "security",
    duration: 540, // 9 hours
  },
  // Game Development
  {
    id: "14",
    title: "Unity Game Development",
    description:
      "Create 3D games with Unity, including gameplay mechanics, physics, and AI",
    imageUrl: "/courses/unity-dev.webp",
    author: "Game Dev Pro",
    review: 4.6,
    category: "game",
    duration: 840, // 14 hours
  },
  {
    id: "15",
    title: "Unreal Engine 5 Masterclass",
    description:
      "Learn advanced game development with UE5, including blueprints and realistic graphics",
    imageUrl: "/courses/unreal-engine.avif",
    author: "Game Artist",
    progress: 20,
    review: 4.8,
    category: "game",
    duration: 960, // 16 hours
  },
  // Blockchain
  {
    id: "16",
    title: "Blockchain Development",
    description:
      "Build decentralized applications with Ethereum, Solidity, and Web3.js",
    imageUrl: "/courses/blockchain.jpg",
    author: "Blockchain Dev",
    review: 4.5,
    category: "blockchain",
    duration: 660, // 11 hours
  },
  {
    id: "17",
    title: "Smart Contract Security",
    description:
      "Learn secure smart contract development and auditing techniques",
    imageUrl: "/courses/smart-contracts.jpg",
    author: "DeFi Expert",
    progress: 35,
    review: 4.6,
    category: "blockchain",
    duration: 480, // 8 hours
  },
  // Design
  {
    id: "18",
    title: "UI/UX Design Principles",
    description:
      "Master modern UI/UX design principles, wireframing, and prototyping with Figma",
    imageUrl: "/courses/ui-ux.png",
    author: "Design Lead",
    review: 4.8,
    category: "design",
    duration: 600, // 10 hours
  },
  {
    id: "19",
    title: "Advanced Motion Design",
    description:
      "Create engaging animations and micro-interactions for web and mobile apps",
    imageUrl: "/courses/motion-design.jpg",
    author: "Motion Artist",
    progress: 70,
    review: 4.7,
    category: "design",
    duration: 420, // 7 hours
  },
  // Marketing
  {
    id: "20",
    title: "Digital Marketing Strategy",
    description:
      "Comprehensive guide to SEO, content marketing, and social media strategy",
    imageUrl: "/courses/digital-marketing.png",
    author: "Marketing Expert",
    review: 4.6,
    category: "marketing",
    duration: 540, // 9 hours
  },
  {
    id: "21",
    title: "Growth Marketing Mastery",
    description:
      "Learn data-driven marketing, A/B testing, and user acquisition strategies",
    imageUrl: "/courses/growth-marketing.png",
    author: "Growth Hacker",
    progress: 45,
    review: 4.5,
    category: "marketing",
    duration: 480, // 8 hours
  },
  // Business
  {
    id: "22",
    title: "Startup Entrepreneurship",
    description:
      "Learn lean startup methodology, business model canvas, and pitch deck creation",
    imageUrl: "/courses/startup.jpg",
    author: "Startup Founder",
    review: 4.7,
    category: "business",
    duration: 600, // 10 hours
  },
  {
    id: "23",
    title: "Product Management Essentials",
    description:
      "Master product strategy, roadmap planning, and agile product development",
    imageUrl: "/courses/product-management.png",
    author: "Product Leader",
    progress: 80,
    review: 4.8,
    category: "business",
    duration: 720, // 12 hours
  },
];

// Mock videos for courses
const laravelVideos: CourseVideo[] = [
  {
    id: "1-1",
    title: "Introduction to Laravel",
    description:
      "Get started with Laravel framework basics, installation, and project setup. Learn about MVC architecture and Laravel's core concepts.",
    imageUrl: "/courses/laravel-1.webp",
    videoUrl: "https://example.com/videos/laravel-1",
    duration: "10:36",
    progress: 100,
  },
  {
    id: "1-2",
    title: "Routing and Controllers",
    description:
      "Master Laravel's routing system and learn how to create controllers. Understand route parameters, middleware, and controller actions.",
    imageUrl: "/courses/laravel-2.webp",
    videoUrl: "https://example.com/videos/laravel-2",
    duration: "7:04",
    progress: 80,
  },
  {
    id: "1-3",
    title: "Eloquent ORM Basics",
    description:
      "Learn database management with Laravel's Eloquent ORM. Cover model creation, relationships, and basic CRUD operations.",
    imageUrl: "/courses/laravel-3.webp",
    videoUrl: "https://example.com/videos/laravel-3",
    duration: "5:34",
    progress: 0,
  },
  {
    id: "1-4",
    title: "Authentication and Authorization",
    description:
      "Implement user authentication and authorization in Laravel. Learn about guards, policies, and role-based access control.",
    imageUrl: "/courses/laravel-4.webp",
    videoUrl: "https://example.com/videos/laravel-4",
    duration: "6:04",
    progress: 0,
  },
];

const nestjsVideos: CourseVideo[] = [
  {
    id: "4-1",
    title: "Introduction to NestJS",
    description:
      "Introduction to NestJS framework architecture, core concepts, and setting up your first NestJS application.",
    imageUrl: "/courses/nestjs.png",
    videoUrl: "/formations/lesson1.mp4",
    duration: "10:36",
    progress: 100,
    startAt: 0,
  },
  {
    id: "4-2",
    title: "Controllers and Routing",
    description:
      "Deep dive into NestJS controllers, routing decorators, request handling, and response manipulation.",
    imageUrl: "/courses/nestjs.png",
    videoUrl: "/formations/lesson2.mp4",
    duration: "7:04",
    progress: 100,
    startAt: 0,
  },
  {
    id: "4-3",
    title: "Dependency Injection",
    description:
      "Understanding dependency injection in NestJS, providers, services, and the NestJS DI container.",
    imageUrl: "/courses/nestjs.png",
    videoUrl: "/formations/lesson3.mp4",
    duration: "5:34",
    progress: 100,
    startAt: 0,
  },
  {
    id: "4-4",
    title: "Modules and Services",
    description:
      "Learn about NestJS modules, services architecture, and how to structure your application effectively.",
    imageUrl: "/courses/nestjs.png",
    videoUrl: "/formations/lesson4.mp4",
    duration: "6:04",
    progress: 100,
    startAt: 0,
  },
  {
    id: "4-5",
    title: "Database Integration",
    description:
      "Integrate databases with NestJS using TypeORM. Learn about repositories, entities, and database operations.",
    imageUrl: "/courses/nestjs.png",
    videoUrl: "/formations/lesson5.mp4",
    duration: "7:05",
    progress: 85,
    startAt: 360,
  },
  {
    id: "4-6",
    title: "Authentication Strategies",
    description:
      "Implement various authentication strategies in NestJS including JWT, Passport, and session-based auth.",
    imageUrl: "/courses/nestjs.png",
    videoUrl: "/formations/lesson6.mp4",
    duration: "12:27",
    progress: 65,
    startAt: 447,
  },
  {
    id: "4-7",
    title: "Authorization and Guards",
    description:
      "Master NestJS guards for authorization, custom decorators, and role-based access control.",
    imageUrl: "/courses/nestjs.png",
    videoUrl: "/formations/lesson7.mp4",
    duration: "9:54",
    progress: 40,
    startAt: 237,
  },
  {
    id: "4-8",
    title: "Error Handling",
    description:
      "Learn comprehensive error handling in NestJS, custom exceptions, filters, and error responses.",
    imageUrl: "/courses/nestjs.png",
    videoUrl: "/formations/lesson8.mp4",
    duration: "7:08",
    progress: 15,
    startAt: 64,
  },
  {
    id: "4-9",
    title: "Validation and DTOs",
    description:
      "Implement request validation using DTOs, class-validator, and transformation pipes in NestJS.",
    imageUrl: "/courses/nestjs.png",
    videoUrl: "/formations/lesson9.mp4",
    duration: "10:04",
    progress: 0,
    startAt: 0,
  },
  {
    id: "4-10",
    title: "File Upload Handling",
    description:
      "Handle file uploads in NestJS, implement file storage strategies, and process uploaded files.",
    imageUrl: "/courses/nestjs.png",
    videoUrl: "/formations/lesson10.mp4",
    duration: "2:16",
    progress: 0,
    startAt: 0,
  },
  {
    id: "4-11",
    title: "WebSockets Integration",
    description:
      "Implement real-time features using WebSockets in NestJS, including gateways and event handling.",
    imageUrl: "/courses/nestjs.png",
    videoUrl: "/formations/lesson11.mp4",
    duration: "11:17",
    progress: 0,
    startAt: 0,
  },
  {
    id: "4-12",
    title: "Task Scheduling",
    description:
      "Learn how to implement scheduled tasks and background jobs in NestJS applications.",
    imageUrl: "/courses/nestjs.png",
    videoUrl: "/formations/lesson12.mp4",
    duration: "6:38",
    progress: 0,
    startAt: 0,
  },
  {
    id: "4-13",
    title: "Testing Strategies",
    description:
      "Master unit testing, integration testing, and e2e testing in NestJS applications.",
    imageUrl: "/courses/nestjs.png",
    videoUrl: "/formations/lesson13.mp4",
    duration: "7:37",
    progress: 0,
    startAt: 0,
  },
  {
    id: "4-14",
    title: "Deployment Best Practices",
    description:
      "Learn best practices for deploying NestJS applications, including CI/CD, containerization, and monitoring.",
    imageUrl: "/courses/nestjs.png",
    videoUrl: "/formations/lesson14.mp4",
    duration: "11:05",
    progress: 0,
    startAt: 0,
  },
];

// Mock modules data
const laravelModules: CourseModule[] = [
  {
    id: "m1",
    title: "Getting Started with Laravel",
    description: "Introduction to Laravel framework, setup and basic concepts",
    duration: 120, // 2 hours
    videos: [
      {
        id: "1-1",
        title: "Introduction to Laravel",
        description:
          "Get started with Laravel framework basics, installation, and project setup. Learn about MVC architecture and Laravel's core concepts.",
        imageUrl: "/courses/laravel.webp",
        videoUrl: "https://example.com/videos/laravel-1",
        duration: "45:00",
        progress: 100,
      },
      {
        id: "1-2",
        title: "Setting Up Your Development Environment",
        description:
          "Learn how to set up your local development environment for Laravel development",
        imageUrl: "/courses/laravel-2.webp",
        videoUrl: "https://example.com/videos/laravel-2",
        duration: "35:00",
        progress: 80,
      },
      {
        id: "1-3",
        title: "Understanding MVC Architecture",
        description:
          "Deep dive into Model-View-Controller architecture in Laravel",
        imageUrl: "/courses/laravel-3.webp",
        videoUrl: "https://example.com/videos/laravel-3",
        duration: "40:00",
        progress: 0,
      },
    ],
  },
  {
    id: "m2",
    title: "Routing and Controllers",
    description:
      "Master Laravel's routing system and controller implementation",
    duration: 180, // 3 hours
    videos: [
      {
        id: "2-1",
        title: "Basic Routing",
        description: "Learn how to define basic routes in Laravel",
        imageUrl: "/courses/laravel-4.webp",
        videoUrl: "https://example.com/videos/laravel-4",
        duration: "50:00",
        progress: 0,
      },
      {
        id: "2-2",
        title: "Route Parameters and Constraints",
        description: "Working with route parameters and adding constraints",
        imageUrl: "/courses/laravel-5.webp",
        videoUrl: "https://example.com/videos/laravel-5",
        duration: "45:00",
        progress: 0,
      },
      {
        id: "2-3",
        title: "Controller Basics",
        description: "Creating and using controllers in Laravel",
        imageUrl: "/courses/laravel-6.webp",
        videoUrl: "https://example.com/videos/laravel-6",
        duration: "45:00",
        progress: 0,
      },
      {
        id: "2-4",
        title: "Resource Controllers",
        description: "Working with resource controllers for CRUD operations",
        imageUrl: "/courses/laravel-7.webp",
        videoUrl: "https://example.com/videos/laravel-7",
        duration: "40:00",
        progress: 0,
      },
    ],
  },
];

const nestjsModules: CourseModule[] = [
  {
    id: "m1",
    title: "NestJS Fundamentals",
    description: "Learn the core concepts and fundamentals of NestJS framework",
    duration: 180, // 3 hours
    videos: [
      {
        id: "4-1",
        title: "Introduction to NestJS",
        description:
          "Introduction to NestJS framework architecture, core concepts, and setting up your first NestJS application.",
        imageUrl: "/courses/nestjs.png",
        videoUrl: "/formations/lesson1.mp4",
        duration: "60:00",
        progress: 100,
      },
      {
        id: "4-2",
        title: "Controllers and Routing",
        description:
          "Deep dive into NestJS controllers, routing decorators, request handling, and response manipulation.",
        imageUrl: "/courses/nestjs.png",
        videoUrl: "/formations/lesson2.mp4",
        duration: "60:00",
        progress: 100,
      },
      {
        id: "4-3",
        title: "Dependency Injection",
        description:
          "Understanding dependency injection in NestJS, providers, services, and the NestJS DI container.",
        imageUrl: "/courses/nestjs.png",
        videoUrl: "/formations/lesson3.mp4",
        duration: "60:00",
        progress: 100,
      },
    ],
  },
  {
    id: "m2",
    title: "Database Integration",
    description: "Master database integration with TypeORM in NestJS",
    duration: 240, // 4 hours
    videos: [
      {
        id: "4-4",
        title: "TypeORM Setup",
        description:
          "Setting up TypeORM with NestJS and configuring database connection",
        imageUrl: "/courses/nestjs.png",
        videoUrl: "/formations/lesson4.mp4",
        duration: "60:00",
        progress: 100,
      },
      {
        id: "4-5",
        title: "Entities and Repositories",
        description: "Working with TypeORM entities and repositories in NestJS",
        imageUrl: "/courses/nestjs.png",
        videoUrl: "/formations/lesson5.mp4",
        duration: "60:00",
        progress: 85,
      },
      {
        id: "4-6",
        title: "Relations and Eager Loading",
        description: "Managing entity relations and implementing eager loading",
        imageUrl: "/courses/nestjs.png",
        videoUrl: "/formations/lesson6.mp4",
        duration: "60:00",
        progress: 65,
      },
      {
        id: "4-7",
        title: "Transactions and Query Builder",
        description:
          "Using transactions and query builder in NestJS with TypeORM",
        imageUrl: "/courses/nestjs.png",
        videoUrl: "/formations/lesson7.mp4",
        duration: "60:00",
        progress: 40,
      },
    ],
  },
  {
    id: "m3",
    title: "Authentication and Authorization",
    description: "Implement secure authentication and authorization in NestJS",
    duration: 180, // 3 hours
    videos: [
      {
        id: "4-8",
        title: "JWT Authentication",
        description: "Implementing JWT-based authentication in NestJS",
        imageUrl: "/courses/nestjs.png",
        videoUrl: "/formations/lesson8.mp4",
        duration: "60:00",
        progress: 15,
      },
      {
        id: "4-9",
        title: "Guards and Strategies",
        description: "Working with authentication guards and strategies",
        imageUrl: "/courses/nestjs.png",
        videoUrl: "/formations/lesson9.mp4",
        duration: "60:00",
        progress: 0,
      },
      {
        id: "4-10",
        title: "Role-based Authorization",
        description: "Implementing role-based access control (RBAC)",
        imageUrl: "/courses/nestjs.png",
        videoUrl: "/formations/lesson10.mp4",
        duration: "60:00",
        progress: 0,
      },
    ],
  },
];

export const mockCoursesDetails: CourseDetails[] = [
  {
    id: "1",
    title: "Laravel PHP Framework Tutorial",
    description: `Master Laravel, the most popular PHP framework for modern web development. This comprehensive course covers everything from basic concepts to advanced features.

Key Topics:
- Routing and Controllers
- Eloquent ORM and Database Management
- Authentication and Authorization
- API Development
- Testing and Deployment
    `,
    imageUrl: "/courses/laravel-1.webp",
    playlist: laravelVideos,
    modules: laravelModules,
    progress: 45,
    startingEpId: "1-2",
    review: 4.3,
    viewersNum: 1234,
    duration: 150,
  },
  {
    id: "4",
    title: "NestJS Enterprise Development",
    description: `Master NestJS, a progressive Node.js framework for building efficient, reliable, and scalable server-side applications. This comprehensive course covers everything from fundamentals to advanced enterprise patterns.

Key Topics:
- Controllers and Dependency Injection
- Database Integration and TypeORM
- Authentication and Authorization
- WebSockets and Real-time Features
- Testing and Deployment Strategies
- Error Handling and Validation
- File Upload and Processing
- Task Scheduling and Background Jobs
    `,
    imageUrl: "/courses/nestjs.png",
    playlist: nestjsVideos,
    modules: nestjsModules,
    progress: 25,
    startingEpId: "4-2",
    review: 4.5,
    viewersNum: 2345,
    duration: 125,
  },
];
