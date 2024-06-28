import { Form, Select, Input, AutoComplete, Button } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { UserFilters } from 'shared/entities'
import { PaginationConfig } from 'antd/es/pagination'

const { Option } = Select

const FiltersForm = ({
  onFinish,
  pagination,
}: {
  onFinish: (values: UserFilters) => void
  pagination: PaginationConfig
}) => {
  const groupOptions = ['Group A', 'Group B', 'Group C']

  return (
    <Form
      layout='inline'
      onFinish={values => {
        onFinish({
          groupNumber: values.group,
          streamNumber: values.stream,
          firstName: values.firstName,
          lastName: values.lastName,
          middleName: '',
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
        <Select placeholder='Поток'>
          <Option value='stream1'>Stream 1</Option>
          <Option value='stream2'>Stream 2</Option>
          <Option value='stream3'>Stream 3</Option>
        </Select>
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

      {/* Компания (поиск) */}
      <Form.Item
        name='company'
        style={{ width: 200 }}
      >
        <Input placeholder='Компания' />
      </Form.Item>

      {/* Роль (поиск) */}
      <Form.Item
        name='role'
        style={{ width: 200 }}
      >
        <Input placeholder='Роль' />
      </Form.Item>

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
