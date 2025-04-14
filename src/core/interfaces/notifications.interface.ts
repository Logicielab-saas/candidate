export interface Notification {
  uuid: string;
  title: string;
  message: string;
  is_read: boolean;
  type: "job" | "interview" | "resume";
  created_at: string;
  emploi_uuid: string;
  image: string;
}
