import { useEffect, useState } from 'react'
import { Form, Select, Input, AutoComplete, Button } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { UserFilters } from 'shared/entities'
import { PaginationConfig } from 'antd/es/pagination'
import { useGroupsQuery, useStreamsQuery } from 'shared/api'

const { Option } = Select

const FiltersForm = ({
  onFinish,
  pagination,
}: {
  onFinish: (values: UserFilters) => void
  pagination: PaginationConfig
}) => {
  const { data: groupsData } = useGroupsQuery()
  const { data: streamsData, isLoading: isStreamsLoading } = useStreamsQuery()

  const [groupOptions, setGroupOptions] = useState<string[]>([])
  const [streamOptions, setStreamOptions] = useState<number[]>([])

  useEffect(() => {
    if (groupsData) {
      setGroupOptions(groupsData.map((group: { groupNumber: string }) => group.groupNumber))
    }
  }, [groupsData])

  useEffect(() => {
    if (streamsData) {
      setStreamOptions(streamsData.map((stream: { streamNumber: number }) => stream.streamNumber))
    }
  }, [streamsData])

  return (
    <Form
      layout='inline'
      onFinish={values => {
        onFinish({
          groupNumber: values.group,
          streamNumber: values.stream,
          firstName: values.firstName,
          lastName: values.lastName,
          middleName: values.middleName || '',
          // company: values.company,
          // role: values.role,
          pagination: pagination,
        })
      }}
      style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}
    >
      {/* Поток (только выбираемое поле из существующих вариантов) */}
      <Form.Item
        name='stream'
        style={{ width: 200 }}
      >
        <Select
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

      {/* Группа (поиск с подсказкой) */}
      <Form.Item
        name='group'
        style={{ width: 200 }}
      >
        <AutoComplete
          options={groupOptions.map(group => ({ value: group }))}
          placeholder='Группа'
          filterOption={(inputValue, option) => option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
        />
      </Form.Item>
      {/* Студент (поиск) */}
      <Form.Item
        name='firstName'
        style={{ width: 200 }}
      >
        <Input placeholder='Иван' />
      </Form.Item>
      <Form.Item
        name='lastName'
        style={{ width: 200 }}
      >
        <Input placeholder='Иванов' />
      </Form.Item>
      <Form.Item
        name='middleName'
        style={{ width: 200 }}
      >
        <Input placeholder='Иванович' />
      </Form.Item>

      {/* Компания (поиск) */}
      {/* <Form.Item
        name='company'
        style={{ width: 200 }}
      >
        <Input placeholder='Компания' />
      </Form.Item> */}

      {/* Роль (поиск) */}
      {/* <Form.Item
        name='role'
        style={{ width: 200 }}
      >
        <Input placeholder='Роль' />
      </Form.Item> */}

      {/* Кнопка Поиска */}
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

export default FiltersForm
