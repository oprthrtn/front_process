import { Link } from 'react-router-dom'
import { useDiariesQuery } from 'shared/api'
import { DIARY_ROUTE } from 'shared/config'

export const Diaries = () => {
  const { data } = useDiariesQuery()

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <h1>Дневники</h1>
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
