/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Form, Input } from 'antd'
import { Diary } from 'shared/entities'
import { useAddCommentMutation } from './api'

type AddCommentInputProps = { diary: Diary; userId: string; promiseCallback: (promise: Promise<void>) => void }

export const AddCommentInput = ({ diary, userId, promiseCallback }: AddCommentInputProps) => {
  const [addCommentStatus] = useAddCommentMutation()

  const [form] = Form.useForm()
  const addCommentHandler = ({ comment }: { comment: string }) => {
    const changeDiaryStatusPromise = addCommentStatus({
      diaryId: diary.id,
      userId,
      comment,
    }).unwrap()

    changeDiaryStatusPromise.then(() => {
      form.resetFields()
    })

    promiseCallback(changeDiaryStatusPromise)
  }

  return (
    <Form
      onFinish={addCommentHandler}
      style={{ display: 'flex', gap: '0.5rem' }}
      form={form}
    >
      <Form.Item
        name={'comment'}
        style={{ flexGrow: 1 }}
      >
        <Input />
      </Form.Item>
      <Form.Item>
        <Button
          htmlType='submit'
          type='primary'
        >
          Отправить
        </Button>
      </Form.Item>
    </Form>
  )
}
