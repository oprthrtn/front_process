import { Button, Spin } from 'antd'
import { CreateOrEditVacancy } from 'features/Company/CreateOrEditVacancy'
import { useNavigate, useParams } from 'react-router-dom'
import { WithRole } from 'shared/HOC'
import { useDeleteVacancyMutation, useEditVacancyMutation, useVacancyByIdQuery } from 'shared/api'
import { VACANCIES_ROUTE } from 'shared/config'

const Vacancy = () => {
  const { vacancyId } = useParams()
  const navigate = useNavigate()
  const { data, isFetching } = useVacancyByIdQuery({ vacancyId: vacancyId! })
  const [editVacancy, { isLoading: editIsLoading }] = useEditVacancyMutation()
  const [deleteVacancy] = useDeleteVacancyMutation()

  if (!data) {
    return null
  }

  return (
    <Spin spinning={isFetching}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h1>{data?.name}</h1>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <WithRole
            company={
              <>
                <CreateOrEditVacancy
                  isLoading={editIsLoading}
                  buttonText='Редактировать вакансию'
                  onFinish={values => editVacancy({ vacancyId: data?.id, ...values })}
                  initialValues={{ name: data.name, description: data.description, amountOfPeople: data.maxAmount }}
                />
                <Button
                  onClick={() => {
                    deleteVacancy({ vacancyId: data.id })
                      .unwrap()
                      .then(() => {
                        navigate(VACANCIES_ROUTE)
                      })
                  }}
                >
                  Удалить вакансию
                </Button>
              </>
            }
          />
        </div>
      </div>
      {data?.description}
    </Spin>
  )
}

export default Vacancy
