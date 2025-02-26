export type CandidateStatus =
  | 'APPLIED'
  | 'INTERVIEWED'
  | 'OFFER_RECEIVED'
  | 'HIRED'
  | 'REJECTED'
  | 'NOT_INTERESTED'
  | 'ARCHIVED'

export type EmployerJobStatus = 'OPEN' | 'CLOSED' | 'EXPIRED' | 'PAUSED'
export type UserJobStatus = 'PRE_APPLY' | 'POST_APPLY' | 'VIEWED' | 'ARCHIVED'

export interface StatusWithTimestamp {
  status: string
  timestamp: number
}

export interface CandidateStatusWithTimestamp extends StatusWithTimestamp {
  status: CandidateStatus
}

export interface EmployerJobStatusWithTimestamp extends StatusWithTimestamp {
  status: EmployerJobStatus
}

export interface UserJobStatusWithTimestamp extends StatusWithTimestamp {
  status: UserJobStatus
}

export interface JobStatuses {
  candidateStatus: CandidateStatusWithTimestamp
  selfReportedStatus: CandidateStatusWithTimestamp
  employerJobStatus: EmployerJobStatusWithTimestamp
  userJobStatus: UserJobStatusWithTimestamp
}

export interface Company {
  name: string
  // Add more company fields as needed
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