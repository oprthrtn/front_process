export type Vacancy = {
  id: string
  companyId: string
  company: string
  name: string
  description: string
  maxAmount: number
  positionsLeft: number
  year: number
}
export type Company = {
  id: string
  name: string
  description: string
  vacancies: Array<Pick<Vacancy, 'id' | 'companyId' | 'name'> & { companyName: string }>
}
