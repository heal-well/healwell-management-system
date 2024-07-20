import mongoose from 'mongoose'
import app from './app.js'
import 'dotenv/config'
const PORT = 3000

mongoose
  .connect(process.env.MONGO_DB_URI)
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch(err => {
    console.log('Error connecting to MongoDB', err)
  })

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
