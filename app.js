import express from 'express'
import cors from 'cors'
import therapistsRoutes from './routes/therapistsRoutes.js'
import patientRoutes from './routes/patientsRoutes.js'
import treatmentRoutes from './routes/treatmentRoutes.js'
import historyRoutes from './routes/historyRoutes.js'
const app = express()

app.use(express.json())
app.use(
  cors({
    origin: true,
    credentials: true
  })
)

app.use('/api', therapistsRoutes)
app.use('/api', patientRoutes)
app.use('/api', treatmentRoutes)
app.use('/api', historyRoutes)
export default app
