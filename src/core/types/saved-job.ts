import type { Company } from './job'

export interface SavedJob {
  id: string
  title: string
  company: Company
  location: string
  savedDate: string
  jobUrl: string
}