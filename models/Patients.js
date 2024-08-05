import mongoose from 'mongoose'

const patientsSchema = new mongoose.Schema({
  patientId: {
    type: String,
    required: true,
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
  electricalModalities: {
    type: String,
    required: true
  }
})

const Patients = mongoose.model('Patients', patientsSchema)

export default Patients
