import { BaseQueryFn, FetchArgs, FetchBaseQueryError, FetchBaseQueryMeta, fetchBaseQuery } from '@reduxjs/toolkit/query'

const baseQuery = (baseUrl: string) =>
  fetchBaseQuery({
    baseUrl,
    prepareHeaders(headers) {
      const token = localStorage.getItem('token')
      if (token) {
        headers.append('Authorization', `Bearer ${token}`)
      }
      return headers
    },
  })

type Params = Parameters<BaseQueryFn<FetchArgs, unknown, FetchBaseQueryError, object, FetchBaseQueryMeta>>
export const fetchBaseQueryRefreshToken = async (baseUrl: string, [args, api, extraOptions]: Params) => {
  const result = await baseQuery(baseUrl)(args, api, extraOptions)

  return result
}
