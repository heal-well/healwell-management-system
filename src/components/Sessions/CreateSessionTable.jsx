import React, { useEffect, useState } from 'react'
import {
  Button,
  TextField,
  Box,
  Typography,
  Paper,
  Grid,
  IconButton,
  MenuItem,
  Select,
  FormControl,
  InputLabel
} from '@mui/material'
import { useForm, Controller } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import CloseIcon from '@mui/icons-material/Close'
import DefaultLayout from '../../layout/DefaultLayout'
import axios from 'axios'

const CreateSessionTable = () => {
  const navigate = useNavigate()
  const [patients, setPatients] = useState([])
  const [therapists, setTherapists] = useState([])

  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm()

  useEffect(() => {
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

    fetchPatients()
    fetchTherapists()
  }, [])

  const onSubmit = async data => {
    if (data.substitutedBy === 'none') {
      data.substitutedBy = null
    }
    console.log('formData: ', data)
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/treatments`,
        data
      )
      console.log('response: ', response)
      if (response) {
        navigate('/treatments')
      }
    } catch (error) {
      console.error('Error creating data: ', error)
    }
  }

  return (
    <DefaultLayout>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh'
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: '30px',
            width: '100%',
            maxWidth: '900px',
            borderRadius: '10px'
          }}
        >
          <div className='flex justify-between items-center'>
            <Typography variant='h5' gutterBottom>
              Create Treatment
            </Typography>
            <IconButton
              onClick={() => navigate('/treatments')}
              aria-label='Close'
            >
              <CloseIcon />
            </IconButton>
          </div>
          <Box
            className='my-2 mx-2 py-2 px-1'
            component='form'
            onSubmit={handleSubmit(onSubmit)}
            sx={{
              '& .MuiTextField-root': { marginBottom: '20px' }
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id='patientId-label'>Patient ID</InputLabel>
                  <Controller
                    name='patientId'
                    control={control}
                    defaultValue=''
                    rules={{ required: 'Patient ID is required' }}
                    render={({ field }) => (
                      <Select
                        labelId='patientId-label'
                        label='Patient ID'
                        {...field}
                        error={!!errors.patientId}
                      >
                        {patients.map(patient => (
                          <MenuItem key={patient._id} value={patient._id}>
                            {patient.name}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  />
                  {errors.patientId && (
                    <Typography color='error'>
                      {errors.patientId.message}
                    </Typography>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id='therapistId-label'>Therapist ID</InputLabel>
                  <Controller
                    name='therapistId'
                    control={control}
                    defaultValue=''
                    rules={{ required: 'Therapist ID is required' }}
                    render={({ field }) => (
                      <Select
                        labelId='therapistId-label'
                        label='Therapist ID'
                        {...field}
                        error={!!errors.therapistId}
                      >
                        {therapists.map(therapist => (
                          <MenuItem key={therapist._id} value={therapist._id}>
                            {therapist.firstName} {therapist.lastName}(
                            {therapist.therapistId})
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  />
                  {errors.therapistId && (
                    <Typography color='error'>
                      {errors.therapistId.message}
                    </Typography>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  {...register('treatmentDate', { required: true })}
                  label='Treatment Date'
                  type='date'
                  variant='outlined'
                  fullWidth
                  InputLabelProps={{
                    shrink: true
                  }}
                  error={!!errors.treatmentDate}
                  helperText={
                    errors.treatmentDate ? 'Treatment Date is required' : ''
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  {...register('treatmentType', { required: true })}
                  label='Treatment Type'
                  variant='outlined'
                  fullWidth
                  error={!!errors.treatmentType}
                  helperText={
                    errors.treatmentType ? 'Treatment Type is required' : ''
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  {...register('daysAttended', { required: true })}
                  label='Days Attended'
                  variant='outlined'
                  fullWidth
                  error={!!errors.daysAttended}
                  helperText={
                    errors.daysAttended ? 'Days Attended is required' : ''
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  {...register('daysSubstituted', { required: true })}
                  label='Days Substituted'
                  variant='outlined'
                  fullWidth
                  error={!!errors.daysSubstituted}
                  helperText={
                    errors.daysSubstituted ? 'Days Substituted is required' : ''
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id='substitutedBy-label'>
                    Substituted By
                  </InputLabel>
                  <Controller
                    name='substitutedBy'
                    control={control}
                    defaultValue='none'
                    rules={{ required: false }}
                    render={({ field }) => (
                      <Select
                        labelId='substitutedBy-label'
                        label='Substituted By'
                        {...field}
                        error={!!errors.substitutedBy}
                      >
                        <MenuItem value='none'>None</MenuItem>
                        {therapists.map(therapist => (
                          <MenuItem key={therapist._id} value={therapist._id}>
                            {therapist?.firstName} {therapist?.lastName} (
                            {therapist?.therapistId})
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  />
                  {errors.substitutedBy && (
                    <Typography color='error'>
                      {errors.substitutedBy.message}
                    </Typography>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id='treatmentStatus-label'>Status</InputLabel>
                  <Controller
                    name='treatmentStatus'
                    control={control}
                    defaultValue=''
                    rules={{ required: 'Treatment Status is required' }}
                    render={({ field }) => (
                      <Select
                        labelId='treatmentStatus-label'
                        label='Status'
                        {...field}
                        error={!!errors.treatmentStatus}
                      >
                        <MenuItem value='Completed'>Completed</MenuItem>
                        <MenuItem value='Ongoing'>Ongoing</MenuItem>
                        <MenuItem value='Cancelled'>Cancelled</MenuItem>
                      </Select>
                    )}
                  />
                  {errors.treatmentStatus && (
                    <Typography color='error'>
                      {errors.treatmentStatus.message}
                    </Typography>
                  )}
                </FormControl>
              </Grid>
            </Grid>
            <Button
              type='submit'
              color='primary'
              variant='contained'
              sx={{ alignSelf: 'flex-end', mt: 2 }}
            >
              Create
            </Button>
          </Box>
        </Paper>
      </Box>
    </DefaultLayout>
  )
}

export default CreateSessionTable
