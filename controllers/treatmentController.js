import Treatment from '../models/Treatment.js'
import Therapists from '../models/Therapists.js'
export const createTreatment = async (req, res) => {
  try {
    const data = req.body
    const treatment = new Treatment(data)
    await treatment.save()

    await Therapists.findByIdAndUpdate(
      treatment.therapistId,
      { $addToSet: { patientsTreated: treatment.patientId } },
      { new: true }
    )

    if (treatment.substitutedBy) {
      await Therapists.findByIdAndUpdate(
        treatment.substitutedBy,
        { $addToSet: { patientsTreated: treatment.patientId } },
        { new: true }
      )
    }
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
      .populate('therapistId', 'firstName lastName therapistId')
      .populate('substitutedBy', 'firstName lastName therapistId')

    if (treatments.length === 0) {
      return res.status(404).json({ message: 'No treatments found' })
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
      .populate('patientId', 'name')
      .populate('therapistId', 'firstName lastName therapistId')
      .populate('substitutedBy', 'firstName lastName therapistId')

    if (!treatment) {
      return res.status(404).json({ message: 'Treatment not found' })
    }
    res.status(200).json(treatment)
  } catch (error) {
    console.error('Error getting treatment by id', error.message)
    res.status(500).json({ message: `Internal server error: ${error.message}` })
  }
}

export const updateTreatmentById = async (req, res) => {
  try {
    const { patientId, therapistId, substitutedBy } = req.body
    const id = req.params.id

    const treatment = await Treatment.findByIdAndUpdate(id, req.body, {
      new: true
    })

    if (!treatment) {
      return res.status(404).json({ message: 'Treatment not found' })
    }

    // Update the primary therapist's patientsTreated field
    await Therapists.findByIdAndUpdate(
      therapistId,
      { $addToSet: { patientsTreated: patientId } },
      { new: true }
    )

    // Update the substitute therapist's patientsTreated field, if applicable
    if (substitutedBy) {
      await Therapists.findByIdAndUpdate(
        substitutedBy,
        { $addToSet: { patientsTreated: patientId } },
        { new: true }
      )
    }

    res.status(200).json(treatment)
  } catch (error) {
    console.error('Error updating treatment by id', error.message)
    res.status(500).json({ message: `Internal server error: ${error.message}` })
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
