import mongoose from 'mongoose'

const patientsSchema = new mongoose.Schema({
  patientId: {
    type: String,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  sex: {
    type: String,
    required: true,
    enum: ['Male', 'Female']
  },
  phone: {
    type: Number,
    required: true,
    unique: true
  },
  address: {
    type: String,
    required: true
  },
  painArea: {
    type: String,
    required: true
  },
  surgeries: {
    type: String,
    required: true
  },
  dateOfInjury: {
    type: Date,
    required: true
  },
  isPacemaker: {
    type: Boolean,
    required: true
  }
})

patientsSchema.pre('save', async function (next) {
  if (this.isNew) {
    const initials =
      this.name.charAt(0).toUpperCase() + this.name.charAt(1)?.toUpperCase()
    const date = new Date()
    const year = date.getFullYear().toString()
    try {
      const count = await mongoose.model('Patients').countDocuments({
        patientId: new RegExp(`^${year}-\\d{4}i-${initials}`)
      })
      const idNumber = (count + 1).toString().padStart(4, '0')
      this.patientId = `${year}-${idNumber}-${initials}`
      next()
    } catch (error) {
      next(error)
    }
  } else {
    next()
  }
})

const Patients = mongoose.model('Patients', patientsSchema)

export default Patients
