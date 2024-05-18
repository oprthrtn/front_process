import { injectToAppApi } from 'shared/api'
import { LoginRequest } from './LoginRequest'
import { Profile } from 'shared/entities'

const createBookingApi = injectToAppApi({
  endpoints: builder => ({
    login: builder.mutation<Profile, LoginRequest>({
      query: body => ({
        url: `login`,
        method: 'POST',
        body,
      }),
    }),
  }),
})

export const { useLoginMutation } = createBookingApi
