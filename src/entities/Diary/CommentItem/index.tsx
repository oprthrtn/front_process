import { DiaryCommentWithUserInfo } from 'shared/entities'
import { CommentItemStyled } from './styled'
import { Typography } from 'antd'
type CommentItemProps = {
  comment: DiaryCommentWithUserInfo
}
export const CommentItem = ({ comment }: CommentItemProps) => {
  return (
    <CommentItemStyled>
      <Typography.Text strong>{comment.userInfo?.username}:</Typography.Text>
      {comment.comment}
    </CommentItemStyled>
  )
}
