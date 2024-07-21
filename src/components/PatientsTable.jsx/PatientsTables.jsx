import React, { useEffect, useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination
} from '@mui/material'
import { styled } from '@mui/system'
import PatientsTable from './PatientsTable'
import axios from 'axios'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: 'bold'
}))

const PatientsTables = () => {
  const [data, setData] = useState([])

  async function fetchData () {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/patients`
      )
      const data = response.data
      setData(data)
      console.log(data)
    } catch (error) {
      console.error(error)
    }
  }
  useEffect(() => {
    fetchData()
  }, [])

  const rowsPerPage = 1

  const pageCount = Math.ceil(data.length / rowsPerPage)

  const [page, setPage] = useState(0)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  return (
    <div>
      <h2>Patients Information</h2>
      {data
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((data, index) => (
          <PatientsTable
            key={index}
            data={data}
            fetchData={fetchData}
            page={page}
            setPage={setPage}
          />
        ))}
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

export default PatientsTables
