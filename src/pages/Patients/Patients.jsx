import React from 'react'
import DefaultLayout from '../../layout/DefaultLayout'
import PatientsTables from '../../components/PatientsTable.jsx/PatientsTables'
function Patients () {
  return (
    <DefaultLayout>
      <PatientsTables />
    </DefaultLayout>
  )
}

export default Patients
