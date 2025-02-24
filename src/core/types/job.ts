export type CandidateStatus = 'APPLIED' | 'INTERVIEWED' | 'REJECTED' | 'HIRED'
export type EmployerJobStatus = 'OPEN' | 'CLOSED' | 'EXPIRED' | 'PAUSED'
export type UserJobStatus = 'PRE_APPLY' | 'POST_APPLY' | 'VIEWED' | 'ARCHIVED'

export interface StatusWithTimestamp {
  status: string
  timestamp: number
}

export interface JobStatuses {
  candidateStatus: StatusWithTimestamp & { status: CandidateStatus }
  selfReportedStatus: StatusWithTimestamp & { status: CandidateStatus }
  employerJobStatus: StatusWithTimestamp & { status: EmployerJobStatus }
  userJobStatus: StatusWithTimestamp & { status: UserJobStatus }
}

export interface Company {
  name: string
}

export interface Job {
  jobTitle: string
  jobKey: string
  jobUrl: string
  jobExpired: boolean
  jobReported: boolean
  jobFraudulent: boolean
  withdrawn: boolean
  location: string
  company: Company
  statuses: JobStatuses
  applyTime: number
}