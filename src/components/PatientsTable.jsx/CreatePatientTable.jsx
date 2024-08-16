import React, { useState, useEffect } from 'react'
import {
  Button,
  TextField,
  Box,
  Typography,
  Paper,
  Grid,
  IconButton,
  Select,
  FormControl,
  InputLabel,
  MenuItem
} from '@mui/material'
import { useForm } from 'react-hook-form'
import { useNavigate, useLocation, useParams } from 'react-router-dom'
import CloseIcon from '@mui/icons-material/Close'
import DefaultLayout from '../../layout/DefaultLayout'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const CreatePatientsTable = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { id } = useParams()
  const patientData = location.state?.patient || {}

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const [formData, setFormData] = useState({
    patientId: patientData.patientId || '',
    name: patientData.name || '',
    age: patientData.age || '',
    sex: patientData.sex || '',
    phone: patientData.phone || '',
    address: patientData.address || '',
    painArea: patientData.painArea || '',
    surgeries: patientData.surgeries || '',
    dateOfInjury: patientData.dateOfInjury
      ? new Date(patientData.dateOfInjury).toISOString().split('T')[0]
      : '',
    isPacemaker: patientData.isPacemaker || false
  })

  useEffect(() => {
    if (id) {
      setFormData(patientData)
    }
  }, [id, patientData])

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
          `${import.meta.env.VITE_API_URL}/api/patients/${id}`,
          data
        )
        toast.success('Patient updated successfully')
        navigate('/patients')
      } else {
        await axios.post(`${import.meta.env.VITE_API_URL}/api/patients`, data)
        toast.success('Patient created successfully')
      }
      navigate('/patients')
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error('Patient with this phone number already exists')
      } else {
        toast.error('Error saving patient')
      }
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
              {id ? 'Edit Patient' : 'Create Patient'}
            </Typography>
            <IconButton
              onClick={() => navigate('/patients')}
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
                  {...register('name', { required: true })}
                  label='Name'
                  variant='outlined'
                  fullWidth
                  error={!!errors.name}
                  helperText={errors.name ? 'Name is required' : ''}
                  value={formData.name}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  {...register('age', { required: true })}
                  label='Age'
                  variant='outlined'
                  fullWidth
                  error={!!errors.age}
                  helperText={errors.age ? 'Age is required' : ''}
                  value={formData.age}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth variant='outlined' error={!!errors.sex}>
                  <InputLabel>Sex</InputLabel>
                  <Select
                    {...register('sex', { required: true })}
                    label='Sex'
                    value={formData.sex}
                    onChange={handleChange}
                    name='sex'
                  >
                    <MenuItem value='Male'>Male</MenuItem>
                    <MenuItem value='Female'>Female</MenuItem>
                  </Select>
                </FormControl>
                {errors.sex && (
                  <Typography variant='caption' color='error'>
                    Sex is required
                  </Typography>
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  {...register('phone', { required: true })}
                  label='Phone'
                  variant='outlined'
                  fullWidth
                  error={!!errors.phone}
                  helperText={errors.phone ? 'Phone is required' : ''}
                  value={formData.phone}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...register('address')}
                  label='Address'
                  variant='outlined'
                  fullWidth
                  value={formData.address}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...register('painArea')}
                  label='Pain Area'
                  variant='outlined'
                  fullWidth
                  value={formData.painArea}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...register('surgeries')}
                  label='Surgeries'
                  variant='outlined'
                  fullWidth
                  value={formData.surgeries}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...register('dateOfInjury')}
                  label='Date of Injury'
                  type='date'
                  variant='outlined'
                  fullWidth
                  value={formData.dateOfInjury}
                  onChange={handleChange}
                  InputLabelProps={{
                    shrink: true
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Pacemaker</InputLabel>
                  <Select
                    {...register('isPacemaker')}
                    label='Pacemaker'
                    value={formData.isPacemaker}
                    onChange={handleChange}
                    name='isPacemaker'
                  >
                    <MenuItem value={true}>Yes</MenuItem>
                    <MenuItem value={false}>No</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Button
              type='submit'
              color='primary'
              variant='contained'
              sx={{ alignSelf: 'flex-end', mt: 2 }}
            >
              {id ? 'Save Changes' : 'Create'}
            </Button>
          </Box>
        </Paper>
      </Box>
    </DefaultLayout>
  )
}

export default CreatePatientsTable
