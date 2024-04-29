import User from "../models/User.js"
import bcrypt from "bcrypt"

export const updateUser = async (req, res, next) => {
    try {

        const { password, ...rest } = req.body;

        if (password) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            rest.password = hashedPassword;
        }

        const updatedUser = await User.findByIdAndUpdate(req.params.id, { $set: rest }, { new: true })
        res.status(200).json(updatedUser)

    } catch (err) {
        return res.status(500).json({
            payload: "Error"
        })
    }
}


export const deleteUser = async (req, res, next) => {
    try {
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json("User Has Been Deleted")
    } catch (err) {
        return res.status(500).json({
            payload: "Error"
        })
    }
}

export const getOneUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id)
        res.status(200).json(user)
    } catch (err) {
        return res.status(500).json({
            payload: "Error"
        })
    }
}

export const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find()
        res.status(200).json(users)
    } catch (err) {
        return res.status(500).json({
            payload: "Error"
        })
    }
}