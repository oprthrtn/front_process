// src/features/InternshipInfo/InternshipInfo.tsx

import { Empty, Spin, Typography } from 'antd'
import { InternshipCard } from 'entities/Internship'
import { useCompatInternshipsQuery } from 'shared/api'

const InternshipInfo = ({ userId }: { userId: string }) => {
  const { data, isFetching } = useCompatInternshipsQuery({ userId })

  return (
    <Spin spinning={isFetching}>
      <Typography.Title level={5}>Информация о стажировках:</Typography.Title>
      {data?.items.length ? (
        <>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {data?.items.map((internship, idx) => {
              return (
                <InternshipCard
                  key={idx}
                  internship={internship}
                  userId={userId}
                  studentId={internship.userId}
                />
              )
            })}
          </div>

          {/* <Button
            type='primary'
            style={{ marginRight: 8 }}
          >
            Посмотреть фидбэк
          </Button>
          <Button type='dashed'>Добавить новое место стажировки</Button> */}
        </>
      ) : (
        <Empty />
      )}
    </Spin>
  )
}

export default InternshipInfo
