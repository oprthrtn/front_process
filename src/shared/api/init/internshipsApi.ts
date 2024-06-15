import { EndpointDefinitions, createApi } from '@reduxjs/toolkit/query/react'
import { fetchBaseQueryRefreshToken } from '../queries/baseQuery'

export const internshipsApi = createApi({
  reducerPath: 'internshipsApi',
  baseQuery: (...args) => fetchBaseQueryRefreshToken(import.meta.env.VITE_INTERNSHIPS_API_URL, args),
  endpoints: () => ({}),
  tagTypes: [
    'GET_COMAPINES',
    'GET_COMAPINES_BY_ID',
    'GET_INTERNSHIPS',
    'GET_INTERNSHIPS_BY_ID',
    'GET_VACANCIES',
    'GET_VACANCIES_BY_ID',
  ],
})

export const injectToInternshipsApi = <T extends EndpointDefinitions>(
  injection: Parameters<typeof internshipsApi.injectEndpoints<T>>[0]
) => {
  return internshipsApi.injectEndpoints<T>(injection)
}
