import express from 'express'
import { createAdmin, deleteAdmin, getAllAdmins, getOneAdmin, updateAdmin } from '../controllers/admin.js'
import { registerValidation, validate } from '../middlewares/authValidate.js'

const router = express.Router()

//CREATE
router.post("/", registerValidation, validate, createAdmin)

//UPDATE
router.put("/:id", updateAdmin)

//DELETE
router.delete("/:id", deleteAdmin)

//GET ALL
router.get("/", getAllAdmins)

//GET ONE
router.get("/:id", getOneAdmin)

export default router