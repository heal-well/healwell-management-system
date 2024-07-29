import React, { useEffect, useState } from 'react'
import { TablePagination } from '@mui/material'
import TherapistsTable from './TherapistsTable'
import axios from 'axios'

const TherapistsTables = () => {
  const [data, setData] = useState([])

  async function fetchData () {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/therapists`
      )
      const data = response.data
      setData(Array.isArray(data) ? data : [])
      console.log(data)
    } catch (error) {
      console.error(error)
      setData([]) // Ensure data is set to an empty array in case of error
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const rowsPerPage = 1

  const [page, setPage] = useState(0)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const currentPageData = data.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  )

  return (
    <div>
      <h2>Physiotherapists Information</h2>
      {currentPageData.length > 0 ? (
        <TherapistsTable
          data={currentPageData[0]} // Pass the single therapist for the current page
          fetchData={fetchData}
          page={page}
          setPage={setPage}
        />
      ) : (
        <p>No data available</p>
      )}
      <TablePagination
        component='div'
        count={data.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[rowsPerPage]}
      />
    </div>
  )
}

export default TherapistsTables
