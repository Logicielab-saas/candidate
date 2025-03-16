import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Paintbrush } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const colors = {
  primary: [
    "#1B2F3D", // Default dark blue
    "#2C3E50", // Midnight Blue
    "#34495E", // Wet Asphalt
    "#2E4053", // Dark Slate
    "#283747", // Dark Navy
    "#212F3C", // Oxford Blue
    "#1C2833", // Dark Slate Gray
    "#17202A", // Dark Gunmetal
  ],
  accent: [
    "#29ABE2", // Default blue
    "#FF6B6B", // Coral
    "#4CAF50", // Green
    "#9C27B0", // Purple
    "#FF9800", // Orange
    "#607D8B", // Blue Grey
    "#E91E63", // Pink
    "#795548", // Brown
  ]
}

interface ColorPickerProps {
  primaryColor: string
  accentColor: string
  onPrimaryChange: (color: string) => void
  onAccentChange: (color: string) => void
}

export function ColorPicker({
  primaryColor,
  accentColor,
  onPrimaryChange,
  onAccentChange
}: ColorPickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-[160px] justify-start gap-2">
          <Paintbrush className="h-4 w-4" />
          <div className="flex gap-1">
            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: primaryColor }} />
            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: accentColor }} />
          </div>
          Colors
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64">
        <Tabs defaultValue="accent">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="primary">Primary</TabsTrigger>
            <TabsTrigger value="accent">Accent</TabsTrigger>
          </TabsList>
          <TabsContent value="primary" className="mt-4">
            <div className="grid grid-cols-4 gap-2">
              {colors.primary.map((c) => (
                <button
                  key={c}
                  className={`w-10 h-10 rounded-full border-2 transition-all ${
                    primaryColor === c ? 'border-white scale-110' : 'border-transparent hover:scale-105'
                  }`}
                  style={{ backgroundColor: c }}
                  onClick={() => onPrimaryChange(c)}
                />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="accent" className="mt-4">
            <div className="grid grid-cols-4 gap-2">
              {colors.accent.map((c) => (
                <button
                  key={c}
                  className={`w-10 h-10 rounded-full border-2 transition-all ${
                    accentColor === c ? 'border-white scale-110' : 'border-transparent hover:scale-105'
                  }`}
                  style={{ backgroundColor: c }}
                  onClick={() => onAccentChange(c)}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </PopoverContent>
    </Popover>
  )
}