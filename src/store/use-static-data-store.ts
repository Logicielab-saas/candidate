import { create } from "zustand";
import type { StaticData } from "@/core/interfaces";

interface StaticDataStore extends StaticData {
  setStaticData: (data: StaticData) => void;
}

export const useStaticDataStore = create<StaticDataStore>((set) => ({
  emploi_contracts: [],
  emploi_categories: [],
  emploi_types: [],
  languages: [],
  support_categories: [],
  setStaticData: (data) => set(data),
}));
