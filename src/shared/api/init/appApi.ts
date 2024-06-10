import { EndpointDefinitions, createApi } from '@reduxjs/toolkit/query/react'
import { fetchBaseQueryRefreshToken } from '../queries/baseQuery'

export const appApi = createApi({
  reducerPath: 'appApi',
  baseQuery: (...args) => fetchBaseQueryRefreshToken(import.meta.env.VITE_API_URL, args),
  endpoints: () => ({}),
  tagTypes: [],
})

export const injectToAppApi = <T extends EndpointDefinitions>(
  injection: Parameters<typeof appApi.injectEndpoints<T>>[0]
) => {
  return appApi.injectEndpoints<T>(injection)
}
