import express from 'express'
import { createUser, deleteUser, getAllUsers, getOneUser, updateUser } from '../controllers/user.js'
import { registerValidation, validate } from '../middlewares/authValidate.js'

const router = express.Router()

//CREATE
router.post("/", registerValidation, validate, createUser)

//UPDATE
router.put("/:id", updateUser)

//DELETE
router.delete("/:id", deleteUser)

//GET ALL
router.get("/", getAllUsers)

//GET ONE
router.get("/:id", getOneUser)

export default router