"use client";

import { useQueryState } from "nuqs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { CompanyFiltersDrawer } from "./CompanyFiltersDrawer";

/**
 * CompaniesSearch - Client component for company search functionality
 *
 * Handles search input and advanced filters for company reviews
 * Uses URL state management with nuqs for search parameters
 * Only updates URL state when form is submitted
 * Clears query parameter when input is empty
 */
export function CompaniesSearch() {
  const [searchQuery, setSearchQuery] = useQueryState("q");
  const [inputValue, setInputValue] = useState(searchQuery ?? "");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // If input is empty or only whitespace, clear the query parameter
    if (!inputValue.trim()) {
      await setSearchQuery(null);
    } else {
      await setSearchQuery(inputValue);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-5xl mx-auto">
      <div
        className={cn(
          "flex flex-col sm:flex-row gap-4",
          "items-end justify-center"
        )}
      >
        <div className="w-full sm:w-[700px] space-y-2">
          <Label htmlFor="company-search" className="text-sm font-medium">
            Recherche Entreprise
          </Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="company-search"
              type="text"
              placeholder="Rechercher par nom d'entreprise ou intitulé de poste"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="w-full pl-10"
            />
          </div>
        </div>

        <div className="flex gap-2 w-full sm:w-auto">
          <Button
            className="w-full h-11 rounded-md px-8 sm:w-[120px]"
            type="submit"
          >
            Rechercher
          </Button>
          <CompanyFiltersDrawer />
        </div>
      </div>
    </form>
  );
}
