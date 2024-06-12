import { EndpointDefinitions, createApi } from '@reduxjs/toolkit/query/react'
import { fetchBaseQueryRefreshToken } from '../queries/baseQuery'

export const diariesApi = createApi({
  reducerPath: 'diariesApi',
  baseQuery: (...args) => fetchBaseQueryRefreshToken(import.meta.env.VITE_DIARIES_API_URL, args),
  endpoints: () => ({}),
  tagTypes: ['GET_DIARY_COMMENTS', 'GET_DIARIES', 'GET_TEMPLATES'],
})

export const injectToDiariesApi = <T extends EndpointDefinitions>(
  injection: Parameters<typeof diariesApi.injectEndpoints<T>>[0]
) => {
  return diariesApi.injectEndpoints<T>(injection)
}
