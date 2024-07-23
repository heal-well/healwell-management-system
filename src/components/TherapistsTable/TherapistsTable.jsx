import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Button,
  TextField
} from '@mui/material'
import { styled } from '@mui/system'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import SaveIcon from '@mui/icons-material/Save'
import axios from 'axios'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: 'bold'
}))

const TherapistsTable = ({ data, fetchData, page, setPage }) => {
  const [editMode, setEditMode] = useState(null)
  const [editedFields, setEditedFields] = useState({})

  const navigate = useNavigate()

  const handleCreate = () => {
    navigate('/therapists/create')
  }

  const handleEdit = id => {
    setEditMode(id)
    setEditedFields(data.find(item => item._id === id) || {})
  }

  const handleFieldChange = (field, value) => {
    setEditedFields({
      ...editedFields,
      [field]: value
    })
  }

  const handleSave = async id => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/therapists/${id}`,
        editedFields
      )
      console.log('Data saved: ', response.data)
      fetchData()
    } catch (error) {
      console.error('Error saving data: ', error)
    }
    // Set edit mode to null to exit editing mode
    setEditMode(null)
  }

  const handleDelete = async id => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/therapists/${id}`
      )
      console.log('Data deleted: ', response.data)
      setPage(page - 1)
      fetchData()
    } catch (error) {
      console.error('Error deleting data: ', error)
    }
  }

  // Filtered fields to display
  const filteredFields = [
    'name',
    'phone',
    'address',
    'hoursOfWork',
    'image',
    'workLocation',
    'yearsOfExperience',
    'specialization',
    'college',
    'languages'
  ]

  return (
    <>
      <div
        style={{ marginBottom: '16px', display: 'flex', justifyContent: 'end' }}
      >
        <Button
          variant='contained'
          color='primary'
          startIcon={<AddIcon />}
          onClick={handleCreate}
        >
          Create
        </Button>
      </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Phone</StyledTableCell>
              <StyledTableCell>Address</StyledTableCell>
              <StyledTableCell>Hours of Work</StyledTableCell>
              <StyledTableCell>Image</StyledTableCell>
              <StyledTableCell>Work Location</StyledTableCell>
              <StyledTableCell>Years of Experience</StyledTableCell>
              <StyledTableCell>Specialization</StyledTableCell>
              <StyledTableCell>College</StyledTableCell>
              <StyledTableCell>Languages</StyledTableCell>
              <StyledTableCell>Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map(row => (
              <TableRow key={row._id}>
                {filteredFields.map(field => (
                  <TableCell key={field}>
                    {editMode === row._id ? (
                      <TextField
                        value={editedFields[field] || ''}
                        onChange={e => handleFieldChange(field, e.target.value)}
                      />
                    ) : (
                      row[field]
                    )}
                  </TableCell>
                ))}
                <TableCell>
                  {editMode === row._id ? (
                    <IconButton
                      aria-label='save'
                      onClick={() => handleSave(row._id)}
                    >
                      <SaveIcon />
                    </IconButton>
                  ) : (
                    <>
                      <IconButton
                        aria-label='edit'
                        onClick={() => handleEdit(row._id)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        aria-label='delete'
                        onClick={() => handleDelete(row._id)}
                      >
                        <DeleteIcon />
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
