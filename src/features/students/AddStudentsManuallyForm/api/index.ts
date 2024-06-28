import { injectToAppApi } from 'shared/api'

const registerUserApi = injectToAppApi({
  endpoints: builder => ({
    deleteUser: builder.mutation<void, string>({
      query: userId => ({
        url: `/${userId}`,
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
        middleName?: string
        streamNumber?: number
        groupNumber?: string
        roles: string[]
        companyId: string
      }
    >({
      query: ({ ...body }) => ({
        url: `/register`,
        method: 'POST',
        body,
      }),
    }),
  }),
})

export const { useRegisterUserMutation, useDeleteUserMutation } = registerUserApi
