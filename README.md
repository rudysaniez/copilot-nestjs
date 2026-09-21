# copilot-nestjs

Projet [NestJS](https://nestjs.com/).

## Prérequis

- Node.js (v20+ recommandé)
- npm
- Une instance PostgreSQL (par exemple via Docker) démarrée localement, avec une base de données nommée `workDB`

## Base de données

L'API se connecte à une base PostgreSQL locale (ex: conteneur Docker). Elle contient une table `todos` (`id` technique auto-incrémenté + `todo` varchar(255)), créée/synchronisée automatiquement au démarrage (mode dev) via TypeORM.

Copiez `.env.example` en `.env` et adaptez les valeurs à votre instance PostgreSQL :

```bash
cp .env.example .env
```

```env
PORT=3000

DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=workDB
```

Si la base `workDB` n'existe pas encore sur votre instance PostgreSQL, créez-la, par exemple :

```bash
docker exec -e PGPASSWORD='<votre_mot_de_passe>' <nom_du_conteneur> psql -h localhost -U <votre_utilisateur> -d postgres -c 'CREATE DATABASE "workDB";'
```

## Installation

```bash
npm install --legacy-peer-deps
```

> Le flag `--legacy-peer-deps` est nécessaire pour contourner un bug connu de npm (arborist) avec la résolution des dépendances peer de ce projet.

## Démarrage

> Assurez-vous que PostgreSQL est démarré et accessible (voir section "Base de données") avant de lancer l'application.

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

### Endpoints Todos

| Méthode | URL           | Description                     |
|---------|---------------|----------------------------------|
| POST    | `/todos`      | Créer un todo (`{ "todo": "..." }`) |
| GET     | `/todos`      | Lister tous les todos           |
| GET     | `/todos/:id`  | Récupérer un todo par id        |
| PATCH   | `/todos/:id`  | Mettre à jour un todo           |
| DELETE  | `/todos/:id`  | Supprimer un todo               |

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
