import express from 'express'
import { getConfiguration } from '../controllers/configuration.js'

const router = express.Router()

//GET CONFIGURATIONS
router.get("/", getConfiguration)


export default router