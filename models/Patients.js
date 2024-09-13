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

// Pre-save hook for generating unique patientId
patientsSchema.pre('save', async function (next) {
  if (this.isNew) {
    // Get first two characters from the first name, in uppercase
    const initials = this.name.trim().substring(0, 2).toUpperCase()
    const year = new Date().getFullYear().toString()

    try {
      // Find the last patient with matching initials and year
      const lastPatient = await mongoose
        .model('Patients')
        .findOne({
          patientId: new RegExp(`^${year}-\\d{4}-${initials}$`)
        })
        .sort({ patientId: -1 })

      let idNumber = '0001' // Default ID number if no match found

      if (lastPatient) {
        const lastIdNumber = lastPatient.patientId.split('-')[1]
        idNumber = (parseInt(lastIdNumber) + 1).toString().padStart(4, '0')
      }

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
