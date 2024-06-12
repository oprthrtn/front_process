import { UserInfo } from '../Profile'

export enum DiaryStatus {
  ACCEPTED = 'ACCEPTED',
  IN_QUEUE_FOR_CHECK = 'IN_QUEUE_FOR_CHECK',
  NEEDS_IMPROVEMENT = 'NEEDS_IMPROVEMENT',
}

export type Diary = {
  creationDate: string
  filePath: string
  id: string
  name: string
  status: DiaryStatus
  userId: string
}

export type DiaryComment = {
  id: string
  diaryId: string
  userId: string
  comment: string
  creationDate: string
}

export type DiaryCommentWithUserInfo = DiaryComment & { userInfo: UserInfo | undefined }
