export enum InpernshipStatus {
  CV_CLIENT = 0,
  INTERVIEW_SCHEDULED = 1,
  INTERVIEW_PASSED = 2,
  OFFER_RECIEVED = 3,
  OFFER_ACCEPTED = 4,
  OFFER_DECLINED = 5,
}

export type Internship = {
  internshipId: string
  userId: string
  vacancyId: string
  companyId: string
  companyName: string
  vacancyName: string
  year: number
  semester: number
  status: InpernshipStatus
}
