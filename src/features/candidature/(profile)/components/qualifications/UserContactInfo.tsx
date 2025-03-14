import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Pencil } from "lucide-react";
import Link from "next/link";

export function UserContactInfo() {
  return (
    <div className="flex items-start justify-between border p-4 rounded-lg shadow-sm">
      <div className="flex items-center">
        <Avatar className="h-24 w-24 mr-4">
          <AvatarImage src="https://placehold.co/150" alt="@USER" />
          <AvatarFallback>SC</AvatarFallback>
        </Avatar>
        <div className="space-y-1">
          <p className="font-bold">John Doe</p>
          <p className="text-gray-600">john.doe@example.com</p>
          <p className="text-gray-600">(123) 456-7890</p>
        </div>
      </div>
      <Link
        href="/edit/profile"
        className="text-primaryHex-600 font-bold rounded-full p-2 bg-primaryHex-100 hover:bg-primaryHex-200 cursor-pointer"
      >
        <Pencil className="w-5 h-5 text-primaryHex-600 cursor-pointer" />
      </Link>
    </div>
  );
}
