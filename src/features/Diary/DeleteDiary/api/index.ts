import { injectToDiariesApi } from 'shared/api'

const deleteDiaryApi = injectToDiariesApi({
  endpoints: builder => ({
    deleteDiary: builder.mutation<void, { diaryId: string }>({
      query: ({ diaryId }) => ({
        url: `diaries/${diaryId}`,
        method: 'DELETE',
      }),
    }),
  }),
})

export const { useDeleteDiaryMutation } = deleteDiaryApi
