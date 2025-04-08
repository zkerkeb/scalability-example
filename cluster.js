const cluster = require('cluster');
const os = require('os');
const numCPUs = os.cpus().length;

// Si ce processus est le processus principal
if (cluster.isMaster) {
  console.log(`Processus principal ${process.pid} est en cours d'exécution`);
  console.log(`Nombre de CPUs disponibles: ${numCPUs}`);

  // Créer des workers (un par CPU)
  for (let i = 0; i < numCPUs; i++) {
    const worker = cluster.fork();
    console.log(`Worker ${worker.process.pid} démarré`);
  }

  // Log lorsqu'un worker se termine
  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} terminé avec code: ${code} et signal: ${signal}`);
    console.log('Démarrage d\'un nouveau worker...');
    cluster.fork(); // Redémarrer un nouveau worker
  });
} else {
  // Les workers exécutent l'application
  require('./app.js');
  console.log(`Worker ${process.pid} démarré`);
}