import React from 'react'
import { Select, Input, AutoComplete } from 'antd'

const { Option } = Select

const FilterButtons: React.FC = () => {
  const groupOptions = ['Group A', 'Group B', 'Group C']
  // const studentOptions = ['Student 1', 'Student 2', 'Student 3']
  // const companyOptions = ['Company X', 'Company Y', 'Company Z']
  // const roleOptions = ['Role 1', 'Role 2', 'Role 3']

  return (
    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
      {/* Поток (только выбираемое поле из существующих вариантов) */}
      <Select
        placeholder='Поток'
        style={{ width: 200 }}
      >
        <Option value='stream1'>Stream 1</Option>
        <Option value='stream2'>Stream 2</Option>
        <Option value='stream3'>Stream 3</Option>
      </Select>

      {/* Студент (поиск) */}
      <Input
        placeholder='Студент'
        style={{ width: 200 }}
      />

      {/* Группа (поиск с подсказкой) */}
      <AutoComplete
        style={{ width: 200 }}
        options={groupOptions.map(group => ({ value: group }))}
        placeholder='Группа'
        filterOption={(inputValue, option) => option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
      />

      {/* Компания (поиск) */}
      <Input
        placeholder='Компания'
        style={{ width: 200 }}
      />

      {/* Роль (поиск) */}
      <Input
        placeholder='Роль'
        style={{ width: 200 }}
      />
    </div>
  )
}

export default FilterButtons
