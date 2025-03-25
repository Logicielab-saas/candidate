import { Pencil, Plus } from "lucide-react";
import Link from "next/link";

interface SectionHeaderProps {
  title: string;
  icon: React.ReactNode;
  onAdd?: () => void;
  onEdit?: () => void;
  removeAdd?: boolean;
}

export function SectionHeader({
  title,
  icon,
  onAdd,
  onEdit,
  removeAdd = false,
}: SectionHeaderProps) {
  return (
    <h2 className="text-xl font-semibold mb-4 flex items-center justify-between">
      <span className="flex items-center">
        {icon}
        {title}
      </span>
      {onEdit ? (
        <Link
          href="/edit/profile"
          className="text-primaryHex-600 font-bold rounded-full p-2 bg-primaryHex-100 hover:bg-primaryHex-200 cursor-pointer"
        >
          <Pencil className="w-5 h-5" />
        </Link>
      ) : removeAdd ? null : (
        <span
          className="text-primaryHex-600 font-bold rounded-full p-2 bg-primaryHex-100 hover:bg-primaryHex-200 cursor-pointer"
          onClick={onAdd}
        >
          <Plus className="w-5 h-5" />
        </span>
      )}
    </h2>
  );
}
