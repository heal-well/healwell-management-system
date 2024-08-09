import express from 'express'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'

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

// ES6 workaround for __dirname
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Serve the static files from the React app's build folder
app.use(express.static(path.join(__dirname, 'build')))

// API routes
app.use('/api', therapistsRoutes)
app.use('/api', patientRoutes)
app.use('/api', treatmentRoutes)
app.use('/api', historyRoutes)

// The "catchall" handler: for any request that doesn't match the API routes, send back index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

export default app
