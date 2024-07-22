import React from 'react'
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
  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm()

  const onSubmit = async data => {
    console.log('formData: ', data)
    try {
      const response = await axios.post('/api/treatments', data)
      console.log('response: ', response)
      if (response) {
        navigate('/admin/treatments')
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
              onClick={() => navigate('/admin/treatments')}
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
                <TextField
                  {...register('patientId', { required: true })}
                  label='Patient ID'
                  variant='outlined'
                  fullWidth
                  error={!!errors.patientId}
                  helperText={errors.patientId ? 'Patient ID is required' : ''}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  {...register('therapistId', { required: true })}
                  label='Therapist ID'
                  variant='outlined'
                  fullWidth
                  error={!!errors.therapistId}
                  helperText={
                    errors.therapistId ? 'Therapist ID is required' : ''
                  }
                />
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
                <TextField
                  {...register('substitutedBy', { required: true })}
                  label='Substituted By'
                  variant='outlined'
                  fullWidth
                  error={!!errors.substitutedBy}
                  helperText={
                    errors.substitutedBy ? 'Substituted By is required' : ''
                  }
                />
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
