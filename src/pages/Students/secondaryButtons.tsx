import React from 'react'
import AddStudentManuallyForm from 'features/students/AddStudentsManuallyForm'
import ImportCSVStudentsForm from 'features/students/ImportCSVStudentsForm'

const SecondaryButtons: React.FC = () => {
  return (
    <div style={{ marginTop: '10px' }}>
      <AddStudentManuallyForm />
      <ImportCSVStudentsForm />
    </div>
  )
}

export default SecondaryButtons
