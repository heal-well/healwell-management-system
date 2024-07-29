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
  Box,
  TextField,
  MenuItem,
  Select
} from '@mui/material'
import { Edit, Delete, Add, Save } from '@mui/icons-material'
import axios from 'axios'

const PatientsTable = ({ fetchData }) => {
  const navigate = useNavigate()

  const [editMode, setEditMode] = useState(null)
  const [editedFields, setEditedFields] = useState({})
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

  const handleChange = (e, index) => {
    const { name, value } = e.target
    setEditedFields(prevFields => ({
      ...prevFields,
      [index]: {
        ...prevFields[index],
        [name]: value
      }
    }))
  }

  const handleEdit = index => {
    setEditMode(index)
    setEditedFields({ ...editedFields, [index]: { ...patients[index] } })
  }

  const handleSave = async (patient, index) => {
    try {
      const patientId = patient._id
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/patients/${patientId}`,
        editedFields[index]
      )
      console.log('Data saved: ', response.data)
      setEditMode(null)
      setEditedFields({})
      fetchPatients()
    } catch (error) {
      console.error('Error saving data: ', error)
    }
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
              <TableCell>Name</TableCell>
              <TableCell>Age</TableCell>
              <TableCell>Sex</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Pain Area</TableCell>
              <TableCell>Surgeries</TableCell>
              <TableCell>Date of Injury</TableCell>
              <TableCell>Electrical Modalities</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {patients.map((patient, index) => (
              <TableRow key={index}>
                <TableCell>
                  {editMode === index ? (
                    <TextField
                      name='name'
                      value={editedFields[index]?.name || patient.name}
                      onChange={e => handleChange(e, index)}
                    />
                  ) : (
                    patient.name
                  )}
                </TableCell>
                <TableCell>
                  {editMode === index ? (
                    <TextField
                      type='number'
                      name='age'
                      value={editedFields[index]?.age || patient.age}
                      onChange={e => handleChange(e, index)}
                    />
                  ) : (
                    patient.age
                  )}
                </TableCell>
                <TableCell>
                  {editMode === index ? (
                    <Select
                      name='sex'
                      value={editedFields[index]?.sex || patient.sex}
                      onChange={e => handleChange(e, index)}
                    >
                      <MenuItem value='Male'>Male</MenuItem>
                      <MenuItem value='Female'>Female</MenuItem>
                    </Select>
                  ) : (
                    patient.sex
                  )}
                </TableCell>
                <TableCell>
                  {editMode === index ? (
                    <TextField
                      type='number'
                      name='phone'
                      value={editedFields[index]?.phone || patient.phone}
                      onChange={e => handleChange(e, index)}
                    />
                  ) : (
                    patient.phone
                  )}
                </TableCell>
                <TableCell>
                  {editMode === index ? (
                    <TextField
                      name='address'
                      value={editedFields[index]?.address || patient.address}
                      onChange={e => handleChange(e, index)}
                    />
                  ) : (
                    patient.address
                  )}
                </TableCell>
                <TableCell>
                  {editMode === index ? (
                    <TextField
                      name='painArea'
                      value={editedFields[index]?.painArea || patient.painArea}
                      onChange={e => handleChange(e, index)}
                    />
                  ) : (
                    patient.painArea
                  )}
                </TableCell>
                <TableCell>
                  {editMode === index ? (
                    <TextField
                      name='surgeries'
                      value={
                        editedFields[index]?.surgeries || patient.surgeries
                      }
                      onChange={e => handleChange(e, index)}
                    />
                  ) : (
                    patient.surgeries
                  )}
                </TableCell>
                <TableCell>
                  {editMode === index ? (
                    <TextField
                      type='date'
                      name='dateOfInjury'
                      value={
                        editedFields[index]?.dateOfInjury
                          ? new Date(editedFields[index].dateOfInjury)
                              .toISOString()
                              .split('T')[0]
                          : new Date(patient.dateOfInjury)
                              .toISOString()
                              .split('T')[0]
                      }
                      onChange={e => handleChange(e, index)}
                    />
                  ) : (
                    new Date(patient.dateOfInjury).toLocaleDateString()
                  )}
                </TableCell>
                <TableCell>
                  {editMode === index ? (
                    <TextField
                      name='electricalModalities'
                      value={
                        editedFields[index]?.electricalModalities ||
                        patient.electricalModalities
                      }
                      onChange={e => handleChange(e, index)}
                    />
                  ) : (
                    patient.electricalModalities
                  )}
                </TableCell>
                <TableCell>
                  {editMode === index ? (
                    <IconButton
                      aria-label='save'
                      onClick={() => handleSave(patient, index)}
                    >
                      <Save />
                    </IconButton>
                  ) : (
                    <>
                      <IconButton
                        aria-label='edit'
                        onClick={() => handleEdit(index)}
                      >
                        <Edit />
                      </IconButton>
                      <IconButton
                        aria-label='delete'
                        onClick={() => handleDelete(patient)}
                      >
                        <Delete />
                      </IconButton>
                    </>
                  )}
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
