import { Card, Select } from 'antd'
import { WithRole } from 'shared/HOC'

import { InpernshipStatus, Internship, internshipStatusToStringRecord } from 'shared/entities/Internship'
type InternshipCardProps = {
  userId?: string
  internship: Internship
}

const CompanySelect = ({ userId, internship }: { userId?: string; internship: Internship }) => {
  const isCurrentUserIntership = userId === internship.userId

  if (isCurrentUserIntership === false) {
    return internshipStatusToStringRecord[internship.status]
  }

  return (
    <Select
      value={internship.status}
      options={[
        {
          value: InpernshipStatus.CV_CENT,
          label: internshipStatusToStringRecord[InpernshipStatus.CV_CENT],
          disabled: true,
        },
        {
          value: InpernshipStatus.INTERVIEW_PASSED,
          label: internshipStatusToStringRecord[InpernshipStatus.INTERVIEW_PASSED],
          disabled: true,
        },
        {
          value: InpernshipStatus.INTERVIEW_SCHEDULED,
          label: internshipStatusToStringRecord[InpernshipStatus.INTERVIEW_SCHEDULED],
          disabled: true,
        },
        {
          value: InpernshipStatus.OFFER_ACCEPTED,
          label: internshipStatusToStringRecord[InpernshipStatus.OFFER_ACCEPTED],
          disabled: true,
        },
        {
          value: InpernshipStatus.OFFER_DECLINED,
          label: internshipStatusToStringRecord[InpernshipStatus.OFFER_DECLINED],
          disabled: true,
        },
        {
          value: InpernshipStatus.OFFER_RECIEVED,
          label: internshipStatusToStringRecord[InpernshipStatus.OFFER_RECIEVED],
        },
      ]}
    />
  )
}
const StudentSelect = ({ userId, internship }: { userId?: string; internship: Internship }) => {
  const isCurrentUserIntership = userId === internship.userId

  if (isCurrentUserIntership === false) {
    return internshipStatusToStringRecord[internship.status]
  }

  return (
    <Select
      value={internship.status}
      options={[
        {
          value: InpernshipStatus.CV_CENT,
          label: internshipStatusToStringRecord[InpernshipStatus.CV_CENT],
          disabled: true,
        },
        {
          value: InpernshipStatus.INTERVIEW_PASSED,
          label: internshipStatusToStringRecord[InpernshipStatus.INTERVIEW_PASSED],
        },
        {
          value: InpernshipStatus.INTERVIEW_SCHEDULED,
          label: internshipStatusToStringRecord[InpernshipStatus.INTERVIEW_SCHEDULED],
        },
        {
          value: InpernshipStatus.OFFER_ACCEPTED,
          label: internshipStatusToStringRecord[InpernshipStatus.OFFER_ACCEPTED],
          disabled: internship.status !== InpernshipStatus.OFFER_RECIEVED,
        },
        {
          value: InpernshipStatus.OFFER_DECLINED,
          label: internshipStatusToStringRecord[InpernshipStatus.OFFER_DECLINED],
          disabled: internship.status !== InpernshipStatus.OFFER_RECIEVED,
        },
        {
          value: InpernshipStatus.OFFER_RECIEVED,
          label: internshipStatusToStringRecord[InpernshipStatus.OFFER_RECIEVED],
          disabled: true,
        },
      ]}
    />
  )
}
export const InternshipCard = ({ internship, userId }: InternshipCardProps) => {
  return (
    <Card
      style={{
        display: 'flex',
        gap: '1rem',
        alignItems: 'flex-start',
        border: '1px solid #eee7e7',
        borderRadius: '0.5rem',
      }}
    >
      <div>
        <p>
          <b>Название компании: </b>
          {internship.companyName}
        </p>
        <p>
          <b>Вакансия: </b>
          {internship.vacancyName}
        </p>
      </div>
      <p>
        <b>Статус: </b>
        <WithRole
          dean={
            <Select
              value={internship.status}
              options={[
                { value: InpernshipStatus.CV_CENT, label: internshipStatusToStringRecord[InpernshipStatus.CV_CENT] },
                {
                  value: InpernshipStatus.INTERVIEW_PASSED,
                  label: internshipStatusToStringRecord[InpernshipStatus.INTERVIEW_PASSED],
                },
                {
                  value: InpernshipStatus.INTERVIEW_SCHEDULED,
                  label: internshipStatusToStringRecord[InpernshipStatus.INTERVIEW_SCHEDULED],
                },
                {
                  value: InpernshipStatus.OFFER_ACCEPTED,
                  label: internshipStatusToStringRecord[InpernshipStatus.OFFER_ACCEPTED],
                },
                {
                  value: InpernshipStatus.OFFER_DECLINED,
                  label: internshipStatusToStringRecord[InpernshipStatus.OFFER_DECLINED],
                },
                {
                  value: InpernshipStatus.OFFER_RECIEVED,
                  label: internshipStatusToStringRecord[InpernshipStatus.OFFER_RECIEVED],
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
