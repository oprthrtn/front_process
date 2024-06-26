import React from 'react'
import { List, ListItem, ListItemText } from '@mui/material'

interface SidebarProps {
  selectedYear: string
  onSelectYear: (year: string) => void
}

const years = ['2021-2022 (9720P)', '2021-2022 (9720P)', '2021-2022 (9720P)', '2021-2022 (9720P)']

const GroupSideBar: React.FC<SidebarProps> = ({ selectedYear, onSelectYear }) => {
  return (
    <List>
      {years.map((year, index) => (
        <ListItem
          key={index}
          button
          selected={year === selectedYear}
          onClick={() => onSelectYear(year)}
          sx={{ color: year === selectedYear ? 'blue' : 'black' }}
        >
          <ListItemText primary={year} />
        </ListItem>
      ))}
    </List>
  )
}

export default GroupSideBar
