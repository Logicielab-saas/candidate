import { Plus } from "lucide-react";

interface SectionHeaderProps {
  title: string;
  icon: React.ReactNode;
  onAdd: () => void;
}

export function SectionHeader({ title, icon, onAdd }: SectionHeaderProps) {
  return (
    <h2 className="text-xl font-semibold mb-4 flex items-center justify-between">
      <span className="flex items-center">
        {icon}
        {title}
      </span>
      <span
        className="text-primaryHex-600 font-bold rounded-full p-2 bg-primaryHex-100 hover:bg-primaryHex-200 cursor-pointer"
        onClick={onAdd}
      >
        <Plus className="w-5 h-5" />
      </span>
    </h2>
  );
}
