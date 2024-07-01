import { injectToInternshipsApi } from 'shared/api/init/internshipsApi'
import { Company, Vacancy } from 'shared/entities/Company'
import { InternshipStatus, Internship } from 'shared/entities/Internship'

type CompanyList = {
  pageNum: string
  pagesTotal: string
  items: Array<Pick<Company, 'id' | 'name'>>
}
export type VacancyList = {
  pageNum: string
  pagesTotal: string
  items: Array<Pick<Vacancy, 'id' | 'companyId' | 'name'> & { companyName: string }>
}
export type InternshipList = {
  pageNum: number
  pagesTotal: number
  items: Array<{
    userId: string
    firstName: string
    lastName: string
    middleName: string
    groupNumber: string
    streamNumber: number
    status: InternshipStatus
    internships: Array<Internship>
  }>
}

export type InternshpisFilterParams = {
  userId?: string
  vacancyId?: string
  companyId?: string
  statuses?: `${InternshipStatus}`
  year?: string
  semester?: string
}

type VacanciesFilterParams = {
  companyId?: string
}

const internshipsApi = injectToInternshipsApi({
  endpoints: builder => ({
    companies: builder.query<CompanyList, void | {}>({
      query: () => ({
        url: `companies`,
        method: 'GET',
      }),
      providesTags: ['GET_COMAPINES'],
    }),
    companiesById: builder.query<Company, { companyId: string }>({
      query: ({ companyId }) => ({
        url: `companies/${companyId}`,
        method: 'GET',
      }),
      providesTags: ['GET_COMAPINES_BY_ID'],
    }),
    createCompany: builder.mutation<void, { name: string; description: string }>({
      query: body => ({
        url: `companies`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['GET_COMAPINES', 'GET_COMAPINES_BY_ID'],
    }),
    editCompany: builder.mutation<void, { name: string; description: string; companyId: string }>({
      query: ({ companyId, ...body }) => ({
        url: `companies/${companyId}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['GET_COMAPINES', 'GET_COMAPINES_BY_ID'],
    }),
    deleteCompany: builder.mutation<void, { companyId: string }>({
      query: ({ companyId }) => ({
        url: `companies/${companyId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['GET_COMAPINES', 'GET_COMAPINES_BY_ID'],
    }),
    vacanices: builder.query<VacancyList, VacanciesFilterParams | void>({
      query: body => ({
        url: `companies/vacancies${body ? '?' + new URLSearchParams(body).toString() : ''}`,
        method: 'GET',
      }),
      providesTags: ['GET_VACANCIES'],
    }),
    vacancyById: builder.query<Vacancy, { vacancyId: string }>({
      query: ({ vacancyId }) => ({
        url: `companies/vacancies/${vacancyId}`,
        method: 'GET',
      }),
      providesTags: ['GET_VACANCIES_BY_ID'],
    }),

    createVacancy: builder.mutation<
      void,
      { name: string; description: string; amountOfPeople: number; companyId: string }
    >({
      query: ({ companyId, ...body }) => ({
        url: `/companies/${companyId}/vacancies`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['GET_VACANCIES', 'GET_VACANCIES_BY_ID', 'GET_COMAPINES_BY_ID'],
    }),
    editVacancy: builder.mutation<void, { name: string; description: string; vacancyId: string }>({
      query: ({ vacancyId, ...body }) => ({
        url: `companies/vacancies/${vacancyId}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['GET_VACANCIES', 'GET_VACANCIES_BY_ID'],
    }),
    deleteVacancy: builder.mutation<void, { vacancyId: string }>({
      query: ({ vacancyId }) => ({
        url: `companies/vacancies/${vacancyId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['GET_VACANCIES', 'GET_VACANCIES_BY_ID'],
    }),
    internships: builder.query<InternshipList, InternshpisFilterParams | string[][] | void>({
      query: body => {
        return {
          url: `internships${body ? '?' + new URLSearchParams(body).toString() : ''}`,
          method: 'GET',
        }
      },

      providesTags: ['GET_INTERNSHIPS'],
    }),
    compatInternships: builder.query<{ items: Array<Internship> }, InternshpisFilterParams | void>({
      query: body => ({
        url: `/compat/internships${body ? '?' + new URLSearchParams(body).toString() : ''}`,
        method: 'GET',
      }),
      providesTags: ['GET_INTERNSHIPS'],
    }),
    internshipById: builder.query<Internship, { internshipId: string }>({
      query: ({ internshipId }) => ({
        url: `internships/${internshipId}`,
        method: 'GET',
      }),
      providesTags: ['GET_INTERNSHIPS_BY_ID'],
    }),
    createInternship: builder.mutation<void, { userId: string; vacancyId: string }>({
      query: body => ({
        url: `internships`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['GET_INTERNSHIPS_BY_ID', 'GET_INTERNSHIPS'],
    }),
    deleteInternship: builder.mutation<void, { internshipId: string }>({
      query: ({ internshipId }) => ({
        url: `internships/${internshipId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['GET_INTERNSHIPS_BY_ID', 'GET_INTERNSHIPS'],
    }),
    createCustomInternship: builder.mutation<void, { userId: string; comanyName: string; vacancyName: string }>({
      query: body => ({
        url: `internships/external`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['GET_INTERNSHIPS_BY_ID', 'GET_INTERNSHIPS'],
    }),
    updateInternshipStatus: builder.mutation<void, { internshipId: string; status: InternshipStatus }>({
      query: ({ internshipId, status }) => ({
        url: `internships/${internshipId}/status?status=${status}`,
        method: 'PUT',
      }),
      invalidatesTags: ['GET_INTERNSHIPS_BY_ID', 'GET_INTERNSHIPS'],
    }),
  }),
})

export const {
  useCompaniesQuery,

  useCompaniesByIdQuery,
  useCreateCompanyMutation,
  useEditCompanyMutation,
  useDeleteCompanyMutation,

  useVacanicesQuery,
  useVacancyByIdQuery,
  useCreateVacancyMutation,
  useEditVacancyMutation,
  useDeleteVacancyMutation,

  useInternshipByIdQuery,
  useInternshipsQuery,
  useCreateInternshipMutation,
  useCreateCustomInternshipMutation,
  useDeleteInternshipMutation,
  useUpdateInternshipStatusMutation,
  useCompatInternshipsQuery,
  useLazyCompatInternshipsQuery,
} = internshipsApi
