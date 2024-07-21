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
import axios from 'axios'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: 'bold'
}))

const PatientsTable = ({ data, fetchData, page, setPage }) => {
  const [editMode, setEditMode] = useState(false)
  const [editedFields, setEditedFields] = useState({ ...data })

  const navigate = useNavigate()

  const handleCreate = () => {
    navigate('/patients/create')
  }

  const handleEdit = () => {
    setEditMode(!editMode)
  }

  const handleFieldChange = (field, value) => {
    setEditedFields({
      ...editedFields,
      [field]: value
    })
  }

  const handleSave = async () => {
    try {
      const userId = data._id
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/therapists/${userId}`,
        editedFields
      )
      console.log('Data saved: ', response.data)
      fetchData()
    } catch (error) {
      console.error('Error saving data: ', error)
    }
    // Set edit mode to false to exit editing mode
    setEditMode(false)
  }

  const handleDelete = async () => {
    const userId = data._id
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/therapists/${userId}`
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
    'age',
    'address',
    'sex',
    'painArea',
    'dateOfInjury',
    'surgeries',
    'electricalModalities'
  ]

  // Helper function to format date fields
  const formatDate = dateString => {
    const date = new Date(dateString)
    return date.toLocaleDateString()
  }

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
        <Button
          variant='contained'
          color='primary'
          startIcon={<EditIcon />}
          onClick={handleEdit}
          style={{ marginLeft: '8px' }}
        >
          {editMode ? 'Cancel' : 'Edit'}
        </Button>
        {editMode && (
          <Button
            variant='contained'
            color='primary'
            startIcon={<EditIcon />}
            onClick={handleSave}
            style={{ marginLeft: '8px' }}
          >
            Save
          </Button>
        )}
        <Button
          variant='contained'
          color='secondary'
          startIcon={<DeleteIcon />}
          onClick={handleDelete}
          style={{ marginLeft: '8px' }}
        >
          Delete
        </Button>
      </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>Field Name</StyledTableCell>
              <StyledTableCell>Value</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.entries(data).map(
              ([fieldName, value], index) =>
                // Check if the field is in the filteredFields array
                filteredFields.includes(fieldName) && (
                  <TableRow key={index}>
                    <StyledTableCell>{fieldName}</StyledTableCell>
                    <TableCell>
                      {editMode ? (
                        <TextField
                          value={editedFields[fieldName]}
                          onChange={e =>
                            handleFieldChange(fieldName, e.target.value)
                          }
                        />
                      ) : fieldName === 'dateOfInjury' ? (
                        formatDate(value)
                      ) : (
                        value
                      )}
                    </TableCell>
                  </TableRow>
                )
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default PatientsTable
