import { Spin } from 'antd'
import { CreateOrEditVacancy } from 'features/Company/CreateOrEditVacancy'
import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { WithRole } from 'shared/HOC'
import {
  VacancyList,
  useCreateVacancyMutation,
  useUserIdByTokenQuery,
  useUserInfoByIdQuery,
  useVacanicesQuery,
} from 'shared/api'
import { UserRole } from 'shared/entities'

const Vacancies = () => {
  const { data: userIdData } = useUserIdByTokenQuery()
  const userId = userIdData?.userId

  const { data: userInfoData } = useUserInfoByIdQuery({ userId: userId! }, { skip: !userId })

  const companyId = userInfoData?.companyId
  const { data, isFetching } = useVacanicesQuery(
    userInfoData?.roles.includes(UserRole.COMPANY) ? { companyId: companyId! } : {},
    { skip: !companyId }
  )

  const [createVacancy, { isLoading: createIsLoading }] = useCreateVacancyMutation()

  const groupedVacancies = useMemo(() => {
    const result: {
      [k: string]: Array<Omit<VacancyList['items'][0], 'companyName'>>
    } = {}

    data?.items.forEach(({ companyName, ...rest }) => {
      result[companyName] = Array.isArray(result[companyName]) ? [...result[companyName], rest] : [rest]
    })

    return Object.keys(result).map(key => {
      return {
        companyName: key,
        vacancies: result[key],
      }
    })
  }, [data?.items])

  return (
    <Spin spinning={isFetching}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h1>Вакансии</h1>
        <WithRole
          company={
            <CreateOrEditVacancy
              isLoading={createIsLoading}
              buttonText='Создать вакансию'
              onFinish={createVacancy}
            />
          }
          dean={
            <CreateOrEditVacancy
              showCompanySelect
              isLoading={createIsLoading}
              buttonText='Создать вакансию'
              onFinish={createVacancy}
            />
          }
        />
      </div>

      {groupedVacancies.map(item => {
        return (
          <section key={item.companyName}>
            <h1>{item.companyName}</h1>

            <div style={{ display: 'flex', gap: '0.5rem', flexDirection: 'column', marginLeft: '1rem' }}>
              {item.vacancies.map(vacancy => {
                return (
                  <Link
                    key={vacancy.id}
                    to={vacancy.id}
                  >
                    {vacancy.name}
                  </Link>
                )
              })}
            </div>
          </section>
        )
      })}
    </Spin>
  )
}

export default Vacancies
