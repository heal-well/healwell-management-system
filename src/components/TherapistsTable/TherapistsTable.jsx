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
  TextField
} from '@mui/material'
import { Edit, Delete, Add, Save } from '@mui/icons-material'
import axios from 'axios'

const TherapistsTable = ({ fetchData }) => {
  const navigate = useNavigate()

  const [editMode, setEditMode] = useState(null)
  const [editedFields, setEditedFields] = useState({})
  const [therapists, setTherapists] = useState([])
  const [sortOrder, setSortOrder] = useState('desc')

  useEffect(() => {
    fetchTherapists()
  }, [])

  const fetchTherapists = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/therapists`
      )
      setTherapists(response.data)
    } catch (error) {
      console.error('Error fetching therapists: ', error)
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
    setEditedFields({ ...editedFields, [index]: { ...therapists[index] } })
  }

  const handleSave = async (therapist, index) => {
    try {
      const therapistId = therapist._id
      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/therapists/${therapistId}`,
        editedFields[index]
      )
      setEditMode(null)
      setEditedFields({})
      fetchTherapists()
    } catch (error) {
      console.error('Error saving data: ', error)
    }
  }

  const handleDelete = async therapist => {
    try {
      const therapistId = therapist._id
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/therapists/${therapistId}`
      )
      fetchTherapists()
    } catch (error) {
      console.error('Error deleting therapist: ', error)
    }
  }

  const handleCreate = () => {
    navigate('/therapists/create')
  }

  const handleSort = () => {
    const sortedData = [...therapists].sort((a, b) => {
      if (sortOrder === 'desc') {
        return b.hoursOfWork - a.hoursOfWork
      } else {
        return a.hoursOfWork - b.hoursOfWork
      }
    })
    setTherapists(sortedData)
    setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')
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
        <Button
          sx={{ width: 120, height: 40, marginLeft: 2 }}
          variant='contained'
          color='primary'
          onClick={handleSort}
        >
          Sort
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>First name</TableCell>
              <TableCell>Last name</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Hours of Work</TableCell>
              <TableCell>Work Location</TableCell>
              <TableCell>Time Slot</TableCell>
              <TableCell>Years of Experience</TableCell>
              <TableCell>College</TableCell>
              <TableCell>Specialization</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {therapists.map((therapist, index) => (
              <TableRow key={therapist._id}>
                <TableCell>{therapist.therapistId}</TableCell>
                <TableCell>
                  {editMode === index ? (
                    <TextField
                      name='firstName'
                      value={
                        editedFields[index]?.firstName || therapist.firstName
                      }
                      onChange={e => handleChange(e, index)}
                    />
                  ) : (
                    therapist.firstName
                  )}
                </TableCell>
                <TableCell>
                  {editMode === index ? (
                    <TextField
                      name='lastName'
                      value={
                        editedFields[index]?.lastName || therapist.lastName
                      }
                      onChange={e => handleChange(e, index)}
                    />
                  ) : (
                    therapist.lastName
                  )}
                </TableCell>
                <TableCell>
                  {editMode === index ? (
                    <TextField
                      type='number'
                      name='phone'
                      value={editedFields[index]?.phone || therapist.phone}
                      onChange={e => handleChange(e, index)}
                    />
                  ) : (
                    therapist.phone
                  )}
                </TableCell>
                <TableCell>
                  {editMode === index ? (
                    <TextField
                      name='address'
                      value={editedFields[index]?.address || therapist.address}
                      onChange={e => handleChange(e, index)}
                    />
                  ) : (
                    therapist.address
                  )}
                </TableCell>
                <TableCell>
                  {editMode === index ? (
                    <TextField
                      name='hoursOfWork'
                      value={
                        editedFields[index]?.hoursOfWork ||
                        therapist.hoursOfWork
                      }
                      onChange={e => handleChange(e, index)}
                    />
                  ) : (
                    therapist.hoursOfWork
                  )}
                </TableCell>
                <TableCell>
                  {editMode === index ? (
                    <TextField
                      name='workLocation'
                      value={
                        editedFields[index]?.workLocation ||
                        therapist.workLocation
                      }
                      onChange={e => handleChange(e, index)}
                    />
                  ) : (
                    therapist.workLocation
                  )}
                </TableCell>
                <TableCell>
                  {editMode === index ? (
                    <TextField
                      name='timeSlot'
                      value={
                        editedFields[index]?.timeSlot || therapist.timeSlot
                      }
                      onChange={e => handleChange(e, index)}
                    />
                  ) : (
                    therapist.timeSlot
                  )}
                </TableCell>
                <TableCell>
                  {editMode === index ? (
                    <TextField
                      type='number'
                      name='yearsOfExperience'
                      value={
                        editedFields[index]?.yearsOfExperience ||
                        therapist.yearsOfExperience
                      }
                      onChange={e => handleChange(e, index)}
                    />
                  ) : (
                    therapist.yearsOfExperience
                  )}
                </TableCell>
                <TableCell>
                  {editMode === index ? (
                    <TextField
                      name='college'
                      value={editedFields[index]?.college || therapist.college}
                      onChange={e => handleChange(e, index)}
                    />
                  ) : (
                    therapist.college
                  )}
                </TableCell>
                <TableCell>
                  {editMode === index ? (
                    <TextField
                      name='specialization'
                      value={
                        editedFields[index]?.specialization ||
                        therapist.specialization
                      }
                      onChange={e => handleChange(e, index)}
                    />
                  ) : (
                    therapist.specialization || 'N/A'
                  )}
                </TableCell>
                <TableCell>
                  {editMode === index ? (
                    <IconButton
                      aria-label='save'
                      onClick={() => handleSave(therapist, index)}
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
                        onClick={() => handleDelete(therapist)}
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

export default TherapistsTable
