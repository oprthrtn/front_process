import { injectToDiariesApi } from 'shared/api/init/diariesApi'
import { Template } from 'shared/entities'

const templatesApi = injectToDiariesApi({
  endpoints: builder => ({
    templates: builder.query<Array<Template>, void>({
      query: () => ({
        url: `templates`,
        method: 'GET',
      }),
    }),
    editTemplate: builder.mutation<
      void,
      {
        formData: FormData
        id: string
      }
    >({
      query: ({ formData, id }) => ({
        url: `templates/${id}`,
        method: 'PUT',
        body: formData,
      }),
    }),
    addTemplate: builder.mutation<
      void,
      {
        formData: FormData
      }
    >({
      query: ({ formData }) => ({
        url: `templates`,
        method: 'POST',
        body: formData,
      }),
    }),
    deleteTemplate: builder.mutation<Array<Template>, { id: string }>({
      query: ({ id }) => ({
        url: `templates/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
})

export const { useTemplatesQuery, useDeleteTemplateMutation, useEditTemplateMutation, useAddTemplateMutation } =
  templatesApi
