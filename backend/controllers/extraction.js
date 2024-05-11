import Extraction from "../models/Extraction.js"

export const getAllExtractions = async (req, res, next) => {
    try {
        const extractions = await Extraction.find()
        res.status(200).json(extractions)
    } catch (err) {
        return res.status(500).json({
            payload: "Error"
        })
    }
}

export const getExtractions = async (req, res, next) => {
    try {
        const serverNames = req.query.serverNames.split(',').map(name => name.trim());

        const extractions = await Extraction.find({ serverName: { $in: serverNames } });

        res.json(extractions);
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            error: "Server error"
        });
    }
}

