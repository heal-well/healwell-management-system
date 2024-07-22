import Treatment from '../models/Treatment.js'

export const createTreatment = async (req, res) => {
  try {
    const data = req.body
    const treatment = new Treatment(data)
    await treatment.save()
    res.status(201).json(treatment)
  } catch (error) {
    console.error('Error creating treatment', error.message)
    res.status(500).json({ message: `Internal server error ${error.message}` })
  }
}

export const getAllTreatments = async (req, res) => {
  try {
    const treatments = await Treatment.find()
      .populate('patientId', 'name')
      .populate('therapistId', 'name')
      .populate('substitutedBy', 'name')
    if (!treatments) {
      res.status(404).json({ message: 'No treatments found' })
    }
    res.status(200).json(treatments)
  } catch (error) {
    console.error('Error getting all treatments', error.message)
    res.status(500).json({ message: `Internal server error ${error.message}` })
  }
}

export const getTreatmentById = async (req, res) => {
  try {
    const treatment = await Treatment.findById(req.params.id)
    if (!treatment) {
      res.status(404).json({ message: 'Treatment not found' })
    }
    res.status(200).json(treatment)
  } catch (error) {
    console.error('Error getting treatment by id', error.message)
    res.status(500).json({ message: `Internal server error ${error.message}` })
  }
}

export const updateTreatmentById = async (req, res) => {
  try {
    const data = req.body
    const id = req.params.id
    const treatment = await Treatment.findByIdAndUpdate(id, data, { new: true })
    res.status(200).json(treatment)
  } catch (error) {
    console.error('Error updating treatment by id', error.message)
    res.status(500).json({ message: `Internal server error ${error.message}` })
  }
}

export const deleteTreatmentById = async (req, res) => {
  try {
    const deletedTreatment = await Treatment.findByIdAndDelete(req.params.id)
    if (!deletedTreatment) {
      res.status(404).json({ message: 'Treatment not found' })
    }
    res.status(200).json(deletedTreatment)
  } catch (error) {
    console.error('Error deleting treatment by id', error.message)
    res.status(500).json({ message: `Internal server error ${error.message}` })
  }
}
