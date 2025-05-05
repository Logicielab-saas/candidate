"use client";

import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";
import { useDebouncedCallback } from "use-debounce";

interface MessageAreaProps {
  value: string;
  onChange: (value: string) => void;
  label: string;
  placeholder: string;
}

export function MessageArea({
  value,
  onChange,
  label,
  placeholder,
}: MessageAreaProps) {
  const [localValue, setLocalValue] = useState(value);

  // Update local value when prop value changes
  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  // Debounce the update to parent
  const debouncedOnChange = useDebouncedCallback((value: string) => {
    onChange(value);
  }, 300);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setLocalValue(newValue); // Update local state immediately
    debouncedOnChange(newValue); // Debounce update to parent
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
        {label}
      </label>
      <Textarea
        placeholder={placeholder}
        value={localValue}
        onChange={handleChange}
        className="min-h-[150px] resize-none"
      />
    </div>
  );
}
