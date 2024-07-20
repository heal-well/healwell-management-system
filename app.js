import express from 'express'
import therapistsRoutes from './routes/therapistsRoutes.js'
import patientRoutes from './routes/patientsRoutes.js'
import treatmentRoutes from './routes/treatmentRoutes.js'
const app = express()

app.use(express.json())
app.use('/api', therapistsRoutes)
app.use('/api', patientRoutes)
app.use('/api', treatmentRoutes)

export default app
