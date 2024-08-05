import mongoose from 'mongoose'

const therapistsSchema = new mongoose.Schema({
  therapistId: {
    type: String,
    unique: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
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
  // image: {
  //   type: String,
  //   required: true
  // },
  hoursOfWork: {
    type: Number,
    required: true
  },
  workLocation: {
    type: String,
    required: true
  },
  timeSlot: {
    type: String,
    required: true
  },
  yearsOfExperience: {
    type: Number,
    required: true
  },
  college: {
    type: String,
    required: true
  },
  specialization: {
    type: String
  },
  languages: {
    type: String,
    required: true
  },
  patientsTreated: {
    type: mongoose.Types.ObjectId,
    ref: 'Patients'
  }
})

therapistsSchema.pre('save', async function (next) {
  if (this.isNew) {
    const initials =
      this.firstName.charAt(0).toUpperCase() +
      this.lastName.charAt(0).toUpperCase()
    const count = await mongoose.model('Therapists').countDocuments({
      therapistId: new RegExp(`^${initials}`)
    })
    const idNumber = (count + 1).toString().padStart(4, '0')
    this.therapistId = `${initials}${idNumber}`
  }
  next()
})
const Therapists = mongoose.model('Therapists', therapistsSchema)
export default Therapists
