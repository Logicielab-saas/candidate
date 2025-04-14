import { NotificationsList } from "@/features/notifications/components/NotificationsList";
import { NOTIFICATION_TYPES } from "@/features/notifications/types";

// This would typically come from your API
const MOCK_NOTIFICATIONS = [
  {
    id: "1",
    type: NOTIFICATION_TYPES.JOB,
    title: "New Job Match",
    message:
      "A new job matching your skills has been posted: Senior Frontend Developer",
    createdAt: new Date().toISOString(),
    isRead: false,
    metadata: {
      jobId: "job-123",
    },
  },
  {
    id: "2",
    type: NOTIFICATION_TYPES.INTERVIEW,
    title: "Interview Scheduled",
    message:
      "Your interview with Tech Corp has been scheduled for tomorrow at 2 PM",
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    isRead: true,
    metadata: {
      interviewId: "int-456",
    },
  },
  {
    id: "3",
    type: NOTIFICATION_TYPES.APPLICATION,
    title: "Application Update",
    message:
      "Your application for Frontend Developer at InnoTech has been reviewed",
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    isRead: false,
    metadata: {
      applicationId: "app-789",
    },
  },
];

export default function NotificationsPage() {
  return (
    <div className="container py-6">
      <h1 className="mb-8 text-3xl font-bold">Notifications</h1>
      <NotificationsList initialNotifications={MOCK_NOTIFICATIONS} />
    </div>
  );
}
