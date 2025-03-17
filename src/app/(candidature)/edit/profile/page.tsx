import { EditProfileContainer } from "@/features/candidature/(edit)/profile/EditProfileContainer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit Profile | Postuly",
  description: "Update your professional profile information and settings.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function EditProfilePage() {
  return <EditProfileContainer />;
}
