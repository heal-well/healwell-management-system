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
const SessionTable = ({ treatments, fetchData }) => {
  const navigate = useNavigate()
  const [editMode, setEditMode] = useState(null)
  const [editedFields, setEditedFields] = useState({})

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
    setEditedFields({ ...editedFields, [index]: { ...treatments[index] } })
  }

  const handleSave = async (treatment, index) => {
    try {
      const treatmentId = treatment._id
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/treatments/${treatmentId}`,
        editedFields[index]
      )
      console.log('Data saved: ', response.data)
      setEditMode(null)
      setEditedFields({})
      fetchData()
    } catch (error) {
      console.error('Error saving data: ', error)
    }
  }

  const handleDelete = async treatment => {
    try {
      const treatmentId = treatment._id
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/treatments/${treatmentId}`
      )
      console.log('Treatment deleted:', treatment)
      fetchData()
    } catch (error) {
      console.error('Error deleting treatment: ', error)
    }
    App
  }

  const handleCreate = () => {
    navigate('/admin/treatments/create')
  }

  useEffect(() => {}, [treatments])

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
              <TableCell>Patient Name</TableCell>
              <TableCell>Therapist Name</TableCell>
              <TableCell>Treatment Date</TableCell>
              <TableCell>Treatment Type</TableCell>
              <TableCell>Days Attended</TableCell>
              <TableCell>Days Substituted</TableCell>
              <TableCell>Substituted By</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {treatments.map((treatment, index) => (
              <TableRow key={index}>
                <TableCell>
                  {editMode === index ? (
                    <TextField
                      type='text'
                      name='patientName'
                      value={editedFields[index]?.patientName || ''}
                      onChange={e => handleChange(e, index)}
                    />
                  ) : (
                    treatment.patientName
                  )}
                </TableCell>
                <TableCell>
                  {editMode === index ? (
                    <TextField
                      type='text'
                      name='therapistName'
                      value={editedFields[index]?.therapistName || ''}
                      onChange={e => handleChange(e, index)}
                    />
                  ) : (
                    treatment.therapistName
                  )}
                </TableCell>
                <TableCell>
                  {editMode === index ? (
                    <TextField
                      type='date'
                      name='treatmentDate'
                      value={editedFields[index]?.treatmentDate || ''}
                      onChange={e => handleChange(e, index)}
                    />
                  ) : (
                    new Date(treatment.treatmentDate).toLocaleDateString()
                  )}
                </TableCell>
                <TableCell>
                  {editMode === index ? (
                    <TextField
                      type='text'
                      name='treatmentType'
                      value={editedFields[index]?.treatmentType || ''}
                      onChange={e => handleChange(e, index)}
                    />
                  ) : (
                    treatment.treatmentType
                  )}
                </TableCell>
                <TableCell>
                  {editMode === index ? (
                    <TextField
                      type='number'
                      name='daysAttended'
                      value={editedFields[index]?.daysAttended || ''}
                      onChange={e => handleChange(e, index)}
                    />
                  ) : (
                    treatment.daysAttended
                  )}
                </TableCell>
                <TableCell>
                  {editMode === index ? (
                    <TextField
                      type='number'
                      name='daysSubstituted'
                      value={editedFields[index]?.daysSubstituted || ''}
                      onChange={e => handleChange(e, index)}
                    />
                  ) : (
                    treatment.daysSubstituted
                  )}
                </TableCell>
                <TableCell>
                  {editMode === index ? (
                    <TextField
                      type='text'
                      name='substitutedBy'
                      value={editedFields[index]?.substitutedBy || ''}
                      onChange={e => handleChange(e, index)}
                    />
                  ) : (
                    treatment.substitutedBy
                  )}
                </TableCell>
                <TableCell>
                  {editMode === index ? (
                    <IconButton
                      aria-label='save'
                      onClick={() => handleSave(treatment, index)}
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
                        onClick={() => handleDelete(treatment)}
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

export default SessionTable
