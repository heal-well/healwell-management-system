import Patients from '../models/Patients.js'

export const createPatient = async (req, res) => {
  try {
    const data = req.body
    const patient = new Patients(data)

    await patient.save()
    res.status(201).json(patient)
  } catch (error) {
    console.error('Error creating patient', error.message)
    res.status(500).json({ message: `Internal server error ${error.message}` })
  }
}

export const getAllPatients = async (req, res) => {
  try {
    const patients = await Patients.find()

    if (!patients) {
      res.status(404).json({ message: 'No patients found' })
    }
    res.status(200).json(patients)
  } catch (error) {
    console.error('Error getting all patients', error.message)
    res.status(500).json({ message: `Internal server error ${error.message}` })
  }
}

export const getPatientById = async (req, res) => {
  try {
    const id = req.params.id

    const patient = await Patients.findById(id)
    if (!patient) {
      res.status(404).json({ message: 'Patient not found' })
    }
    res.status(200).json(patient)
  } catch (error) {
    console.error('Error getting patient by id', error.message)
    res.status(500).json({ message: `Internal server error ${error.message}` })
  }
}

export const updatePatientById = async (req, res) => {
  try {
    const data = req.body
    const id = req.params.id

    const patient = await Patients.findByIdAndUpdate(id, data, { new: true })

    if (!patient) {
      res.status(404).json({ message: 'Patient not found' })
    }

    res.status(200).json(patient)
  } catch (error) {
    console.error('Error updating patient by id', error.message)
    res.status(500).json({ message: `Internal server error ${error.message}` })
  }
}

export const deletePatientById = async (req, res) => {
  try {
    const deletedPatient = await Patients.findByIdAndDelete(req.params.id)
    if (!deletedPatient) {
      res.status(404).json({ message: 'Patient not found' })
    }
    res.status(200).json(deletedPatient)
  } catch (error) {
    console.error('Error deleting patient by id', error.message)
    res.status(500).json({ message: `Internal server error ${error.message}` })
  }
}
