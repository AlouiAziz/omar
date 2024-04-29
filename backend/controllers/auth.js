import User from "../models/User.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


export const register = async (req, res, next) => {

    try {

        const existingUser = await User.findOne({ email: req.body.email })
        if (existingUser) {
            return res.status(401).json("User Already Exist with this Email")
        }

        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(req.body.password, salt)

        const newUser = new User({
            nom: req.body.nom,
            prenom: req.body.prenom,
            email: req.body.email,
            img: req.body.img,
            password: hash,
        })

        await newUser.save()
        res.status(200).send(newUser)

    } catch (err) {
        return res.status(500).json({
            payload: "Error register user"
        })
    }
}

export const login = async (req, res, next) => {

    try {

        const user = await User.findOne({ email: req.body.email })
        if (!user) return res.status(401).json(
            { errors: [{ msg: "User Not Found" }] }
        )

        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password)
        if (!isPasswordCorrect) return res.status(401).json(
            { errors: [{ msg: "Email Or Password incorrect" }] }
        )

        const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT)

        res.cookie("access_token", token, { httpOnly: true }).status(200).json(user)

    } catch (err) {
        return res.status(500).json({
            payload: "Error register user"
        })
    }
}