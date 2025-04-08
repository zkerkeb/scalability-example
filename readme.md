# Démo de Scalabilité pour Web Services

Cette démonstration illustre les concepts de scalabilité pour un service web Node.js dans le cadre d'un cours sur les web services.

## Prérequis

- Node.js (v14 ou supérieur)
- npm ou yarn
- PM2 (pour la démo avec PM2): `npm install -g pm2`

## Installation

1. Cloner ce dépôt ou télécharger les fichiers
2. Installer les dépendances :
   ```
   npm install
   ```

## Architecture de la Démo

Cette démo comporte trois approches de scalabilité différentes :

1. **Application Node.js simple** : Exécution mono-processus
2. **Node.js Cluster** : Utilisation native du module Cluster de Node.js
3. **PM2** : Gestionnaire de processus avancé pour Node.js

## Comment Démarrer la Démo

### 1. Serveur simple (mode mono-processus)

```
npm start
```

Accédez à `http://localhost:3000` pour voir le serveur en action.

### 2. Mode Cluster (multi-processus)

```
npm run start:cluster
```

Cela démarrera un processus Node.js par CPU disponible.

### 3. Mode PM2 (gestionnaire de processus avancé)

```
npm install -g pm2  # Si PM2 n'est pas déjà installé
npm run start:pm2
```

Commandes PM2 utiles :
- `pm2 list` - Afficher tous les processus
- `pm2 monit` - Moniteur en temps réel
- `pm2 logs` - Afficher les logs
- `pm2 stop all` - Arrêter tous les processus
- `pm2 delete all` - Supprimer tous les processus

## Tests de Charge

Pour démontrer la différence entre les modes d'exécution, vous pouvez utiliser le script de test de charge inclus :

```
npm run test:load
```

Vous pouvez également spécifier l'URL à tester :

```
npm run test:load -- http://localhost:3000/work/5
```

Le paramètre après "/work/" contrôle l'intensité de la charge (1-10 recommandé).

## Démonstration en Cours

Pour une démonstration efficace en cours :

1. Commencez par exécuter l'application en mode mono-processus
2. Lancez un test de charge et notez les performances
3. Arrêtez l'application et redémarrez-la en mode cluster
4. Relancez le même test de charge et comparez les résultats
5. Montrez la résilience en arrêtant manuellement l'un des processus worker

## Points Clés à Expliquer

- **Scalabilité verticale vs horizontale** : Cette démo illustre principalement la scalabilité verticale (utilisation optimale des ressources d'une seule machine)
- **Équilibrage de charge** : Le module cluster de Node.js utilise un équilibreur de charge round-robin intégré
- **Résilience** : Comment le système se rétablit après l'échec d'un processus
- **Utilisation du CPU** : Observer comment les différents cœurs du CPU sont utilisés dans chaque mode

## Extensions Possibles

- Ajouter Docker pour démontrer la conteneurisation
- Configurer Nginx comme équilibreur de charge frontal
- Implémenter une version distribuée avec plusieurs serveurs physiques/virtuels
- Ajouter une base de données avec réplication pour démontrer la scalabilité des données