import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ConfigurationSchema = new Schema({
    serverName: {
        type: String,
        required: true,
    },
    ipAddress: {
        type: String,
        required: true,
    },
    signalMemory: {
        type: String,
        required: true,
    },
    thresholdMomory: {
        type: String,
        required: true,
    },
    signalSpace: {
        type: String,
        required: true,
    },
    thresholdSpace: {
        type: String,
        default: false
    },
    signalfilesNumber: {
        type: Number,
        default: false
    },
    MaxFilesNumber: {
        type: Number,
        default: false
    },
    SignalFilesSize: {
        type: String,
        required: true,
    },
    MaxFileSize: {
        type: String,
        required: true,
    }
});

export default mongoose.model("Configuration", ConfigurationSchema);


