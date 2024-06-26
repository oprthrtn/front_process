import { injectToAppApi } from 'shared/api/init'
import { UserFilters, UserInfo, UserRole } from 'shared/entities'

const usersApi = injectToAppApi({
  endpoints: builder => ({
    userIdByToken: builder.query<{ userId: string }, void>({
      query: () => ({
        url: `/get-userid`,
        method: 'POST',
        body: {
          token: localStorage.getItem('token'),
        },
      }),
    }),
    userInfoById: builder.query<UserInfo, { userId: string }>({
      query: ({ userId }) => ({
        url: `/${userId}`,
        method: 'GET',
      }),
    }),
    allUsers: builder.query<{ content: Array<UserInfo> }, void>({
      query: () => ({
        url: `/all-users`,
        method: 'GET',
      }),
    }),
    userRoleByToken: builder.query<{ roles: Array<UserRole> }, void>({
      query: () => ({
        url: `/get-role`,
        method: 'POST',
        body: {
          token: localStorage.getItem('token'),
        },
      }),
    }),
    allUsersByFilters: builder.query<{ content: Array<UserInfo> }, Partial<UserFilters>>({
      query: filters => ({
        url: `/users`,
        method: 'GET',
        params: {
          firstName: filters.firstName || '',
          lastName: filters.lastName || '',
          middleName: filters.middleName || '',
          groupNumber: filters.groupNumber || '',
          streamNumber: filters.streamNumber || 0,
          company: filters.company || '',
          role: filters.role || '',
          pagination: {
            page: filters.pagination?.current || 0,
            size: filters.pagination?.size || 10,
          },
        },
      }),
    }),
  }),
})

export const {
  useUserIdByTokenQuery,
  useUserInfoByIdQuery,
  useAllUsersQuery,
  useUserRoleByTokenQuery,
  useAllUsersByFiltersQuery,
} = usersApi
