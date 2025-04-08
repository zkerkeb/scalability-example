module.exports = {
    apps: [
      {
        name: 'demo-scalabilite',
        script: 'app.js',
        instances: 'max', // utiliser le maximum de CPUs disponibles
        exec_mode: 'cluster', // mode cluster pour la scalabilité
        watch: true, // redémarrer en cas de modification de fichiers
        env: {
          NODE_ENV: 'development',
        },
        env_production: {
          NODE_ENV: 'production',
        }
      }
    ]
  };