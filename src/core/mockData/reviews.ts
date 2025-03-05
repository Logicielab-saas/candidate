import type { CourseReview } from "../interfaces/course-review.interface";

export const mockReviews: Record<string, CourseReview[]> = {
  "4": [
    {
      id: "1",
      courseId: "4",
      userId: "user-1",
      userName: "Sarah Johnson",
      userAvatar: "/avatars/sarah.jpg",
      rating: 5,
      comment:
        "This NestJS course is incredibly comprehensive! The instructor explains complex concepts clearly and provides practical examples. I especially loved the sections on authentication and database integration.",
      createdAt: "2024-03-15T10:30:00Z",
      helpful: 42,
      isHelpful: true,
    },
    {
      id: "2",
      courseId: "4",
      userId: "user-2",
      userName: "Michael Chen",
      userAvatar: "/avatars/michael.jpg",
      rating: 4,
      comment:
        "Great course overall. The content is well-structured and the examples are relevant to real-world scenarios. Would appreciate more coverage of microservices architecture.",
      createdAt: "2024-03-10T15:45:00Z",
      helpful: 28,
    },
    {
      id: "3",
      courseId: "4",
      userId: "user-3",
      userName: "Emily Rodriguez",
      rating: 5,
      comment:
        "As someone coming from Express.js, this course made the transition to NestJS smooth and enjoyable. The sections on dependency injection and modules are particularly well-explained.",
      createdAt: "2024-03-05T09:15:00Z",
      helpful: 35,
    },
    {
      id: "4",
      courseId: "4",
      userId: "user-4",
      userName: "David Kim",
      userAvatar: "/avatars/david.jpg",
      rating: 3,
      comment:
        "The course content is good, but some sections feel rushed. Would benefit from more in-depth explanations of advanced topics and more exercises.",
      createdAt: "2024-02-28T14:20:00Z",
      helpful: 15,
    },
    {
      id: "5",
      courseId: "4",
      userId: "user-5",
      userName: "Lisa Thompson",
      rating: 5,
      comment:
        "Excellent course! The instructor's teaching style is engaging and the progression from basics to advanced topics is well-paced. The project-based approach really helps reinforce the concepts.",
      createdAt: "2024-02-20T11:10:00Z",
      helpful: 48,
    },
  ],
};
