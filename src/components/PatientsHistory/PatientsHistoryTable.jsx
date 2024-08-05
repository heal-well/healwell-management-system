import React, { useEffect, useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Typography
} from '@mui/material'
import axios from 'axios'
import DefaultLayout from '../../layout/DefaultLayout'

const PatientsHistoryTable = () => {
  const [history, setHistory] = useState([])

  useEffect(() => {
    fetchHistory()
  }, [])

  const fetchHistory = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/history`
      )
      setHistory(response.data)
      console.log(response.data)
    } catch (error) {
      console.error('Error fetching patient history: ', error)
    }
  }

  return (
    <DefaultLayout>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          padding: '20px'
        }}
      >
        <Typography variant='h4' gutterBottom>
          Patient History
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Patient Name</TableCell>
                <TableCell>Therapist Name</TableCell>
                <TableCell>Substitute Therapist Name</TableCell>
                <TableCell>Treatment Type</TableCell>
                <TableCell>Date of Injury</TableCell>
                <TableCell>Treatment Date</TableCell>
                <TableCell>Treatment Status</TableCell>
                <TableCell>Days Attended</TableCell>
                <TableCell>Days Substituted</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {history.map((record, index) => (
                <React.Fragment key={index}>
                  {record.treatments.map((treatment, tIndex) => (
                    <TableRow key={tIndex}>
                      {tIndex === 0 && (
                        <>
                          <TableCell rowSpan={record.treatments.length}>
                            {record.patientName}
                          </TableCell>
                          <TableCell rowSpan={record.treatments.length}>
                            {record.therapistName}
                          </TableCell>
                          <TableCell rowSpan={record.treatments.length}>
                            {record.substituteTherapistName || 'N/A'}
                          </TableCell>
                          <TableCell rowSpan={record.treatments.length}>
                            {new Date(record.dateOfInjury).toLocaleDateString()}
                          </TableCell>
                        </>
                      )}
                      <TableCell>{treatment.treatmentType}</TableCell>
                      <TableCell>
                        {new Date(treatment.treatmentDate).toLocaleDateString()}
                      </TableCell>
                      <TableCell>{treatment.treatmentStatus}</TableCell>
                      <TableCell>{treatment.daysAttended}</TableCell>
                      <TableCell>{treatment.daysSubstituted}</TableCell>
                    </TableRow>
                  ))}
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </DefaultLayout>
  )
}

export default PatientsHistoryTable
