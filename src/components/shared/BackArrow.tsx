"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export function BackArrow({
  title,
  textSize = "text-2xl",
}: {
  title?: string;
  textSize?: string;
}) {
  const router = useRouter();
  return (
    <div className="flex items-center gap-4">
      <span
        className="cursor-pointer text-primaryHex-600 hover:text-primaryHex-500 transition-colors
         dark:bg-primaryHex-900/20 dark:text-primaryHex-400 bg-primaryHex-50 rounded-full p-2"
        onClick={() => router.back()}
      >
        <ArrowLeft className="w-8 h-8 cursor-pointer" />
      </span>
      {title && (
        <h1
          className={`${textSize} font-semibold text-secondaryHex-900 dark:text-secondaryHex-50`}
        >
          {title}
        </h1>
      )}
    </div>
  );
}
