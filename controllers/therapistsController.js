import Therapists from '../models/Therapists.js'

export const createTherapist = async (req, res) => {
  try {
    const { phone, ...data } = req.body

    const existingTherapist = await Therapists.findOne({ phone })
    if (existingTherapist) {
      return res
        .status(400)
        .json({ message: 'Therapist with this phone number already exists' })
    }
    const therapist = new Therapists({ phone, ...data })
    await therapist.save()
    console.log('Therapist created: ', therapist.therapistId)
    res.status(201).json(therapist)
  } catch (error) {
    console.error('Error creating therapist', error.message)
    res.status(500).json({ message: `Internal server error: ${error.message}` })
  }
}

export const getAllTherapists = async (req, res) => {
  try {
    const therapists = await Therapists.find()
    if (!therapists.length) {
      return res.status(404).json({ message: 'No therapists found' })
    }
    res.status(200).json(therapists)
  } catch (error) {
    console.error('Error getting all therapists', error.message)
    res.status(500).json({ message: `Internal server error: ${error.message}` })
  }
}

export const getTherapistById = async (req, res) => {
  try {
    const therapist = await Therapists.findById(req.params.id)
    if (!therapist) {
      return res.status(404).json({ message: 'Therapist not found' })
    }
    res.status(200).json(therapist)
  } catch (error) {
    console.error('Error getting therapist by id', error.message)
    res.status(500).json({ message: `Internal server error: ${error.message}` })
  }
}

export const updateTherapistById = async (req, res) => {
  try {
    const data = req.body
    const id = req.params.id

    const therapist = await Therapists.findByIdAndUpdate(id, data, {
      new: true
    })
    if (!therapist) {
      return res.status(404).json({ message: 'Therapist not found' })
    }
    res.status(200).json(therapist)
  } catch (error) {
    console.error('Error updating therapist by id', error.message)
    res.status(500).json({ message: `Internal server error: ${error.message}` })
  }
}

export const deleteTherapistById = async (req, res) => {
  try {
    const deletedTherapist = await Therapists.findByIdAndDelete(req.params.id)
    if (!deletedTherapist) {
      return res.status(404).json({ message: 'Therapist not found' })
    }
    res.status(200).json({ message: 'Therapist deleted successfully' })
  } catch (error) {
    console.error('Error deleting therapist by id', error.message)
    res.status(500).json({ message: `Internal server error: ${error.message}` })
  }
}
