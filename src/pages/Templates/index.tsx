import { Button, Card } from 'antd'
import { Link } from 'react-router-dom'
import {
  useAddTemplateMutation,
  useDeleteTemplateMutation,
  useEditTemplateMutation,
  useTemplatesQuery,
} from 'shared/api'

const Templates = () => {
  const { data } = useTemplatesQuery()
  const [deleteTemplate] = useDeleteTemplateMutation()
  const [editTemplate] = useEditTemplateMutation()
  const [addTemplate] = useAddTemplateMutation()
  return (
    <>
      <h1>Шаблоны</h1>
      <>
        <input
          type='file'
          onChange={e => {
            const file = e?.currentTarget?.files?.[0]

            if (file) {
              const formData = new FormData()
              formData.append('file', file)
              formData.append('dto', JSON.stringify({ name: 'new template', description: '' }))
              addTemplate({ formData })
            }
          }}
        />
      </>
      {data?.map(template => {
        return (
          <Card
            key={template.id}
            actions={[
              <Link
                to={`${import.meta.env.VITE_DIARIES_API_URL}/files/download?filePath=${template.filePath}`}
                target='_blank'
              >
                Скачать шаблон
              </Link>,
              <input
                type='file'
                onChange={e => {
                  const file = e?.currentTarget?.files?.[0]

                  if (file) {
                    const formData = new FormData()
                    formData.append('file', file)
                    formData.append('dto', JSON.stringify({ name: '', description: '' }))
                    editTemplate({ formData, id: template.id })
                  }
                }}
              />,
              <Button
                danger
                onClick={() => {
                  deleteTemplate({ id: template.id })
                }}
              >
                Удалить шаблон
              </Button>,
            ]}
            title={template.name}
          ></Card>
        )
      })}
    </>
  )
}

export default Templates
