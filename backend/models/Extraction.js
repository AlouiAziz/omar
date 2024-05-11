import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ExtractionSchema = new Schema({
    serverName: {
        type: String,
        required: true,
    },
    ipAddress: {
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
    FilesNumber: {
        type: Number,
        default: false
    },
    FilesSize: {
        type: String,
        required: true,
    },
    insertionDate: {
        type: Date,
        required: true,
        default: Date.now()
    }
});

export default mongoose.model("Extraction", ExtractionSchema);


