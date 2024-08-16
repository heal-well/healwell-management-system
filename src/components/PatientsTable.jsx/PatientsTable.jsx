import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  IconButton,
  Box
} from '@mui/material'
import { Edit, Delete, Add } from '@mui/icons-material'
import axios from 'axios'

const PatientsTable = () => {
  const navigate = useNavigate()

  const [patients, setPatients] = useState([])

  useEffect(() => {
    fetchPatients()
  }, [])

  const fetchPatients = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/patients`
      )
      setPatients(response.data)
    } catch (error) {
      console.error('Error fetching patients: ', error)
    }
  }

  const handleEdit = patient => {
    navigate(`/patients/edit/${patient._id}`, { state: { patient } })
  }

  const handleDelete = async patient => {
    try {
      const patientId = patient._id
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/patients/${patientId}`
      )
      console.log('Patient deleted:', patient)
      fetchPatients()
    } catch (error) {
      console.error('Error deleting patient: ', error)
    }
  }

  const handleCreate = () => {
    navigate('/patients/create')
  }

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          marginBottom: 2
        }}
      >
        <Button
          sx={{ width: 120 }}
          variant='contained'
          color='primary'
          startIcon={<Add />}
          onClick={handleCreate}
        >
          Create
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Patient ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Age</TableCell>
              <TableCell>Sex</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Pain Area</TableCell>
              <TableCell>Surgeries</TableCell>
              <TableCell>Date of Injury</TableCell>
              <TableCell>Pacemaker</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {patients.map((patient, index) => (
              <TableRow key={index}>
                <TableCell>{patient.patientId}</TableCell>
                <TableCell>{patient.name}</TableCell>
                <TableCell>{patient.age}</TableCell>
                <TableCell>{patient.sex}</TableCell>
                <TableCell>{patient.phone}</TableCell>
                <TableCell>{patient.address}</TableCell>
                <TableCell>{patient.painArea}</TableCell>
                <TableCell>{patient.surgeries}</TableCell>
                <TableCell>
                  {new Date(patient.dateOfInjury).toLocaleDateString()}
                </TableCell>
                <TableCell>{patient.isPacemaker ? 'Yes' : 'No'}</TableCell>
                <TableCell>
                  <IconButton
                    aria-label='edit'
                    onClick={() => handleEdit(patient)}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    aria-label='delete'
                    onClick={() => handleDelete(patient)}
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default PatientsTable
