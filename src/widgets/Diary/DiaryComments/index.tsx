import { Spin, Typography } from 'antd'
import { AddCommentInput } from 'features/Diary/AddComment'
import { useState } from 'react'
import { useDiaryCommentsQuery } from 'shared/api'
import { useUserIdByTokenQuery } from 'shared/api/dictionary/users'
import { Diary } from 'shared/entities'
import { DiaryCommentsWrapperStyled } from './styled'
import { CommentItem } from 'entities/Diary'

type DiaryCommentsProps = {
  diary: Diary
}
export const DiaryComments = ({ diary }: DiaryCommentsProps) => {
  const {
    data: comments,
    isSuccess: commentsIsSuccess,
    isFetching: commentsIsFetcing,
  } = useDiaryCommentsQuery({ diaryId: diary.id })

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const { data: userId, isSuccess: userIdIsSuccess, isFetching: userIdIsFetching } = useUserIdByTokenQuery()

  const setLoadingPromiseCallback = (promise: Promise<void>) => {
    setIsLoading(true)
    promise.finally(() => {
      setIsLoading(false)
    })
  }

  if (!userIdIsSuccess || !commentsIsSuccess) {
    return null
  }
  const isSpinning = isLoading || commentsIsFetcing || userIdIsFetching
  return (
    <Spin spinning={isSpinning}>
      <DiaryCommentsWrapperStyled>
        <Typography.Text strong>{'Комментарии:'}</Typography.Text>
        <div className='comment-items-wrapper'>
          {comments?.map(comment => {
            return (
              <CommentItem
                key={comment.id}
                comment={comment}
              />
            )
          })}
        </div>
        <AddCommentInput
          diary={diary}
          userId={userId.userId}
          promiseCallback={setLoadingPromiseCallback}
        />
      </DiaryCommentsWrapperStyled>
    </Spin>
  )
}
