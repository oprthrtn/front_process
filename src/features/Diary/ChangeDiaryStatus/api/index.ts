import { injectToDiariesApi } from 'shared/api'
import { DiaryStatus } from 'shared/entities'

const changeDiaryStatusApi = injectToDiariesApi({
  endpoints: builder => ({
    changeDiaryStatus: builder.mutation<void, { diaryId: string; diaryStatus: DiaryStatus }>({
      query: ({ diaryId, diaryStatus }) => ({
        url: `diaries/${diaryId}/status`,
        method: 'POST',
        body: diaryStatus,
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      invalidatesTags: ['GET_DIARY_BY_ID'],
    }),
  }),
})

export const { useChangeDiaryStatusMutation } = changeDiaryStatusApi
