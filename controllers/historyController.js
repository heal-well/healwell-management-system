import mongoose from 'mongoose'
import Treatment from '../models/Treatment.js'
import Patients from '../models/Patients.js'
import Therapists from '../models/Therapists.js'

export const getHistory = async (req, res) => {
  const { patientId } = req.params // Assuming patientId is passed as a URL parameter
  try {
    const history = await Treatment.aggregate([
      {
        $match: { patientId: mongoose.Types.ObjectId(patientId) }
      },
      {
        $lookup: {
          from: 'patients',
          localField: 'patientId',
          foreignField: '_id',
          as: 'patient'
        }
      },
      {
        $lookup: {
          from: 'therapists',
          localField: 'therapistId',
          foreignField: '_id',
          as: 'therapist'
        }
      },
      {
        $lookup: {
          from: 'therapists',
          localField: 'substitutedBy',
          foreignField: '_id',
          as: 'substituteTherapist'
        }
      },
      {
        $unwind: '$patient'
      },
      {
        $unwind: '$therapist'
      },
      {
        $unwind: {
          path: '$substituteTherapist',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $project: {
          patientName: '$patient.name',
          therapistName: '$therapist.name',
          treatmentDate: 1,
          treatmentType: 1,
          daysAttended: 1,
          daysSubstituted: 1,
          substituteTherapistName: '$substituteTherapist.name',
          treatmentStatus: 1
        }
      }
    ])

    if (history.length === 0) {
      return res
        .status(404)
        .json({ message: 'No treatment history found for this patient' })
    }

    res.status(200).json(history)
  } catch (error) {
    console.error('Error getting history', error.message)
    res.status(500).json({ message: `Internal server error: ${error.message}` })
  }
}
