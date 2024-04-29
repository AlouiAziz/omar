import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    nom: {
        type: String,
        required: true,
    },
    prenom: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    SuperAdmin: {
        type: Boolean,
        default: false
    },
    privilege: {
        type: String,
        required: true,
        default: 'fn1;fn2;fn5'
    },
    img: {
        type: String
    }
});

export default mongoose.model("User", UserSchema);