import { appApi } from 'shared/api/init'
import { injectToDiariesApi } from 'shared/api/init/diariesApi'
import { Diary, DiaryComment, DiaryCommentWithUserInfo, UserInfo } from 'shared/entities'

const diariesApi = injectToDiariesApi({
  endpoints: builder => ({
    diaries: builder.query<Array<Diary>, void>({
      query: () => ({
        url: `diaries`,
        method: 'GET',
      }),
      providesTags: ['GET_DIARIES'],
    }),
    diaryById: builder.query<Diary, { diaryId: string }>({
      query: ({ diaryId }) => ({
        url: `diaries/${diaryId}`,
        method: 'GET',
      }),
      providesTags: ['GET_DIARY_BY_ID'],
    }),
    addDiary: builder.mutation<
      void,
      {
        formData: FormData
      }
    >({
      query: ({ formData }) => ({
        url: `diaries`,
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['GET_DIARIES'],
    }),
    diaryComments: builder.query<Array<DiaryCommentWithUserInfo>, { diaryId: string }>({
      queryFn: async ({ diaryId }, api, _extraOptions, baseQuery) => {
        const commentsData = await baseQuery(`diaries/${diaryId}/comments`)

        if (commentsData.error) {
          return { error: { status: 'FETCH_ERROR', error: '' } }
        }

        const resultPromises = (commentsData.data as Array<DiaryComment>).map(async comment => {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-ignore
          const user = (await api.dispatch(appApi.endpoints.userInfoById.initiate({ userId: comment.userId }))) as {
            data: UserInfo
          }
          return { ...comment, userInfo: user.data || undefined }
        })
        return {
          data: (await Promise.all(resultPromises)).sort((a, b) => {
            return new Date(a.creationDate).getTime() < new Date(b.creationDate).getTime() ? -1 : 1
          }),
        }
      },
      providesTags: ['GET_DIARY_COMMENTS'],
    }),
  }),
})

export const { useDiariesQuery, useDiaryByIdQuery, useDiaryCommentsQuery, useAddDiaryMutation } = diariesApi
