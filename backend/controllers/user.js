import Admin from "../models/Admin.js"
import User from "../models/User.js"
import bcrypt from "bcrypt"

export const createUser = async (req, res, next) => {
    try {
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(401).json("User Already Exists with this Email");
        }

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const newUser = new User({
            nom: req.body.nom,
            prenom: req.body.prenom,
            email: req.body.email,
            img: req.body.img,
            password: hash,
            privilege: req.body.privilege,
            admin: req.body.admin
        });

        await newUser.save();

        await Admin.findByIdAndUpdate(req.body.admin, { $push: { users: newUser._id } });

        res.status(200).send(newUser);

    } catch (err) {
        return res.status(500).json({
            payload: "Error"
        })
    }
};

export const updateUser = async (req, res, next) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
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

export const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find().populate("admin", "nom prenom")
        res.status(200).json(users)
    } catch (err) {
        return res.status(500).json({
            payload: "Error"
        })
    }
}