import { Button } from 'antd'
import { Diary } from 'shared/entities'
import { useDeleteDiaryMutation } from './api'

type DeleteDiaryProps = { diary: Diary; promiseCallback: (promise: Promise<void>) => void }
export const DeleteDiary = ({ diary, promiseCallback }: DeleteDiaryProps) => {
  const [deleteDiary] = useDeleteDiaryMutation()

  const deleteDiaryHanldler = () => {
    const deleteDiaryPromise = deleteDiary({ diaryId: diary.id }).unwrap()
    promiseCallback(deleteDiaryPromise)
  }

  return (
    <Button
      danger
      onClick={deleteDiaryHanldler}
    >
      {'Удалить'}
    </Button>
  )
}
