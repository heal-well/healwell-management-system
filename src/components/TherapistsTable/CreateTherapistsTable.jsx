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
  const [timeSlots, setTimeSlots] = useState(therapistData.timeSlots || [])

  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm({
    defaultValues: {
      therapistId: therapistData.therapistId || '',
      firstName: therapistData.firstName || '',
      lastName: therapistData.lastName || '',
      phone: therapistData.phone || '',
      address: therapistData.address || '',
      hoursOfWork: therapistData.hoursOfWork || '',
      workLocation: therapistData.workLocation || '',
      timeSlot: therapistData.timeSlot || '',
      fromTime: therapistData.fromTime || '',
      toTime: therapistData.toTime || '',
      languages: therapistData.languages || '',
      college: therapistData.college || '',
      specialization: therapistData.specialization || '',
      yearsOfExperience: therapistData.yearsOfExperience || ''
    }
  })

  useEffect(() => {
    if (id) {
      setTimeSlots(therapistData.timeSlots || [])
    }
  }, [id, therapistData])

  const handleAddTimeSlot = () => {
    setTimeSlots([...timeSlots, { slot: '', fromTime: '', toTime: '' }])
  }

  const handleTimeSlotChange = (index, name, value) => {
    const updatedTimeSlots = [...timeSlots]
    updatedTimeSlots[index][name] = value
    setTimeSlots(updatedTimeSlots)
  }

  const onSubmit = async data => {
    try {
      data.timeSlots = timeSlots

      if (id) {
        const response = await axios.put(
          `${import.meta.env.VITE_API_URL}/api/therapists/${id}`,
          data
        )

        if (response.status === 200) {
          toast.success('Therapist updated successfully')
        } else {
          toast.error('Failed to update therapist')
        }
      } else {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/therapists`,
          data
        )

        if (response.status === 201 || response.status === 200) {
          toast.success('Therapist created successfully')
        } else {
          toast.error('Failed to create therapist')
        }
      }

      navigate('/')
    } catch (error) {
      const errorMsg =
        error.response?.data?.message || 'Error creating or updating therapist'
      toast.error(errorMsg)
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
            component='form'
            onSubmit={handleSubmit(onSubmit)}
            sx={{
              '& .MuiTextField-root': { marginBottom: '20px' }
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  {...register('firstName', {
                    required: 'First name is required'
                  })}
                  label='First Name'
                  variant='outlined'
                  fullWidth
                  error={!!errors.firstName}
                  helperText={errors.firstName?.message}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  {...register('lastName', {
                    required: 'Last name is required'
                  })}
                  label='Last Name'
                  variant='outlined'
                  fullWidth
                  error={!!errors.lastName}
                  helperText={errors.lastName?.message}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  {...register('college', { required: 'College is required' })}
                  label='College'
                  variant='outlined'
                  fullWidth
                  error={!!errors.college}
                  helperText={errors.college?.message}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  {...register('hoursOfWork', {
                    required: 'Hours of work are required'
                  })}
                  label='Hours of Work'
                  variant='outlined'
                  fullWidth
                  error={!!errors.hoursOfWork}
                  helperText={errors.hoursOfWork?.message}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  {...register('languages', {
                    required: 'Languages are required'
                  })}
                  label='Languages'
                  variant='outlined'
                  fullWidth
                  error={!!errors.languages}
                  helperText={errors.languages?.message}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  {...register('phone', { required: 'Phone is required' })}
                  label='Phone'
                  variant='outlined'
                  fullWidth
                  error={!!errors.phone}
                  helperText={errors.phone?.message}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  {...register('specialization', {
                    required: 'Specialization is required'
                  })}
                  label='Specialization'
                  variant='outlined'
                  fullWidth
                  error={!!errors.specialization}
                  helperText={errors.specialization?.message}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  {...register('workLocation', {
                    required: 'Work location is required'
                  })}
                  label='Work Location'
                  variant='outlined'
                  fullWidth
                  error={!!errors.workLocation}
                  helperText={errors.workLocation?.message}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  {...register('yearsOfExperience', {
                    required: 'Years of experience is required'
                  })}
                  label='Years of Experience'
                  variant='outlined'
                  fullWidth
                  error={!!errors.yearsOfExperience}
                  helperText={errors.yearsOfExperience?.message}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  {...register('address', { required: 'Address is required' })}
                  label='Address'
                  variant='outlined'
                  fullWidth
                  error={!!errors.address}
                  helperText={errors.address?.message}
                />
              </Grid>

              {/* Time Slots */}
              {timeSlots.map((slot, index) => (
                <Grid item xs={12} key={index} container spacing={2}>
                  <Grid item xs={4}>
                    <FormControl fullWidth variant='outlined'>
                      <InputLabel>Time Slot</InputLabel>
                      <Select
                        value={slot.slot}
                        onChange={e =>
                          handleTimeSlotChange(index, 'slot', e.target.value)
                        }
                        label='Time Slot'
                      >
                        <MenuItem value='morning'>Morning</MenuItem>
                        <MenuItem value='afternoon'>Afternoon</MenuItem>
                        <MenuItem value='evening'>Evening</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      label='From Time'
                      variant='outlined'
                      fullWidth
                      value={slot.fromTime}
                      onChange={e =>
                        handleTimeSlotChange(index, 'fromTime', e.target.value)
                      }
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      label='To Time'
                      variant='outlined'
                      fullWidth
                      value={slot.toTime}
                      onChange={e =>
                        handleTimeSlotChange(index, 'toTime', e.target.value)
                      }
                    />
                  </Grid>
                </Grid>
              ))}
              <Grid item xs={12}>
                <Button
                  onClick={handleAddTimeSlot}
                  variant='contained'
                  sx={{ marginBottom: '5px' }}
                >
                  Add Time Slot
                </Button>
              </Grid>
            </Grid>

            <Button variant='contained' color='primary' type='submit'>
              {id ? 'Update Therapist' : 'Create Therapist'}
            </Button>
          </Box>
        </Paper>
      </Box>
    </DefaultLayout>
  )
}

export default CreateTherapistsTable
