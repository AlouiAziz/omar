import User from "../models/User.js"
import bcrypt from "bcrypt"

export const updateUser = async (req, res, next) => {
    try {
        if (req.body.password) {
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(req.body.password, salt);
            req.body.password = hash; // Mettez à jour le mot de passe hashé dans la demande.
        }

        const { password, ...rest } = req.body; // Exclure le mot de passe du reste des données.

        const updatedUser = await User.findByIdAndUpdate(req.params.id, { $set: rest }, { new: true });
        res.status(200).json(updatedUser);

    } catch (err) {
        return res.status(500).json({
            error: "Erreur lors de la mise à jour de l'utilisateur."
        });
    }
};



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