import express from 'express'
import { login } from '../controllers/auth.js'
import { loginValidation, validate } from '../middlewares/authValidate.js';

const router = express.Router()

router.post("/login", loginValidation, validate, login)

export default router