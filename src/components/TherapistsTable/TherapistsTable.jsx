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

  const handleEdit = therapist => {
    navigate(`/therapists/edit/${therapist._id}`, { state: { therapist } })
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
            {therapists.map(therapist => (
              <TableRow key={therapist._id}>
                <TableCell>{therapist.therapistId}</TableCell>
                <TableCell>{therapist.firstName}</TableCell>
                <TableCell>{therapist.lastName}</TableCell>
                <TableCell>{therapist.phone}</TableCell>
                <TableCell>{therapist.address}</TableCell>
                <TableCell>{therapist.hoursOfWork}</TableCell>
                <TableCell>{therapist.workLocation}</TableCell>
                <TableCell>{therapist.timeSlot}</TableCell>
                <TableCell>{therapist.yearsOfExperience}</TableCell>
                <TableCell>{therapist.college}</TableCell>
                <TableCell>{therapist.specialization || 'N/A'}</TableCell>
                <TableCell>
                  <IconButton
                    aria-label='edit'
                    onClick={() => handleEdit(therapist)}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    aria-label='delete'
                    onClick={() => handleDelete(therapist)}
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

export default TherapistsTable
