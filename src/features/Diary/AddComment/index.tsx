/* eslint-disable @typescript-eslint/no-explicit-any */
import { Input } from 'antd'
import { Diary } from 'shared/entities'
import { useAddCommentMutation } from './api'
import { useDebouncedCallback } from 'use-debounce'

type AddCommentInputProps = { diary: Diary; userId: string; promiseCallback: (promise: Promise<void>) => void }

export const AddCommentInput = ({ diary, userId, promiseCallback }: AddCommentInputProps) => {
  const [addCommentStatus] = useAddCommentMutation()

  const addCommentHandler = useDebouncedCallback((comment: string) => {
    const changeDiaryStatusPromise = addCommentStatus({
      diaryId: diary.id,
      userId,
      comment,
    }).unwrap()

    promiseCallback(changeDiaryStatusPromise)
  }, 500)

  return (
    <Input
      onChange={e => {
        addCommentHandler(e.currentTarget.value)
      }}
    />
  )
}
