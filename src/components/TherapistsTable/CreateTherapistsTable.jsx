import React, { useState } from 'react'
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
import { useNavigate } from 'react-router-dom'
import CloseIcon from '@mui/icons-material/Close'
import DefaultLayout from '../../layout/DefaultLayout'
import axios from 'axios'

const CreateTherapistsTable = () => {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm()

  const [formData, setFormData] = useState({
    address: '',
    college: '',
    hoursOfWork: '',
    languages: '',
    name: '',
    phone: '',
    specialization: '',
    workLocation: '',
    yearsOfExperience: '',
    timeSlot: ''
  })

  const handleChange = e => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  //   const handleFileChange = e => {
  //     const file = e.target.files[0]
  //     setFormData({
  //       ...formData,
  //       logo: file
  //     })
  //   }

  const onSubmit = async data => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/therapists`,
        data
      )
      console.log('response: ', response)
      if (response) {
        navigate('/')
        console.log('Data created: ', response.data)
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
              Create Therapist
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
                  {...register('name', { required: true })}
                  label='Name'
                  variant='outlined'
                  fullWidth
                  error={!!errors.name}
                  helperText={errors.name ? 'Name is required' : ''}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  {...register('college', { required: true })}
                  label='College'
                  variant='outlined'
                  fullWidth
                  error={!!errors.college}
                  helperText={errors.college ? 'College is required' : ''}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  {...register('hoursOfWork', { required: true })}
                  label='Hours of Work'
                  variant='outlined'
                  fullWidth
                  error={!!errors.hoursOfWork}
                  helperText={
                    errors.hoursOfWork ? 'Hours of work are required' : ''
                  }
                  onChange={handleChange}
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
                  {errors.substitutedBy && (
                    <Typography color='error'>
                      {errors.substitutedBy.message}
                    </Typography>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  {...register('languages', { required: true })}
                  label='Languages'
                  variant='outlined'
                  fullWidth
                  error={!!errors.languages}
                  helperText={errors.languages ? 'Languages are required' : ''}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  {...register('phone', { required: true })}
                  label='Phone'
                  variant='outlined'
                  fullWidth
                  error={!!errors.phone}
                  helperText={errors.phone ? 'Phone is required' : ''}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  {...register('specialization', { required: true })}
                  label='Specialization'
                  variant='outlined'
                  fullWidth
                  error={!!errors.specialization}
                  helperText={
                    errors.specialization ? 'Specialization is required' : ''
                  }
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  {...register('workLocation', { required: true })}
                  label='Work Location'
                  variant='outlined'
                  fullWidth
                  error={!!errors.workLocation}
                  helperText={
                    errors.workLocation ? 'Work location is required' : ''
                  }
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  {...register('yearsOfExperience', { required: true })}
                  label='Years of Experience'
                  variant='outlined'
                  fullWidth
                  error={!!errors.yearsOfExperience}
                  helperText={
                    errors.yearsOfExperience
                      ? 'Years of experience are required'
                      : ''
                  }
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...register('address', { required: true })}
                  label='Address'
                  variant='outlined'
                  fullWidth
                  error={!!errors.address}
                  helperText={errors.address ? 'Address is required' : ''}
                  onChange={handleChange}
                />
              </Grid>
              {/* Uncomment the below code if you need file upload feature
              <Grid item xs={12} sm={8}>
                <Typography
                  variant='body1'
                  sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}
                  gutterBottom
                >
                  Logo
                  <input
                    type='file'
                    accept='image/*'
                    onChange={handleFileChange}
                  />
                </Typography>
              </Grid>
              */}
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

export default CreateTherapistsTable
