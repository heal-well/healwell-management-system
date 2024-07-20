import express from 'express'
import {
  getAllPatients,
  getPatientById,
  updatePatientById,
  deletePatientById,
  createPatient
} from '../controllers/patientsController.js'
const router = express.Router()

router.get('/patients', getAllPatients)
router.get('/patients/:id', getPatientById)
router.put('/patients/:id', updatePatientById)
router.delete('/patients/:id', deletePatientById)
router.post('/patients', createPatient)

export default router
