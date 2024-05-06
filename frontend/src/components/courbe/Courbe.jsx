import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import useFetch from '../../hooks/useFetch.js'

const Courbe = () => {

  const { data, loading, error } = useFetch(`/servers`)

  const chartRef = useRef(null);
  const chartInstance = useRef(null); // Référence pour le graphique

  useEffect(() => {
    // Organiser les données par serverName et trier par date
    const organizedData = data.reduce((acc, curr) => {
      const key = curr.serverName;
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(curr);
      return acc;
    }, {});

    // Préparer les labels (dates) et les données pour chaque serverName
    const labels = [];
    const datasets = Object.entries(organizedData).map(([serverName, serverData]) => {
      serverData.sort((a, b) => new Date(a.insertionDate.$date) - new Date(b.insertionDate));
      labels.push(...serverData.map(item => new Date(item.insertionDate).toLocaleString()));
      return {
        label: serverName,
        data: serverData.map(item => item.freeMemory),
        fill: false,
        borderColor: '#' + Math.floor(Math.random() * 16777215).toString(16), // Couleur aléatoire
      };
    });

    // Détruire le graphique existant s'il y en a un
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    // Créer le nouveau graphique
    const ctx = chartRef.current.getContext('2d');
    chartInstance.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: datasets,
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Évolution de la mémoire libre par server en fonction de temps',
          },
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Date',
            },
          },
          y: {
            title: {
              display: true,
              text: 'Free Memory',
            },
          },
        },
      },
    });
  }, [data]);


  return (
    <div className="App">
      <canvas ref={chartRef}></canvas>
    </div>
  )
};

export default Courbe;
