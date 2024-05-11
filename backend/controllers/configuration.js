import Configuration from "../models/Configuration.js"

export const getConfiguration = async (req, res, next) => {
    try {
        const configuration = await Configuration.find({ serverName: req.query.serverName })
        res.status(200).json(configuration)
    } catch (err) {
        return res.status(500).json({
            payload: "Error"
        })
    }
}