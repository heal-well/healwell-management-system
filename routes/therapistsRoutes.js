import express from 'express'
import {
  getTherapistById,
  getAllTherapists,
  createTherapist,
  updateTherapistById,
  deleteTherapistById
} from '../controllers/therapistsController.js'

const router = express.Router()

router.get('/therapists', getAllTherapists)
router.get('/therapists/:id', getTherapistById)
router.post('/therapists', createTherapist)
router.put('/therapists/:id', updateTherapistById)
router.delete('/therapists/:id', deleteTherapistById)

export default router
