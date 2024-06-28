import { Button, Card, Select } from 'antd'
import { WithRole } from 'shared/HOC'
import { useDeleteInternshipMutation, useUpdateInternshipStatusMutation, useUserInfoByIdQuery } from 'shared/api'

import { InternshipStatus, Internship, internshipStatusToStringRecord } from 'shared/entities/Internship'
type InternshipCardProps = {
  userId?: string
  studentId: string
  internship: Internship
}

const CompanySelect = ({ userId, internship }: { userId?: string; internship: Internship }) => {
  const isCurrentUserIntership = userId === internship.userId
  const [changeInternshipStatus] = useUpdateInternshipStatusMutation()
  if (isCurrentUserIntership === false) {
    return internshipStatusToStringRecord[internship.status]
  }

  return (
    <Select
      value={internship.status}
      onChange={value => {
        changeInternshipStatus({ internshipId: internship.internshipId, status: value })
      }}
      options={[
        {
          value: InternshipStatus.CV_CENT,
          label: internshipStatusToStringRecord[InternshipStatus.CV_CENT],
          disabled: true,
        },
        {
          value: InternshipStatus.INTERVIEW_PASSED,
          label: internshipStatusToStringRecord[InternshipStatus.INTERVIEW_PASSED],
          disabled: true,
        },
        {
          value: InternshipStatus.INTERVIEW_SCHEDULED,
          label: internshipStatusToStringRecord[InternshipStatus.INTERVIEW_SCHEDULED],
          disabled: true,
        },
        {
          value: InternshipStatus.OFFER_ACCEPTED,
          label: internshipStatusToStringRecord[InternshipStatus.OFFER_ACCEPTED],
          disabled: true,
        },
        {
          value: InternshipStatus.OFFER_DECLINED,
          label: internshipStatusToStringRecord[InternshipStatus.OFFER_DECLINED],
          disabled: true,
        },
        {
          value: InternshipStatus.OFFER_RECIEVED,
          label: internshipStatusToStringRecord[InternshipStatus.OFFER_RECIEVED],
        },
      ]}
    />
  )
}
const StudentSelect = ({ userId, internship }: { userId?: string; internship: Internship }) => {
  const isCurrentUserIntership = userId === internship.userId

  const [changeInternshipStatus] = useUpdateInternshipStatusMutation()
  if (isCurrentUserIntership === false) {
    return internshipStatusToStringRecord[internship.status]
  }

  return (
    <Select
      value={internship.status}
      onChange={value => {
        changeInternshipStatus({ internshipId: internship.internshipId, status: value })
      }}
      options={[
        {
          value: InternshipStatus.CV_CENT,
          label: internshipStatusToStringRecord[InternshipStatus.CV_CENT],
          disabled: true,
        },
        {
          value: InternshipStatus.INTERVIEW_PASSED,
          label: internshipStatusToStringRecord[InternshipStatus.INTERVIEW_PASSED],
        },
        {
          value: InternshipStatus.INTERVIEW_SCHEDULED,
          label: internshipStatusToStringRecord[InternshipStatus.INTERVIEW_SCHEDULED],
        },
        {
          value: InternshipStatus.OFFER_ACCEPTED,
          label: internshipStatusToStringRecord[InternshipStatus.OFFER_ACCEPTED],
          disabled: internship.status !== InternshipStatus.OFFER_RECIEVED,
        },
        {
          value: InternshipStatus.OFFER_DECLINED,
          label: internshipStatusToStringRecord[InternshipStatus.OFFER_DECLINED],
          disabled: internship.status !== InternshipStatus.OFFER_RECIEVED,
        },
        {
          value: InternshipStatus.OFFER_RECIEVED,
          label: internshipStatusToStringRecord[InternshipStatus.OFFER_RECIEVED],
          disabled: true,
        },
      ]}
    />
  )
}

export const InternshipCard = ({ internship, userId, studentId }: InternshipCardProps) => {
  const [changeInternshipStatus] = useUpdateInternshipStatusMutation()
  const [deleteInternship] = useDeleteInternshipMutation()

  const { data: student } = useUserInfoByIdQuery({ userId: studentId! }, { skip: !studentId })
  return (
    <Card>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <p>
            <b>Студент: </b>
            {student?.lastName} {student?.firstName} {student?.middleName}
          </p>
          <p>
            <b>Название компании: </b>
            {internship.companyName}
          </p>
          <p>
            <b>Вакансия: </b>
            {internship.vacancyName}
          </p>
        </div>
        <WithRole
          dean={
            <Button
              onClick={() => {
                deleteInternship({ internshipId: internship.internshipId })
              }}
            >
              Удалить стажировку
            </Button>
          }
        />
      </div>
      <p>
        <b>Статус: </b>
        <WithRole
          dean={
            <Select
              onChange={value => {
                changeInternshipStatus({ internshipId: internship.internshipId, status: value })
              }}
              value={internship.status}
              options={[
                { value: InternshipStatus.CV_CENT, label: internshipStatusToStringRecord[InternshipStatus.CV_CENT] },
                {
                  value: InternshipStatus.INTERVIEW_PASSED,
                  label: internshipStatusToStringRecord[InternshipStatus.INTERVIEW_PASSED],
                },
                {
                  value: InternshipStatus.INTERVIEW_SCHEDULED,
                  label: internshipStatusToStringRecord[InternshipStatus.INTERVIEW_SCHEDULED],
                },
                {
                  value: InternshipStatus.OFFER_ACCEPTED,
                  label: internshipStatusToStringRecord[InternshipStatus.OFFER_ACCEPTED],
                },
                {
                  value: InternshipStatus.OFFER_DECLINED,
                  label: internshipStatusToStringRecord[InternshipStatus.OFFER_DECLINED],
                },
                {
                  value: InternshipStatus.OFFER_RECIEVED,
                  label: internshipStatusToStringRecord[InternshipStatus.OFFER_RECIEVED],
                },
              ]}
            />
          }
          student={
            <StudentSelect
              userId={userId}
              internship={internship}
            />
          }
          company={
            <CompanySelect
              userId={userId}
              internship={internship}
            />
          }
        />
      </p>
    </Card>
  )
}
