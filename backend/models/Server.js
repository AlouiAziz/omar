import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ServerSchema = new Schema({
    serverName: {
        type: String,
        required: true,
    },
    osType: {
        type: String,
        required: true,
    },
    totalMemory: {
        type: Number,
        required: true,
    },
    freeMemory: {
        type: Number,
        required: true,
    },
    totalSpace: {
        type: Number,
        default: false
    },
    freeSpace: {
        type: Number,
        default: false
    },
    insertionDate: {
        type: Date,
        required: true,
        default: Date.now()
    }
});

export default mongoose.model("Server", ServerSchema);


