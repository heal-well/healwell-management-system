import React, { useEffect, useState } from 'react'
import {
  Button,
  TextField,
  Box,
  Typography,
  Paper,
  Grid,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material'
import { useForm, Controller } from 'react-hook-form'
import { useNavigate, useLocation, useParams } from 'react-router-dom'
import CloseIcon from '@mui/icons-material/Close'
import DefaultLayout from '../../layout/DefaultLayout'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const CreateTherapistsTable = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { id } = useParams()
  const therapistData = location.state?.therapist || {}
  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm()

  const [createdTherapistId, setCreatedTherapistId] = useState(null)
  const [formData, setFormData] = useState({
    therapistId: therapistData.therapistId || '',
    firstName: therapistData.firstName || '',
    lastName: therapistData.lastName || '',
    phone: therapistData.phone || '',
    address: therapistData.address || '',
    hoursOfWork: therapistData.hoursOfWork || '',
    workLocation: therapistData.workLocation || '',
    timeSlot: therapistData.timeSlot || '',
    college: therapistData.college || '',
    specialization: therapistData.specialization || '',
    yearsOfExperience: therapistData.yearsOfExperience || ''
  })

  useEffect(() => {
    if (id) {
      setFormData(therapistData)
    }
  }, [id, therapistData])

  const handleChange = e => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const onSubmit = async data => {
    try {
      if (id) {
        await axios.put(
          `${import.meta.env.VITE_API_URL}/api/therapists/${id}`,
          data
        )
        toast.success('Therapist updated successfully')
        navigate('/')
      } else {
        await axios.post(`${import.meta.env.VITE_API_URL}/api/therapists`, data)
        console.log('response: ', response)
        if (response) {
          setCreatedTherapistId(response.data.therapistId)
          console.log('Data created: ', response.data)
          toast.success('Therapist created successfully')
          navigate('/')
        }
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error('Therapist with this phone number already exists')
      } else {
        toast.error('Error creating therapist')
      }
      console.error('Error creating data: ', error)
    }
  }

  return (
    <DefaultLayout>
      <ToastContainer />
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
              {id ? 'Edit Therapist' : 'Create Therapist'}
            </Typography>
            <IconButton onClick={() => navigate('/')} aria-label='Close'>
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
                <TextField
                  {...register('firstName', { required: true })}
                  label='First Name'
                  variant='outlined'
                  fullWidth
                  error={!!errors.firstName}
                  value={formData.firstName}
                  helperText={errors.firstName ? 'First name is required' : ''}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  {...register('lastName', { required: true })}
                  label='Last Name'
                  variant='outlined'
                  fullWidth
                  error={!!errors.lastName}
                  value={formData.lastName}
                  helperText={errors.lastName ? 'Last name is required' : ''}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  {...register('college', { required: true })}
                  label='College'
                  variant='outlined'
                  fullWidth
                  error={!!errors.college}
                  value={formData.college}
                  helperText={errors.college ? 'College is required' : ''}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  {...register('hoursOfWork', { required: true })}
                  label='Hours of Work'
                  variant='outlined'
                  fullWidth
                  error={!!errors.hoursOfWork}
                  value={formData.hoursOfWork}
                  helperText={
                    errors.hoursOfWork ? 'Hours of work are required' : ''
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id='timeslot-label'>Time Slot</InputLabel>
                  <Controller
                    name='timeSlot'
                    control={control}
                    defaultValue='none'
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Select
                        labelId='timeslot-label'
                        label='Time Slot'
                        {...field}
                        error={!!errors.timeSlot}
                      >
                        <MenuItem value='6AM-8AM'>6AM-8AM</MenuItem>
                        <MenuItem value='8AM-10AM'>8AM-10AM</MenuItem>
                        <MenuItem value='10AM-12PM'>10AM-12PM</MenuItem>
                        <MenuItem value='12PM-2PM'>12PM-2PM</MenuItem>
                        <MenuItem value='2PM-4PM'>2PM-4PM</MenuItem>
                        <MenuItem value='4PM-6PM'>4PM-6PM</MenuItem>
                        <MenuItem value='6PM-8PM'>6PM-8PM</MenuItem>
                        <MenuItem value='8PM-10PM'>8PM-10PM</MenuItem>
                      </Select>
                    )}
                  />
                  {errors.timeSlot && (
                    <Typography color='error'>
                      {errors.timeSlot.message}
                    </Typography>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  {...register('languages', { required: true })}
                  label='Languages'
                  variant='outlined'
                  value={formData.languages}
                  fullWidth
                  error={!!errors.languages}
                  helperText={errors.languages ? 'Languages are required' : ''}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  {...register('phone', { required: true })}
                  label='Phone'
                  variant='outlined'
                  value={formData.phone}
                  fullWidth
                  error={!!errors.phone}
                  helperText={errors.phone ? 'Phone is required' : ''}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  {...register('specialization', { required: true })}
                  label='Specialization'
                  variant='outlined'
                  fullWidth
                  value={formData.specialization}
                  error={!!errors.specialization}
                  helperText={
                    errors.specialization ? 'Specialization is required' : ''
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  {...register('workLocation', { required: true })}
                  label='Work Location'
                  variant='outlined'
                  value={formData.workLocation}
                  fullWidth
                  error={!!errors.workLocation}
                  helperText={
                    errors.workLocation ? 'Work location is required' : ''
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  {...register('yearsOfExperience', { required: true })}
                  label='Years of Experience'
                  variant='outlined'
                  value={formData.yearsOfExperience}
                  fullWidth
                  error={!!errors.yearsOfExperience}
                  helperText={
                    errors.yearsOfExperience
                      ? 'Years of experience are required'
                      : ''
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...register('address', { required: true })}
                  label='Address'
                  variant='outlined'
                  fullWidth
                  value={formData.address}
                  error={!!errors.address}
                  helperText={errors.address ? 'Address is required' : ''}
                />
              </Grid>
            </Grid>
            <Button
              type='submit'
              color='primary'
              variant='contained'
              sx={{ alignSelf: 'flex-end', mt: 2 }}
            >
              {id ? 'Update' : 'Create'}
            </Button>
          </Box>
          {createdTherapistId && (
            <Typography variant='h6' color='primary' sx={{ mt: 2 }}>
              Therapist created successfully! ID: {createdTherapistId}
            </Typography>
          )}
        </Paper>
      </Box>
    </DefaultLayout>
  )
}

export default CreateTherapistsTable
