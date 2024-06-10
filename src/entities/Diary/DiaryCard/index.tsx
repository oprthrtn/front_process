import { Card, Flex } from 'antd'
import { ReactNode } from 'react'
import { Diary } from 'shared/entities'

type DiaryCardProps = {
  diary: Diary

  renderHeader?: (diary: Diary) => ReactNode
  renderBody?: (diary: Diary) => ReactNode
}
export const DiaryCard = ({ diary, renderHeader, renderBody }: DiaryCardProps) => {
  return (
    <Card
      title={
        <Flex
          align='center'
          justify='space-between'
        >
          {diary.name}
          <Flex
            align='center'
            gap={'1rem'}
          >
            {renderHeader?.(diary)}
          </Flex>
        </Flex>
      }
    >
      {renderBody?.(diary)}
    </Card>
  )
}
