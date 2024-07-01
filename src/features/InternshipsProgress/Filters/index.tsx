import { AutoComplete, Button, Checkbox, DatePicker, Form, Select } from 'antd'
import { useEffect, useState } from 'react'
import { SearchOutlined } from '@ant-design/icons'
import { useCompaniesQuery, useGroupsQuery, useStreamsQuery } from 'shared/api'
import { InternshipStatus, internshipStatusToStringRecord } from 'shared/entities/Internship'

const { Option } = Select

const UserInternshipFilters = ({ onFinish }: { onFinish: (values: string[][]) => void }) => {
  const { data: streamsData, isLoading: isStreamsLoading } = useStreamsQuery()
  const { data: groupsData } = useGroupsQuery()
  const { data: companies } = useCompaniesQuery()

  const [streamOptions, setStreamOptions] = useState<number[]>([])
  const [groupOptions, setGroupOptions] = useState<string[]>([])

  useEffect(() => {
    if (streamsData) {
      setStreamOptions(streamsData.map((stream: { streamNumber: number }) => stream.streamNumber))
    }
    if (groupsData) {
      setGroupOptions(groupsData.map((group: { groupNumber: string }) => group.groupNumber))
    }
  }, [streamsData, groupsData])

  return (
    <Form
      onFinish={values => {
        const params = [
          ['year', values.year?.$y.toString()],
          ['semester', values.semester],
          ['companyId', values.companyId],
          ['companyId', values.companyId],
          ['reverseSort', values.reverseSort],
          ['streamNumber', values.stream],
          ['groupNumber', values.group ?? ''],
        ]

        values.statuses?.forEach((status: string) => {
          params.push(['statuses', status])
        })
        onFinish(params)
      }}
      style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}
    >
      <Form.Item
        name='stream'
        style={{ width: 200 }}
      >
        <Select
          allowClear={true}
          placeholder='Поток'
          loading={isStreamsLoading}
        >
          {streamOptions.map(stream => (
            <Option
              key={stream}
              value={stream}
            >
              {stream}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        name='group'
        style={{ width: 200 }}
      >
        <AutoComplete
          options={groupOptions.map(group => ({ value: group }))}
          allowClear={true}
          placeholder='Группа'
          filterOption={(inputValue, option) => option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
        />
      </Form.Item>

      <Form.Item name={'statuses'}>
        <Select
          allowClear={true}
          mode='multiple'
          placeholder='Статусы'
          maxTagCount={2}
          style={{ width: 'auto', minWidth: 400 }}
          options={Object.values(InternshipStatus)
            .filter(val => typeof val === 'number')
            .map(val => ({
              label: internshipStatusToStringRecord[val as InternshipStatus],
              value: val,
            }))}
        />
      </Form.Item>

      <Form.Item name={'year'}>
        <DatePicker
          picker='year'
          placeholder='Год'
        />
      </Form.Item>

      <Form.Item name={'semester'}>
        <Select
          allowClear={true}
          placeholder='Семестр'
          options={[
            { value: 1, label: 1 },
            { value: 2, label: 2 },
          ]}
        />
      </Form.Item>

      <Form.Item
        name={'companyId'}
        style={{ width: '200px' }}
      >
        <Select
          allowClear={true}
          placeholder='Компания'
          options={companies?.items.map(val => {
            return {
              value: val.id,
              label: val.name,
            }
          })}
        />
      </Form.Item>

      <Form.Item
        name={'reverseSort'}
        valuePropName='checked'
      >
        <Checkbox>Отсортировать в обратном порядке</Checkbox>
      </Form.Item>

      <Form.Item>
        <Button
          icon={<SearchOutlined />}
          type='primary'
          htmlType='submit'
        >
          Поиск
        </Button>
      </Form.Item>
    </Form>
  )
}

export default UserInternshipFilters
