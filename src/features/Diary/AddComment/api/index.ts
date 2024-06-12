import { injectToDiariesApi } from 'shared/api'

const addCommentApi = injectToDiariesApi({
  endpoints: builder => ({
    addComment: builder.mutation<void, { diaryId: string; userId: string; comment: string }>({
      query: ({ diaryId, ...body }) => ({
        url: `diaries/${diaryId}/comment`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['GET_DIARY_COMMENTS'],
    }),
  }),
})

export const { useAddCommentMutation } = addCommentApi
