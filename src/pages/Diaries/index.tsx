import { Link } from 'react-router-dom'
import { useAddDiaryMutation, useDiariesQuery, useUserIdByTokenQuery } from 'shared/api'
import { DIARY_ROUTE } from 'shared/config'

export const Diaries = () => {
  const { data } = useDiariesQuery()
  const { data: userId } = useUserIdByTokenQuery()
  const [addDiary] = useAddDiaryMutation()
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <h1>Дневники</h1>
      <input
        type='file'
        onChange={e => {
          const file = e?.currentTarget?.files?.[0]

          if (file) {
            const formData = new FormData()

            formData.append(
              'dto',
              JSON.stringify({
                userId: userId?.userId,
                name: 'string',
                status: 'ACCEPTED',
              })
            )
            formData.append('file', file)
            addDiary({ formData })
          }
        }}
      />
      {data?.map(diary => {
        return (
          <Link
            to={DIARY_ROUTE(diary.id)}
            key={diary.id}
          >
            {diary.name}
          </Link>
        )
      })}
    </div>
  )
}

export default Diaries
