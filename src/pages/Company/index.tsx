import { Button, Empty, Spin } from 'antd'
import { CreateOrEditCompany } from 'features/Company'
import { CreateOrEditVacancy } from 'features/Company/CreateOrEditVacancy'
import { useMemo } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { WithRole } from 'shared/HOC'
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
  const { data, isFetching: companiesIsFetching } = useCompaniesByIdQuery({ companyId: companyId! })
  const [editCompany, { isLoading: editIsLoading }] = useEditCompanyMutation()
  const [deleteCompany, { isLoading: deleteIsLoading }] = useDeleteCompanyMutation()
  const [createVacancy, { isLoading: createIsLoading }] = useCreateVacancyMutation()

  const isLoadng = useMemo(() => companiesIsFetching || deleteIsLoading, [companiesIsFetching, deleteIsLoading])
  if (!data) {
    return null
  }

  return (
    <Spin spinning={isLoadng}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h1>{data?.name}</h1>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <WithRole
            dean={
              <>
                <CreateOrEditCompany
                  isLoading={editIsLoading}
                  buttonText='Редактировать компанию'
                  onFinish={values => {
                    return editCompany({ companyId: data?.id, ...values }).unwrap()
                  }}
                  initialValues={{ name: data.name, description: data.description }}
                />
                <Button
                  danger
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
              </>
            }
          />
        </div>
      </div>
      <div dangerouslySetInnerHTML={{ __html: data?.description }} />

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h2>Вакансии:</h2>
        <WithRole
          company={
            <CreateOrEditVacancy
              isLoading={createIsLoading}
              onFinish={values => {
                return createVacancy({ ...values, companyId: data.id }).unwrap()
              }}
              buttonText='Создать вакансию'
            />
          }
          dean={
            <CreateOrEditVacancy
              isLoading={createIsLoading}
              onFinish={values => {
                return createVacancy({ ...values, companyId: data.id }).unwrap()
              }}
              buttonText='Создать вакансию'
            />
          }
        />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {data.vacancies.length ? (
          data.vacancies.map(vacancy => {
            return <Link to={VACANCY_ROUTE(vacancy.id)}>{vacancy.name}</Link>
          })
        ) : (
          <Empty />
        )}
      </div>
    </Spin>
  )
}

export default Company
