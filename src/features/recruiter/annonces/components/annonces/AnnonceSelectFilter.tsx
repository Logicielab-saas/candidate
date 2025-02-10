"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const annoncesJobs = [
  {
    value: "software-engineer",
    label: "Software Engineer",
  },
  {
    value: "product-manager",
    label: "Product Manager",
  },
  {
    value: "data-scientist",
    label: "Data Scientist",
  },
  {
    value: "ux-designer",
    label: "UX Designer",
  },
  {
    value: "devops-engineer",
    label: "DevOps Engineer",
  },
]

export function AnnonceSelectFilter() {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[390px] justify-between"
        >
          {value
            ? annoncesJobs.find((annoncesJob) => annoncesJob.value === value)?.label
            : "Recherche des Annonces ..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[390px] p-0">
        <Command>
          <CommandInput placeholder="Search framework..." className="h-9" />
          <CommandList>
            <CommandEmpty>No Annonce found.</CommandEmpty>
            <CommandGroup>
              {annoncesJobs.map((annoncesJob) => (
                <CommandItem
                  key={annoncesJob.value}
                  value={annoncesJob.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue)
                    setOpen(false)
                  }}
                >
                  {annoncesJob.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === annoncesJob.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
