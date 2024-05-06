import express from 'express'
import { getAllServers, getServers } from '../controllers/server.js'

const router = express.Router()

//GET ALL
router.get("/", getAllServers)

//GET BY SERVERS NAMES
router.get("/find", getServers)

export default router