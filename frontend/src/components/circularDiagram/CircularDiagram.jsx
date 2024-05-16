import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';

const CircularDiagram = ({ totalMemory, freeMemory, serverName, freeSpace, totalSpace }) => {

    const memoryChartRef = useRef(null);
    const spaceChartRef = useRef(null);
    let memoryChart = null;
    let spaceChart = null;

    // Calcul du pourcentage de mémoire libre
    const percentageFreeMemory = ((freeMemory / totalMemory) * 100).toFixed(2);
    const percentageFreeSpace = ((freeSpace / totalSpace) * 100).toFixed(2);

    const [i, setI] = useState(3);

    useEffect(() => {
        setI(i + 1);
        if (memoryChartRef && memoryChartRef.current) {
            if (memoryChart) {
                memoryChart.destroy(); // Détruire le graphique de mémoire existant s'il y en a un
            }
            const ctxMemory = memoryChartRef.current.getContext('2d');
            memoryChart = new Chart(ctxMemory, {
                type: 'doughnut',
                data: {
                    labels: [`Free Memory (${percentageFreeMemory}%)`, `Used Memory (${(100 - percentageFreeMemory).toFixed(2)}%)`],
                    datasets: [{
                        data: [freeMemory, totalMemory - freeMemory],
                        backgroundColor: ['blue', 'red'],
                        hoverOffset: i
                    }]
                },
            });
        }

        if (spaceChartRef && spaceChartRef.current) {
            if (spaceChart) {
                spaceChart.destroy(); // Détruire le graphique d'espace existant s'il y en a un
            }
            const ctxSpace = spaceChartRef.current.getContext('2d');
            spaceChart = new Chart(ctxSpace, {
                type: 'doughnut',
                data: {
                    labels: [`Free Space (${percentageFreeSpace}%)`, `Used Space (${(100 - percentageFreeSpace).toFixed(2)}%)`],
                    datasets: [{
                        data: [freeSpace, totalSpace - freeSpace],
                        backgroundColor: ['blue', 'red'],
                        hoverOffset: i
                    }]
                },
            });
        }
    }, [freeMemory, totalMemory, percentageFreeMemory, freeSpace, totalSpace, percentageFreeSpace]);

    return (

        <div className="cercle">
            <h1 className='cercleTitle'>{serverName}</h1>
            <div className='details'>
                <div className='chart-container'>
                    <canvas ref={memoryChartRef} width={'100%'} height={'100%'} />
                    <p>Il existe {freeMemory} libre de {totalMemory} mémoire totale ({percentageFreeMemory}% libre) </p>
                </div>
                <div className='chart-container'>
                    <canvas ref={spaceChartRef} width={'100%'} height={'100%'} />
                    <p>Il existe {freeSpace} libre de {totalSpace} espace total ({percentageFreeSpace}% libre) </p>
                </div>
            </div>
        </div>
    );

};

export default CircularDiagram;
