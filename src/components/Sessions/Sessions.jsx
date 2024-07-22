import React, { useEffect, useState } from 'react'
import DefaultLayout from '../../layout/DefaultLayout'
import axios from 'axios'
import SessionTable from './SessionTable'

function Sessions () {
  const [treatments, setTreatments] = useState([])

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/treatments`
      )
      const data = response.data
      console.log(data)
      setTreatments(data)
    } catch (error) {
      console.error('Error fetching data: ', error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div>
      <SessionTable treatments={treatments} fetchData={fetchData} />
    </div>
  )
}

export default Sessions
