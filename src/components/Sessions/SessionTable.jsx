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
  Select,
  Container
} from '@mui/material'
import { Edit, Delete, Add, Save, AddCircle } from '@mui/icons-material'
import axios from 'axios'

const SessionTable = ({ treatments, fetchData }) => {
  const navigate = useNavigate()
  const [editMode, setEditMode] = useState(null)
  const [editedFields, setEditedFields] = useState({})
  const [therapists, setTherapists] = useState([])
  const [patients, setPatients] = useState([])

  useEffect(() => {
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

    fetchTherapists()
    fetchPatients()
  }, [])

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
  }

  const handleCreate = () => {
    navigate('/treatments/create')
  }

  const handleIncrementDaysAttended = async (treatment, index) => {
    try {
      const treatmentId = treatment._id
      const therapistId = treatment.therapistId?._id

      const updatedTreatment = {
        ...treatment,
        daysAttended: (treatment.daysAttended || 0) + 1
      }

      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/treatments/${treatmentId}`,
        updatedTreatment
      )

      if (therapistId) {
        const therapistResponse = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/therapists/${therapistId}`
        )
        const therapist = therapistResponse.data

        const updatedHours = {
          hoursOfWork: (therapist.hoursOfWork || 0) + 1
        }

        await axios.put(
          `${import.meta.env.VITE_API_URL}/api/therapists/${therapistId}`,
          updatedHours
        )
      }

      fetchData()
    } catch (error) {
      console.error('Error incrementing days attended: ', error)
    }
  }
  const handleIncrementWeeksAttended = async (treatment, index) => {
    try {
      const treatmentId = treatment._id
      const therapistId = treatment.therapistId?._id

      const updatedTreatment = {
        ...treatment,
        weeksAttended: (treatment.weeksAttended || 0) + 1
      }

      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/treatments/${treatmentId}`,
        updatedTreatment
      )

      if (therapistId) {
        const therapistResponse = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/therapists/${therapistId}`
        )
      }

      fetchData()
    } catch (error) {
      console.error('Error incrementing days attended: ', error)
    }
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
              <TableCell>Patient Name</TableCell>
              <TableCell>Therapist Name</TableCell>
              <TableCell>Treatment Date</TableCell>
              <TableCell>Treatment Type</TableCell>
              <TableCell>Days Attended</TableCell>
              <TableCell>Weeks Attended</TableCell>
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
                    <Select
                      name='patientId'
                      value={
                        editedFields[index]?.patientId ||
                        treatment.patientId._id
                      }
                      onChange={e => handleChange(e, index)}
                    >
                      {patients.map(patient => (
                        <MenuItem key={patient._id} value={patient._id}>
                          {patient.name}
                        </MenuItem>
                      ))}
                    </Select>
                  ) : (
                    treatment.patientId?.name
                  )}
                </TableCell>
                <TableCell>
                  {editMode === index ? (
                    <Select
                      name='therapistId'
                      value={
                        editedFields[index]?.therapistId ||
                        treatment?.therapistId?._id
                      }
                      onChange={e => handleChange(e, index)}
                    >
                      {therapists.map(therapist => (
                        <MenuItem key={therapist._id} value={therapist._id}>
                          {therapist?.firstName} {therapist?.lastName}{' '}
                          {therapist?.therapistId}
                        </MenuItem>
                      ))}
                    </Select>
                  ) : (
                    `${treatment?.therapistId?.firstName} ${treatment?.therapistId?.lastName} ${treatment?.therapistId?.therapistId}`
                  )}
                </TableCell>
                <TableCell>
                  {editMode === index ? (
                    <TextField
                      type='date'
                      name='treatmentDate'
                      value={
                        editedFields[index]?.treatmentDate
                          ? new Date(editedFields[index].treatmentDate)
                              .toISOString()
                              .split('T')[0]
                          : new Date(treatment.treatmentDate)
                              .toISOString()
                              .split('T')[0]
                      }
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
                      value={
                        editedFields[index]?.treatmentType ||
                        treatment.treatmentType
                      }
                      onChange={e => handleChange(e, index)}
                    />
                  ) : (
                    treatment.treatmentType
                  )}
                </TableCell>
                <TableCell>
                  {editMode === index ? (
                    <>
                      <TextField
                        type='number'
                        name='daysAttended'
                        value={
                          editedFields[index]?.daysAttended ||
                          treatment.daysAttended
                        }
                        onChange={e => handleChange(e, index)}
                      />
                    </>
                  ) : (
                    <>
                      {treatment.daysAttended}
                      <IconButton
                        onClick={() =>
                          handleIncrementDaysAttended(treatment, index)
                        }
                      >
                        <AddCircle />
                      </IconButton>
                    </>
                  )}
                </TableCell>
                <TableCell>
                  {editMode === index ? (
                    <>
                      <TextField
                        type='number'
                        name='weeksAttended'
                        value={
                          editedFields[index]?.weeksAttended ||
                          treatment.weeksAttended
                        }
                        onChange={e => handleChange(e, index)}
                      />
                    </>
                  ) : (
                    <>
                      {treatment.weeksAttended}
                      <IconButton
                        onClick={() =>
                          handleIncrementWeeksAttended(treatment, index)
                        }
                      >
                        <AddCircle />
                      </IconButton>
                    </>
                  )}
                </TableCell>
                <TableCell>
                  {editMode === index ? (
                    <TextField
                      type='number'
                      name='daysSubstituted'
                      value={
                        editedFields[index]?.daysSubstituted ||
                        treatment.daysSubstituted
                      }
                      onChange={e => handleChange(e, index)}
                    />
                  ) : (
                    treatment.daysSubstituted
                  )}
                </TableCell>
                <TableCell>
                  {editMode === index ? (
                    <Select
                      name='substitutedBy'
                      value={
                        editedFields[index]?.substitutedBy ||
                        treatment.substitutedBy?._id ||
                        ''
                      }
                      onChange={e => handleChange(e, index)}
                    >
                      <MenuItem value=''>
                        <em>None</em>
                      </MenuItem>
                      {therapists.map(therapist => (
                        <MenuItem key={therapist._id} value={therapist._id}>
                          {therapist.firstName} {therapist.lastName} (
                          {therapist.therapistId})
                        </MenuItem>
                      ))}
                    </Select>
                  ) : treatment.substitutedBy ? (
                    `${treatment.substitutedBy.firstName} ${treatment.substitutedBy.lastName} (${treatment.substitutedBy.therapistId})`
                  ) : (
                    'N/A'
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
