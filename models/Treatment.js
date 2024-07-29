import mongoose from 'mongoose'

const treatmentSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patients',
    required: true
  },
  therapistId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Therapists',
    required: true
  },

  treatmentDate: {
    type: Date,
    required: true
  },
  treatmentType: {
    type: String,
    required: true
  },

  daysAttended: {
    type: Number,
    required: true
  },
  daysSubstituted: {
    type: Number,
    required: true
  },
  substitutedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Therapists',
    required: false
  },
  treatmentStatus: {
    type: String,
    required: true
  }
})

const Treatment = mongoose.model('Treatment', treatmentSchema)
export default Treatment
