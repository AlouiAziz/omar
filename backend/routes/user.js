import express from 'express'
import { deleteUser, getAllUsers, getOneUser, updateUser } from '../controllers/user.js'

const router = express.Router()

//UPDATE
router.put("/:id", updateUser)


//DELETE
router.delete("/:id", deleteUser)


//GET
router.get("/:id", getOneUser)


//GET ALL
router.get("/", getAllUsers)

export default router