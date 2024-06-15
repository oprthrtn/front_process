import { Button } from 'antd'
import { CreateOrEditCompany } from 'features/Company'
import { CreateOrEditVacancy } from 'features/Company/CreateOrEditVacancy'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {
  useCompaniesByIdQuery,
  useCreateVacancyMutation,
  useDeleteCompanyMutation,
  useEditCompanyMutation,
} from 'shared/api'
import { COMPANY_ROUTE, VACANCY_ROUTE } from 'shared/config'

const Company = () => {
  const { companyId } = useParams()
  const navigate = useNavigate()
  const { data } = useCompaniesByIdQuery({ companyId: companyId! })
  const [editCompany] = useEditCompanyMutation()
  const [deleteCompany] = useDeleteCompanyMutation()
  const [createVacancy] = useCreateVacancyMutation()
  if (!data) {
    return null
  }

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h1>{data?.name}</h1>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <CreateOrEditCompany
            buttonText='Редактировать компанию'
            onFinish={values => editCompany({ companyId: data?.id, ...values })}
            initialValues={{ name: data.name, description: data.description }}
          />
          <Button
            onClick={() => {
              deleteCompany({ companyId: data.id })
                .unwrap()
                .then(() => {
                  navigate(COMPANY_ROUTE)
                })
            }}
          >
            Удалить комапнию
          </Button>
        </div>
      </div>
      {data?.description}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h2>Вакансии:</h2>
        <CreateOrEditVacancy
          onFinish={values => {
            createVacancy({ ...values, companyId: data.id })
          }}
          buttonText='Создать вакансию'
        />
      </div>
      {data.vacancies.map(vacancy => {
        return <Link to={VACANCY_ROUTE(vacancy.id)}>{vacancy.name}</Link>
      })}
    </>
  )
}

export default Company
