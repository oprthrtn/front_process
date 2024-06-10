import { injectToDiariesApi } from 'shared/api'

const deleteDiaryApi = injectToDiariesApi({
  endpoints: builder => ({
    deleteFile: builder.mutation<void, { filePath: string }>({
      query: ({ filePath }) => ({
        url: `files/delete?filePath=${filePath}`,
        method: 'DELETE',
      }),
    }),
  }),
})

export const { useDeleteFileMutation } = deleteDiaryApi
