export const LOGIN_ROUTE = '/login'
export const PROFILE_ROUTE = '/profile'
export const INTERNSHIPS_ROUTE = '/internships'
export const STUDENTS_ROUTE = '/students'
export const DIARIES_ROUTE = '/diaries'
export const TEMPLATES_ROUTE = '/templates'
export const DIARY_ROUTE = (diaryId: string = ':diaryId') => `/diaries/${diaryId}`

export const COMPANY_ROUTE = `/companies`
export const COMPANIES_ROUTE = (companyId: string = ':companyId') => `/companies/${companyId}`

export const VACANCIES_ROUTE = `/vacancies`
export const VACANCY_ROUTE = (vacancyId: string = ':vacancyId') => `/vacancies/${vacancyId}`

export const RECRUITEDSTUDENTS_ROUTE = `/recruitedStudents`
