import User from "../models/User.js"
import Admin from "../models/Admin.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const login = async (req, res, next) => {
    try {

        if (req.body.email === process.env.SuperAdmin && req.body.password === process.env.password) {
            return res.json("superAdmin");


        } else {

            // Recherche dans la collection 'user'
            const user = await User.findOne({ email: req.body.email });
            if (user) {
                const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
                if (isPasswordCorrect) {
                    const token = jwt.sign({ id: user._id }, process.env.JWT);
                    res.cookie("access_token", token, { httpOnly: true }).status(200).json({ user, type: "user" });
                    return;
                }
            }

            // Recherche dans la collection 'admin'
            const admin = await Admin.findOne({ email: req.body.email });
            if (admin) {
                const isPasswordCorrect = await bcrypt.compare(req.body.password, admin.password);
                if (isPasswordCorrect) {
                    const token = jwt.sign({ id: admin._id }, process.env.JWT);
                    res.cookie("access_token", token, { httpOnly: true }).status(200).json({ admin, type: "admin" });
                    return;
                }
            }

            // Si ni 'user' ni 'admin' n'ont été trouvés
            return res.status(401).json({ errors: [{ msg: "Email or password incorrect" }] });
        }

    } catch (err) {
        return res.status(500).json({ payload: "Error" });
    }
}