import { Spin } from 'antd'
import { CreateOrEditVacancy } from 'features/Company/CreateOrEditVacancy'
import { Link } from 'react-router-dom'
import { useCreateCompanyMutation, useVacanicesQuery } from 'shared/api'

const Vacancies = () => {
  const { data, isFetching } = useVacanicesQuery()
  const [createCompany, { isLoading: createIsLoading }] = useCreateCompanyMutation()
  return (
    <Spin spinning={isFetching}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h1>Вакансии</h1>
        <CreateOrEditVacancy
          isLoading={createIsLoading}
          buttonText='Создать вакансию'
          onFinish={createCompany}
        />
      </div>
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
    </Spin>
  )
}

export default Vacancies
