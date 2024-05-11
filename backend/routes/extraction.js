import express from 'express'
import { getAllExtractions, getExtractions } from '../controllers/extraction.js'

const router = express.Router()

//GET ALL EXTRACTIONS
router.get("/", getAllExtractions)

//GET EXTRACTIONS BY SERVERS NAMES
router.get("/find", getExtractions)

export default router