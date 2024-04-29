import express from 'express'
import { login, register } from '../controllers/auth.js'
import { loginValidation, registerValidation, validate } from '../middlewares/authValidate.js';

const router = express.Router()

router.post("/login", loginValidation, validate, login)

router.post("/register", registerValidation, validate, register)


export default router