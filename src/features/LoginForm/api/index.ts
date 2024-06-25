import { injectToAppApi } from 'shared/api'
import { LoginRequest } from './LoginRequest'
import { LoginRespone } from './LoginResponse'

const createBookingApi = injectToAppApi({
  endpoints: builder => ({
    login: builder.mutation<LoginRespone, LoginRequest>({
      query: body => ({
        url: `/login`,
        method: 'POST',
        body,
      }),
    }),
  }),
})

export const { useLoginMutation } = createBookingApi
