import { Spin, Typography } from 'antd'
import { DiaryCard } from 'entities/Diary'
import { ChangeDiaryStatus, DeleteDiary, DownloadPractice } from 'features/Diary'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDiaryByIdQuery } from 'shared/api'
import { DiaryComments } from 'widgets/Diary'

const Diary = () => {
  const { diaryId } = useParams<{ diaryId: string }>()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const { data, isSuccess, isFetching } = useDiaryByIdQuery({ diaryId: diaryId! })

  const setLoadingPromiseCallback = (promise: Promise<void>) => {
    setIsLoading(true)
    promise.finally(() => {
      setIsLoading(false)
    })
  }

  if (!isSuccess) {
    return null
  }

  const isSpinning = isLoading || isFetching
  return (
    <>
      <h1>Дневник</h1>
      <Spin spinning={isSpinning}>
        <DiaryCard
          diary={data}
          renderHeader={diary => {
            return (
              <DeleteDiary
                diary={diary}
                promiseCallback={setLoadingPromiseCallback}
              />
            )
          }}
          renderBody={diary => {
            return (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <Typography.Text
                    strong
                    style={{ marginBottom: '1rem' }}
                  >
                    Статус:{' '}
                  </Typography.Text>
                  <ChangeDiaryStatus
                    diary={diary}
                    promiseCallback={setLoadingPromiseCallback}
                  />
                  <DownloadPractice diary={diary} />
                </div>
                <DiaryComments diary={diary} />
              </div>
            )
          }}
        />
      </Spin>
    </>
  )
}

export default Diary
