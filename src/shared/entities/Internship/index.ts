export enum InternshipStatus {
  NO_INTERNSHIP = -1,
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
  status: InternshipStatus
}

export const internshipStatusToStringRecord: Record<InternshipStatus, string> = {
  [InternshipStatus.NO_INTERNSHIP]: 'Без стажировки',
  [InternshipStatus.CV_CENT]: 'Резюме отправлено',
  [InternshipStatus.INTERVIEW_SCHEDULED]: 'Интервью запланировано',
  [InternshipStatus.INTERVIEW_PASSED]: 'Интервью пройдено',
  [InternshipStatus.OFFER_RECIEVED]: 'Оффер отправлен',
  [InternshipStatus.OFFER_ACCEPTED]: 'Оффер принят',
  [InternshipStatus.OFFER_DECLINED]: 'Офеер отклонен',
}
