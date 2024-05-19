import express from 'express'
import { getAllConfigurations, getConfiguration } from '../controllers/configuration.js'

const router = express.Router()

//GET CONFIGURATIONS
router.get("/", getConfiguration)

//GET ALL CONFIGURATIONS
router.get("/all", getAllConfigurations)


export default router