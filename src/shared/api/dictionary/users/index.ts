import { injectToAppApi } from 'shared/api/init'
import { UserFilters, UserInfo, UserRole, Users } from 'shared/entities'

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
        url: `/all-users?size=10000000`,
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
    allUsersByFilters: builder.query<Users, Partial<UserFilters>>({
      query: filters => ({
        url: `/users`,
        method: 'POST',
        body: {
          firstName: filters.firstName || '',
          lastName: filters.lastName || '',
          middleName: filters.middleName || '',
          groupNumber: filters.groupNumber || '',
          streamNumber: filters.streamNumber || 0,
          // company: filters.company || '',
          // role: filters.role || '',
          pagination: {
            page: filters.pagination?.current || 1,
            size: filters.pagination?.size || 10,
          },
        },
      }),
    }),
    groups: builder.query<Array<{ groupNumber: string }>, void>({
      query: () => ({
        url: `groups`,
        method: 'GET',
      }),
    }),
    streams: builder.query<Array<{ streamNumber: number }>, void>({
      query: () => ({
        url: `streams`,
        method: 'GET',
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
  useGroupsQuery,
  useStreamsQuery,
} = usersApi
