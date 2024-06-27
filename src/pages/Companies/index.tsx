import { Spin } from 'antd'
import { CreateOrEditCompany } from 'features/Company'
import { Link } from 'react-router-dom'
import { WithRole } from 'shared/HOC'
import { useCompaniesQuery, useCreateCompanyMutation } from 'shared/api'

const Companies = () => {
  const { data, isLoading } = useCompaniesQuery()
  const [createCompany, { isLoading: createIsLoading }] = useCreateCompanyMutation()
  return (
    <Spin spinning={isLoading}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h1>Компании</h1>
        <WithRole
          dean={
            <CreateOrEditCompany
              buttonText='Создать компанию'
              onFinish={createCompany}
              isLoading={createIsLoading}
            />
          }
        />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
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

export default Companies
