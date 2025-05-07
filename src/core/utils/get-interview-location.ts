import { type InterviewType } from "../types";

export function getInterviewLocation(
  interview_type: InterviewType,
  tCommon: (key: string) => string
): string {
  if (interview_type === "in-person") {
    return tCommon("inPersonInterview");
  }
  return interview_type === "video"
    ? tCommon("videoInterview")
    : tCommon("phoneInterview");
}
