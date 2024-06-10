import { Diary } from 'shared/entities'
import { Link } from 'react-router-dom'
import { Button, Typography } from 'antd'
import { useDeleteFileMutation } from './api'

type DownloadPracticeProps = {
  diary: Diary
}

export const DownloadPractice = ({ diary }: DownloadPracticeProps) => {
  const [deleteFile] = useDeleteFileMutation()
  const deleteFileHanlder = () => {
    deleteFile({ filePath: diary.filePath })
  }
  return (
    <>
      <Typography.Text>Дневники:</Typography.Text>
      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
        <Link
          to={`${import.meta.env.VITE_DIARIES_API_URL}/files/download?filePath=${diary.filePath}`}
          target='_blank'
        >
          Скачать дневник практики
        </Link>

        <Button
          danger
          onClick={deleteFileHanlder}
        >
          Удалить дневник практики
        </Button>
      </div>
    </>
  )
}
