import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/sidebar/Sidebar.jsx';
import Navbar from "../../components/navbar/Navbar";
import './Servers.css';
import Cercle from '../../components/cercle/Cercle.jsx';
import useFetch from '../../hooks/useFetch.js';
import { useSelector } from 'react-redux';


const Servers = () => {

    const initialUrl = useSelector((state) => {
        const user = state.auth.user;
        const servers = user?.privilege.split(';');
        return user?.SuperAdmin === true ? '/servers' : `/servers/find?serverNames=${servers.join(',')}`;
      });
      
      // State to manage the URL
      const [url, setUrl] = useState(initialUrl);
      
      const [selectedServer, setSelectedServer] = useState(); // State for selected server
      const [open, setOpen] = useState(false); // State for modal/dialog visibility
      const { data, loading, error } = useFetch(url); // Fetch data based on the URL
      

    // Tableau pour stocker les serveurs uniques
    const [uniqueServers, setUniqueServers] = useState([]);

    useEffect(() => {
        if (data) {
            const latestDates = {};
            data.forEach(item => {
                const { serverName, insertionDate } = item;
                const currentDate = new Date(insertionDate);
                if (!(serverName in latestDates) || currentDate > latestDates[serverName]) {
                    latestDates[serverName] = currentDate;
                }
            });

            // Filtrer les données pour obtenir les serveurs uniques avec les dates les plus récentes
            const filteredServers = data.filter(item => {
                const currentDate = new Date(item.insertionDate);
                return currentDate.getTime() === latestDates[item.serverName].getTime();
            });

            setUniqueServers(filteredServers);
        }
    }, [data]);

    return (
        <div>
            <Navbar />
            <div className="home">
                <Sidebar />
                <div className="homeContainer">
                    <h1 style={{ textAlign: 'center' }}>Servers</h1>
                    <div className='serversList'>
                        {uniqueServers.map(server => (
                            <div style={{ width: '18rem', marginTop: 50 }} key={server._id}>
                                <div className='card'>
                                    <h5 className='App'>{server.serverName}</h5>
                                    <p>Date : {new Date(server.insertionDate).toLocaleString()}</p>
                                    <p>Mémoire Totale : {server.totalMemory}</p>
                                    <p>Mémoire Libre : {server.freeMemory}</p>
                                    <p>Pourcentage Libre : {((server?.freeMemory / server?.totalMemory) * 100).toFixed(2)} %</p>
                                    <p>Stockage Totale : {server.totalSpace}</p>
                                    <p>Stockage Libre : {server.freeSpace}</p>
                                    <p>Pourcentage Libre CPU : {((server?.freeSpace / server?.totalSpace) * 100).toFixed(2)} %</p>
                                    {open && selectedServer._id === server._id && (
                                        <div className="modal">
                                            <div className="modal-content">
                                                <Cercle
                                                    totalMemory={server?.totalMemory}
                                                    freeMemory={server?.freeMemory}
                                                    serverName={server?.serverName}
                                                    freeSpace={server?.freeSpace}
                                                    totalSpace={server?.totalSpace} />
                                                <button onClick={() => setOpen(false)}>close</button>
                                            </div>
                                        </div>
                                    )}
                                    <button onClick={() => { setOpen(true); setSelectedServer(server); }}>Voir Détails</button>
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
