import React from 'react'
import DefaultLayout from '../../layout/DefaultLayout'
import TherapistsTables from '../../components/TherapistsTable/TherapistsTables'
const AdminDashboard = () => {
  return (
    <DefaultLayout>
      <div className='col-span-12 xl:col-span-8'>
        <TherapistsTables />
      </div>
    </DefaultLayout>
  )
}

export default AdminDashboard
