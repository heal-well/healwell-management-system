import mongoose from 'mongoose'

const therapistsSchema = new mongoose.Schema({
  name: {
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
  image: {
    type: String,
    required: true
  },
  hoursOfWork: {
    type: String,
    required: true
  },
  workLocation: {
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
  }
})
const Therapists = mongoose.model('Therapists', therapistsSchema)

export default Therapists
