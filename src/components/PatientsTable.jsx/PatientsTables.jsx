import React, { useEffect, useState } from 'react'
import axios from 'axios'
import PatientsTable from './PatientsTable'
function PatientsTables () {
  const [patients, setPatients] = useState([])

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/patients`
      )
      const data = response.data
      console.log(data)
      setPatients(data)
    } catch (error) {
      console.error('Error fetching data: ', error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div>
      <PatientsTable patients={patients} fetchData={fetchData} />
    </div>
  )
}

export default PatientsTables
