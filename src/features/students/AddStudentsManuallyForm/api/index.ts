import { injectToAppApi } from 'shared/api'

const registerUserApi = injectToAppApi({
  endpoints: builder => ({
    deleteUser: builder.mutation<void, string>({
      query: userId => ({
        url: `users/${userId}`,
        method: 'DELETE',
      }),
    }),
    registerUser: builder.mutation<
      void,
      {
        username: string
        email: string
        password: string
        firstName: string
        lastName: string
        middleName?: { present: boolean; value?: string }
        streamNumber?: { present: boolean; value?: number }
        groupNumber?: { present: boolean; value?: number }
        roles: string[]
      }
    >({
      query: ({ ...body }) => ({
        url: `users/register`,
        method: 'POST',
        body,
      }),
    }),
  }),
})

export const { useRegisterUserMutation, useDeleteUserMutation } = registerUserApi
