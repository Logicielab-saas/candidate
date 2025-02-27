import { Company } from "./job"

export interface Interview {
  jobTitle: string
  jobKey: string
  jobUrl: string
  company: Company
  location: string
  interviewTime: string
  interviewDate: string
  interviewType: "Phone Call" | "Video Call" | "In-person"
  interviewLocation: string
  interviewStatus: "INVITED" | "PENDING" | "PASSED"
}