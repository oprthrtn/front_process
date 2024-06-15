import { CreateOrEditCompany } from 'features/Company'
import { Link } from 'react-router-dom'
import { useCompaniesQuery, useCreateCompanyMutation } from 'shared/api'

const Companies = () => {
  const { data } = useCompaniesQuery()
  const [createCompany] = useCreateCompanyMutation()
  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h1>Компании</h1>
        <CreateOrEditCompany
          buttonText='Создать компанию'
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
    </>
  )
}

export default Companies
