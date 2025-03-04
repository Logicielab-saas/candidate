import type { Company } from '../types/job'

export interface SavedJob {
  id: string
  title: string
  company: Company
  location: string
  savedDate: string
  jobUrl: string
  bookmarked: boolean
}