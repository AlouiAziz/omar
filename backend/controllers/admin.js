import Admin from "../models/Admin.js"
import bcrypt from "bcrypt"

export const createAdmin = async (req, res, next) => {

    try {

        const existingAdmin = await Admin.findOne({ email: req.body.email })
        if (existingAdmin) {
            return res.status(401).json("Admin Already Exist with this Email")
        }

        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(req.body.password, salt)

        const newAdmin = new Admin({
            nom: req.body.nom,
            prenom: req.body.prenom,
            email: req.body.email,
            img: req.body.img,
            password: hash,
            privilege: req.body.privilege,
        })

        await newAdmin.save()
        res.status(200).send(newAdmin)

    } catch (err) {
        return res.status(500).json({
            payload: "Error register Admin"
        })
    }
}

export const updateAdmin = async (req, res, next) => {
    try {
        const updatedAdmin = await Admin.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        res.status(200).json(updatedAdmin)
    } catch (err) {
        return res.status(500).json({
            payload: "Error"
        })
    }
}

export const deleteAdmin = async (req, res, next) => {
    try {
        await Admin.findByIdAndDelete(req.params.id)
        res.status(200).json("Admin Has Been Deleted")
    } catch (err) {
        return res.status(500).json({
            payload: "Error"
        })
    }
}

export const getOneAdmin = async (req, res, next) => {
    try {
        const admin = await Admin.findById(req.params.id);
        res.status(200).json(admin);
    } catch (err) {
        return res.status(500).json({
            payload: "Error"
        });
    }
}

export const getAllAdmins = async (req, res, next) => {
    try {
        const admins = await Admin.find().populate({ path: 'users', select: 'nom prenom' });
        res.status(200).json(admins);
    } catch (err) {
        return res.status(500).json({
            payload: "Error"
        });
    }
};
