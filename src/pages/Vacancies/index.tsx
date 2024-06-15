import { CreateOrEditVacancy } from 'features/Company/CreateOrEditVacancy'
import { Link } from 'react-router-dom'
import { useCreateCompanyMutation, useVacanicesQuery } from 'shared/api'

const Vacancies = () => {
  const { data } = useVacanicesQuery()
  const [createCompany] = useCreateCompanyMutation()
  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h1>Вакансии</h1>
        <CreateOrEditVacancy
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
    </>
  )
}

export default Vacancies
