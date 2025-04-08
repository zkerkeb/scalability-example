const express = require('express');
const os = require('os');
const app = express();

// Informations sur le serveur
const serverInfo = {
  hostname: os.hostname(),
  platform: os.platform(),
  cpus: os.cpus().length,
  memory: Math.round(os.totalmem() / (1024 * 1024 * 1024)) + ' GB'
};

// Route principale
app.get('/', (req, res) => {
  res.json({
    message: 'Service web démo de scalabilité',
    serverInfo,
    timestamp: new Date().toISOString(),
    requestNumber: requestCount++
  });
});

// Route simulant une charge de travail
app.get('/work/:load', (req, res) => {
  const load = parseInt(req.params.load) || 100;
  const startTime = Date.now();
  
  // Simulation d'un calcul intensif
  let result = 0;
  for (let i = 0; i < load * 1000000; i++) {
    result += Math.random() * Math.random();
  }
  
  const duration = Date.now() - startTime;
  
  res.json({
    message: `Travail effectué avec charge: ${load}`,
    duration: `${duration} ms`,
    serverInfo,
    timestamp: new Date().toISOString(),
    requestNumber: requestCount++
  });
});

// Compteur global de requêtes
let requestCount = 0;

// Port d'écoute (utilise la variable d'environnement PORT ou 3000 par défaut)
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
  console.log(`Informations serveur: `, serverInfo);
});