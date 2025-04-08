// Import du module autocannon pour les tests de charge
const autocannon = require('autocannon');
// Import du module PassThrough pour la gestion des flux de données
const { PassThrough } = require('stream');

// Fonction principale qui exécute le test de charge sur l'URL spécifiée
function run(url) {
  // Création d'un buffer pour stocker les résultats
  const buf = [];
  // Création d'un flux de sortie pour capturer les résultats
  const outputStream = new PassThrough();

  // Configuration et démarrage du test de charge avec autocannon
  const instance = autocannon({
    url,                // L'URL à tester
    connections: 100,   // Nombre de connexions simultanées à établir
    duration: 30,       // Durée du test en secondes
    pipelining: 1,      // Nombre de requêtes par connexion (pas de pipelining ici)
  });

  // Suivi de la progression du test avec affichage dans le flux de sortie
  autocannon.track(instance, { outputStream });

  // Capture des données de sortie dans le buffer
  outputStream.on('data', data => buf.push(data));
  // Affichage des résultats complets une fois le test terminé
  instance.on('done', () => {
    process.stdout.write(Buffer.concat(buf));
  });

  // Gestion de l'interruption du test avec CTRL+C (signal SIGINT)
  process.once('SIGINT', () => {
    instance.stop();
  });
}

// Affichage d'un en-tête pour le test
console.log('Tests de charge pour démonstration de scalabilité');
console.log('-------------------------------------------');

// Récupération de l'URL à tester depuis les arguments ou utilisation de l'URL par défaut
const testUrl = process.argv[2] || 'http://localhost:3000/work/1';
console.log(`Lancement du test sur: ${testUrl}`);

// Exécution du test de charge
run(testUrl);