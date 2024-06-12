import { injectToAppApi } from 'shared/api/init'
import { UserInfo } from 'shared/entities'

const usersApi = injectToAppApi({
  endpoints: builder => ({
    userIdByToken: builder.query<{ userId: string }, void>({
      query: () => ({
        url: `user/get-userid`,
        method: 'POST',
        body: {
          token: localStorage.getItem('token'),
        },
      }),
    }),
    userInfoById: builder.query<UserInfo, { userId: string }>({
      query: ({ userId }) => ({
        url: `user/${userId}`,
        method: 'GET',
      }),
    }),
    allUsers: builder.query<{ content: Array<UserInfo> }, void>({
      query: () => ({
        url: `user/all-users`,
        method: 'GET',
      }),
    }),
  }),
})

export const { useUserIdByTokenQuery, useAllUsersQuery } = usersApi
