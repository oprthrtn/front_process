export enum InpernshipStatus {
  CV_CENT = 0,
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

export const internshipStatusToStringRecord: Record<InpernshipStatus, string> = {
  [InpernshipStatus.CV_CENT]: 'Резюме отправлено',
  [InpernshipStatus.INTERVIEW_SCHEDULED]: 'Интервью запланировано',
  [InpernshipStatus.INTERVIEW_PASSED]: 'Интервью пройдено',
  [InpernshipStatus.OFFER_RECIEVED]: 'Оффер отправлен',
  [InpernshipStatus.OFFER_ACCEPTED]: 'Оффер принят',
  [InpernshipStatus.OFFER_DECLINED]: 'Офеер отклонен',
}
