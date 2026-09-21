# copilot-nestjs

Projet [NestJS](https://nestjs.com/).

## Prérequis

- Node.js (v20+ recommandé)
- npm

## Installation

```bash
npm install --legacy-peer-deps
```

> Le flag `--legacy-peer-deps` est nécessaire pour contourner un bug connu de npm (arborist) avec la résolution des dépendances peer de ce projet.

## Démarrage

### Mode développement (watch, recompilation automatique)

```bash
npm run start:dev
```

### Mode normal

```bash
npm run start
```

### Mode debug

```bash
npm run start:debug
```

### Build + démarrage en production

```bash
npm run build
npm run start:prod
```

Une fois démarrée, l'application écoute par défaut sur [http://localhost:3000](http://localhost:3000) (route `GET /` renvoie `Hello World!`).

## Tests

```bash
# Tests unitaires
npm run test

# Tests unitaires en mode watch
npm run test:watch

# Couverture de code
npm run test:cov

# Tests end-to-end
npm run test:e2e
```

## Lint & format

```bash
npm run lint
npm run format
```
