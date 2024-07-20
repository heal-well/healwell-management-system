import express from 'express'
import {
  getAllTreatments,
  getTreatmentById,
  updateTreatmentById,
  deleteTreatmentById,
  createTreatment
} from '../controllers/treatmentController.js'
const router = express.Router()

router.get('/treatments', getAllTreatments)
router.get('/treatments/:id', getTreatmentById)
router.put('/treatments/:id', updateTreatmentById)
router.delete('/treatments/:id', deleteTreatmentById)
router.post('/treatments', createTreatment)

export default router
