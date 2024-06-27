import { Button, Spin } from 'antd'
import { CreateOrEditVacancy } from 'features/Company/CreateOrEditVacancy'
import { useNavigate, useParams } from 'react-router-dom'
import { WithRole } from 'shared/HOC'
import {
  useCompatInternshipsQuery,
  useCreateInternshipMutation,
  useDeleteVacancyMutation,
  useEditVacancyMutation,
  useUserIdByTokenQuery,
  useVacancyByIdQuery,
} from 'shared/api'
import { VACANCIES_ROUTE } from 'shared/config'

const CreateInternshipButton = ({ vacancyId }: { vacancyId?: string }) => {
  const { data: userIdData, isFetching } = useUserIdByTokenQuery()
  const { data } = useCompatInternshipsQuery({ userId: userIdData?.userId, vacancyId })
  const [createInternship, { isLoading }] = useCreateInternshipMutation()

  if (!userIdData || !vacancyId || !data) {
    return null
  }

  return (
    <Button
      disabled={data.items?.length >= 1}
      loading={isFetching || isLoading}
      onClick={() => {
        createInternship({ userId: userIdData!.userId, vacancyId })
      }}
    >
      Отправить заявку
    </Button>
  )
}
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
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <h1>{data?.name}</h1>
          <h5 style={{ marginTop: 0 }}>
            Осталось мест: {data.positionsLeft} из {data.maxAmount}
          </h5>
        </div>
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
            dean={
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
            student={<CreateInternshipButton vacancyId={vacancyId} />}
          />
        </div>
      </div>
      <div dangerouslySetInnerHTML={{ __html: data?.description }}></div>
    </Spin>
  )
}

export default Vacancy
