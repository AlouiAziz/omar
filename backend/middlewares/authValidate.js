import { body, validationResult } from 'express-validator'

export const registerValidation = [
    body('nom').notEmpty().withMessage('Nom is required'),
    body('prenom').notEmpty().withMessage('Prenom is required'),
    body('email').notEmpty().isEmail().withMessage('Email must be valid email and required'),
    body('password').notEmpty().withMessage('Password is required')
];

export const loginValidation = [
    body('email').notEmpty().isEmail().withMessage('Email must be valid email and required'),
    body('password').notEmpty().withMessage('Password is required')
];

export const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) { return next() }
    return res.status(400).json({ errors: errors.array() })
};

