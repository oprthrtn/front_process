import { Spin } from 'antd'
import { CreateOrEditVacancy } from 'features/Company/CreateOrEditVacancy'
import { Link } from 'react-router-dom'
import { WithRole } from 'shared/HOC'
import { useCreateCompanyMutation, useVacanicesQuery } from 'shared/api'

const Vacancies = () => {
  const { data, isFetching } = useVacanicesQuery()
  const [createCompany, { isLoading: createIsLoading }] = useCreateCompanyMutation()
  return (
    <Spin spinning={isFetching}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h1>Вакансии</h1>
        <WithRole
          company={
            <CreateOrEditVacancy
              isLoading={createIsLoading}
              buttonText='Создать вакансию'
              onFinish={createCompany}
            />
          }
        />
      </div>
      <div style={{ display: 'flex', gap: '0.5rem', flexDirection: 'column' }}>
        {data?.items.map(item => {
          return (
            <Link
              key={item.id}
              to={item.id}
            >
              {item.name}
            </Link>
          )
        })}
      </div>
    </Spin>
  )
}

export default Vacancies
