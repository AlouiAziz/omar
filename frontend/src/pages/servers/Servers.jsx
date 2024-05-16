import React, { useEffect, useState } from 'react';
import './Servers.css';
import Navbar from "../../components/navbar/Navbar";
import Sidebar from '../../components/sidebar/Sidebar.jsx';
import CircularDiagram from '../../components/circularDiagram/CircularDiagram.jsx';
import { useSelector } from 'react-redux';
import useFetch from '../../hooks/useFetch.js';
import axios from 'axios';

const Servers = () => {


    // Local States
    const [selectedServer, setSelectedServer] = useState();
    const [open, setOpen] = useState(false);

    // Importer le user from react redux authSlice
    const user = useSelector((state) => state.auth.user);

    // Fetcher les extraction à partir de privilège de l'utilisateur
    let privilege = [];
    if (user?.type === "user") {
        privilege = user?.user?.privilege.split(';');
    } else if (user?.admin) {
        privilege = user?.admin?.privilege.split(';');
    }

    let url = ''

    if (user?.type === "superAdmin") { url = `/extractions` }
    else { url = `/extractions/find?serverNames=${privilege.join(',')}` }

    const { data, loading, error } = useFetch(url);


    // Initialiser un tableau vide qui va contenir les serveurs aprés filtrage
    const [servers, setServers] = useState([]);


    useEffect(() => {

        const fetchServers = async () => {
            if (data) {

                // Extraire le dernier mise à jour pour chaque serverName : Dernier date d'insertion
                const latestDates = {};
                data.forEach((item) => {
                    const { serverName, insertionDate } = item;
                    const currentDate = new Date(insertionDate);
                    if (!(serverName in latestDates) || currentDate > latestDates[serverName]) {
                        latestDates[serverName] = currentDate;
                    }
                });
                const filteredServers = data.filter((item) => {
                    const currentDate = new Date(item.insertionDate);
                    return currentDate.getTime() === latestDates[item.serverName].getTime();
                });

                // Importer la configuration de chaque serveur
                const fetchedServers = await Promise.all(
                    filteredServers.map(async (extraction) => {
                        const serverConfig = await axios.get(`/configurations?serverName=${extraction?.serverName}`);
                        return { extraction, config: serverConfig?.data[0] };
                    })
                );

                setServers(fetchedServers);
            }
        };

        fetchServers();
    }, [data]);


    const color = (n, sn, mn) => {
        if (n >= sn && n < mn) {
            return "orange";
        } else if (n >= mn) {
            return "rouge";
        } else {
            return "vert";
        }
    };

    const renderServerColor = (server) => {
        let serverColor = "vert";

        if (
            color(server?.extraction.FilesNumber, server?.config.signalfilesNumber, server?.config.MaxFilesNumber) === "rouge" || color(
                100 - ((server?.extraction?.freeMemory / server?.extraction?.totalMemory) * 100).toFixed(4),
                parseFloat(server?.config?.signalMemory?.replace(/[^0-9]/g, '')),
                parseFloat(server?.config?.thresholdMemory?.replace(/[^0-9]/g, ''))
            ) === "rouge" || color(
                100 - ((server?.extraction?.freeSpace / server?.extraction?.totalSpace) * 100).toFixed(4),
                parseFloat(server?.config?.signalSpace?.replace(/[^0-9]/g, '')),
                parseFloat(server?.config?.thresholdSpace?.replace(/[^0-9]/g, ''))
            ) === "rouge" || color(
                parseFloat(server?.extraction?.fileSize?.replace(/[^0-9]/g, '')),
                parseFloat(server?.config?.signalFileSize?.replace(/[^0-9]/g, '')),
                parseFloat(server?.config?.maxFileSize?.replace(/[^0-9]/g, ''))
            ) === "rouge"
        ) {
            serverColor = "rouge";
        } else if (
            color(
                100 - ((server?.extraction?.freeMemory / server?.extraction?.totalMemory) * 100).toFixed(4),
                parseFloat(server?.config?.signalMemory?.replace(/[^0-9]/g, '')),
                parseFloat(server?.config?.thresholdMemory?.replace(/[^0-9]/g, ''))
            ) === "orange" ||
            color(
                100 - ((server?.extraction?.freeSpace / server?.extraction?.totalSpace) * 100).toFixed(4),
                parseFloat(server?.config?.signalSpace?.replace(/[^0-9]/g, '')),
                parseFloat(server?.config?.thresholdSpace?.replace(/[^0-9]/g, ''))
            ) === "orange" ||
            color(server?.extraction?.FilesNumber, server?.config?.signalFilesNumber, server?.config?.maxFilesNumber) === "orange" ||
            color(
                parseFloat(server?.extraction?.fileSize?.replace(/[^0-9]/g, '')),
                parseFloat(server?.config?.signalFileSize?.replace(/[^0-9]/g, '')),
                parseFloat(server?.config?.maxFileSize?.replace(/[^0-9]/g, ''))
            ) === "orange"
        ) {
            serverColor = "orange";
        }

        return serverColor;
    };


    return (

        <div>
            <Navbar />
            <div className="home">
                <Sidebar />
                <div className="homeContainer">
                    <h1 style={{ textAlign: 'center' }}>Servers</h1>
                    <div className='serversList'>



                        {servers.map(server => (

                            <div style={{ width: '18rem', marginTop: 50, border: "2px solid black", padding: 20 }} key={server.extraction._id}>
                                <div className='card'>

                                    <div className="cardTop">
                                        <div className="status">
                                            <h1 className={renderServerColor(server)}>.</h1>
                                            <h2 className={renderServerColor(server)}>{server?.extraction?.serverName}</h2>
                                        </div>
                                        <h4 >@{server?.extraction.ipAddress}</h4>
                                        <p>Date : {new Date(server?.extraction.insertionDate).toLocaleString()}</p>
                                    </div>

                                    <p style={{ marginTop: 20 }} className={color((100 - ((server?.extraction.freeMemory / server?.extraction.totalMemory) * 100).toFixed(4)), parseFloat(server?.config.signalMemory.replace(/[^0-9]/g, '')),
                                        parseFloat(server?.config.thresholdMomory.replace(/[^0-9]/g, '')))}>Mémoire Libre : {server?.extraction.freeMemory}</p>

                                    <p className={color((100 - ((server?.extraction.freeMemory / server?.extraction.totalMemory) * 100).toFixed(4)), parseFloat(server?.config.signalMemory.replace(/[^0-9]/g, '')),
                                        parseFloat(server?.config.thresholdMomory.replace(/[^0-9]/g, '')))}>Mémoire utilisé : {(100 - ((server?.extraction.freeMemory / server?.extraction.totalMemory) * 100)).toFixed(2)} %</p>




                                    <p className={color((100 - ((server?.extraction.freeSpace / server?.extraction.totalSpace) * 100).toFixed(4)), parseFloat(server?.config.signalSpace.replace(/[^0-9]/g, '')),
                                        parseFloat(server?.config.thresholdSpace.replace(/[^0-9]/g, '')))}>Stockage Libre : {server?.extraction.freeSpace}</p>

                                    <p className={color((100 - ((server?.extraction.freeSpace / server?.extraction.totalSpace) * 100).toFixed(4)), parseFloat(server?.config.signalSpace.replace(/[^0-9]/g, '')),
                                        parseFloat(server?.config.thresholdSpace.replace(/[^0-9]/g, '')))}>Stockage utilisé : {(100 - ((server?.extraction.freeSpace / server?.extraction.totalSpace) * 100)).toFixed(2)} %</p>




                                    <p className={color(server?.extraction.FilesNumber, server?.config.signalfilesNumber, server?.config.MaxFilesNumber)} >
                                        FilesNumber : {server?.extraction.FilesNumber} Files
                                    </p>

                                    <p className={color(parseFloat(server?.extraction.Filessize.replace(/[^0-9]/g, '')), parseFloat(server?.config.SignalFilesSize.replace(/[^0-9]/g, '')), parseFloat(server?.config.MaxFileSize.replace(/[^0-9]/g, '')))} >
                                        Files Size : {server?.extraction.Filessize}
                                    </p>


                                    <button onClick={() => { setOpen(true); setSelectedServer(server); }}>Voir Détails</button>

                                    {open && selectedServer.extraction._id === server.extraction._id && (
                                        <div className="modal">
                                            <div className="modal-content">
                                                <CircularDiagram
                                                    totalMemory={server?.extraction.totalMemory}
                                                    freeMemory={server?.extraction.freeMemory}
                                                    serverName={server?.extraction.serverName}
                                                    freeSpace={server?.extraction.freeSpace}
                                                    totalSpace={server?.extraction.totalSpace} />
                                                <button onClick={() => setOpen(false)}>close</button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Servers;
