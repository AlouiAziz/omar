import Server from "../models/Server.js"

export const getAllServers = async (req, res, next) => {
    try {
        const servers = await Server.find()
        res.status(200).json(servers)
    } catch (err) {
        return res.status(500).json({
            payload: "Error"
        })
    }
}


export const getServers = async (req, res, next) => {
    try {
        const serverNames = req.query.serverNames.split(',').map(name => name.trim());
    
        // Recherche des serveurs avec les noms spécifiés
        const servers = await Server.find({ serverName: { $in: serverNames } });
    
        res.json(servers);
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            error: "Server error"
        });
    }
}

