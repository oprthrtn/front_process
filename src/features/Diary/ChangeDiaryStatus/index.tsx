import { Select } from 'antd'
import { Diary, DiaryStatus } from 'shared/entities'
import { useChangeDiaryStatusMutation } from './api'

type ChangeDiaryStatusProps = { diary: Diary; promiseCallback: (promise: Promise<void>) => void }

export const ChangeDiaryStatus = ({ diary, promiseCallback }: ChangeDiaryStatusProps) => {
  const [changeDiaryStatus] = useChangeDiaryStatusMutation()

  const changeDiaryStatusHandler = (diaryStatus: DiaryStatus) => {
    const changeDiaryStatusPromise = changeDiaryStatus({
      diaryId: diary.id,
      diaryStatus,
    }).unwrap()

    promiseCallback(changeDiaryStatusPromise)
  }

  return (
    <Select
      value={diary.status}
      options={[
        { value: DiaryStatus.ACCEPTED, label: 'Принято' },
        { value: DiaryStatus.IN_QUEUE_FOR_CHECK, label: 'В очереди' },
        { value: DiaryStatus.NEEDS_IMPROVEMENT, label: 'Требуется улучшение' },
      ]}
      onChange={changeDiaryStatusHandler}
    />
  )
}
