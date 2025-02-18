import * as z from "zod";
import { SalaryDisplayType, SalaryFrequency } from "../enums/salary.enum";

export const salaryFormSchema = z.object({
  displayType: z.nativeEnum(SalaryDisplayType).optional(),
  minSalary: z.string().optional(),
  maxSalary: z.string().optional(),
  frequency: z.nativeEnum(SalaryFrequency).optional(),
});

export type SalaryForm = z.infer<typeof salaryFormSchema>;