import { Diary } from 'shared/entities'
import { Link } from 'react-router-dom'
import { Typography } from 'antd'

type DownloadPracticeProps = {
  diary: Diary
}

export const DownloadPractice = ({ diary }: DownloadPracticeProps) => {
  return (
    <>
      <Typography.Text
        strong
        style={{ margin: '1rem 0' }}
      >
        Дневники:
      </Typography.Text>
      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
        <Link
          to={`${import.meta.env.VITE_DIARIES_API_URL}/files/download?filePath=${diary.filePath}`}
          target='_blank'
        >
          Скачать дневник практики
        </Link>
      </div>
    </>
  )
}
