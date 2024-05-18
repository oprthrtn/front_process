import { EndpointDefinitions, createApi } from '@reduxjs/toolkit/query/react'
import { fetchBaseQueryRefreshToken } from '../queries/baseQuery'

export const appApi = createApi({
  reducerPath: 'appApi',
  baseQuery: fetchBaseQueryRefreshToken,
  endpoints: () => ({}),
  tagTypes: [],
})

export const injectToAppApi = <T extends EndpointDefinitions>(
  injection: Parameters<typeof appApi.injectEndpoints<T>>[0]
) => {
  return appApi.injectEndpoints<T>(injection)
}
