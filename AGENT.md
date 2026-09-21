# AGENT.md — todos-api

Ce fichier donne à un assistant IA (agent de code) le contexte nécessaire pour travailler efficacement sur ce projet.

## Résumé du projet

API REST NestJS (`todos-api`) exposant un CRUD de todos, persistés dans une base PostgreSQL (`workDB`, table `todos`), avec documentation OpenAPI v3 (Swagger) et CORS ouvert.

## Stack technique

- **Framework** : NestJS 12 (TypeScript, modules ESM — chaque import relatif se termine par `.js`, ex: `./todos.service.js`)
- **Base de données** : PostgreSQL via TypeORM (`@nestjs/typeorm`), connexion configurée par variables d'environnement (`@nestjs/config`)
- **Validation** : `class-validator` / `class-transformer`, `ValidationPipe` global (`whitelist: true, transform: true`)
- **Documentation API** : `@nestjs/swagger` (UI sur `/api`, JSON sur `/api-json`)
- **Tests** : Vitest (unitaires + e2e)
- **Lint / format** : oxlint, prettier

## Prérequis

- Node.js v20+
- npm
- Une instance PostgreSQL locale (ex: Docker) avec une base `workDB` accessible

## Installation

```bash
npm install --legacy-peer-deps
```

> `--legacy-peer-deps` est nécessaire pour contourner un bug npm/arborist avec la résolution des peer dependencies de ce projet.

## Configuration

Copier `.env.example` en `.env` et adapter les valeurs de connexion PostgreSQL :

```env
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=workDB
```

En dev, `synchronize` est activé (le schéma TypeORM est créé/mis à jour automatiquement à partir des entités). En production (`NODE_ENV=production`), `synchronize` est désactivé — prévoir des migrations si besoin.

## Commandes utiles

| Commande | Description |
|---|---|
| `npm run start:dev` | Démarrage en mode watch (dev) |
| `npm run start` | Démarrage normal |
| `npm run start:debug` | Démarrage avec debugger |
| `npm run build` | Build TypeScript (`dist/`) |
| `npm run start:prod` | Démarrage du build (`dist/main.js`) |
| `npm run test` | Tests unitaires (Vitest) |
| `npm run test:watch` | Tests unitaires en watch |
| `npm run test:cov` | Couverture de code |
| `npm run test:e2e` | Tests end-to-end |
| `npm run lint` | Lint (oxlint) |
| `npm run format` | Formatage (prettier) |
| `npm run openapi:generate` | Build + démarrage temporaire + génération de `openapi.json` |

## Architecture du code

```
src/
├── main.ts              # bootstrap Nest, CORS (*), ValidationPipe, Swagger (/api, /api-json)
├── app.module.ts         # ConfigModule (global) + TypeOrmModule (PostgreSQL) + TodosModule
├── app.controller.ts     # route racine GET / ("Hello World!")
├── app.service.ts
└── todos/
    ├── todos.module.ts
    ├── todos.controller.ts   # routes REST /todos (CRUD complet)
    ├── todos.service.ts      # logique métier, accès au repository TypeORM
    ├── entities/todo.entity.ts   # entité TypeORM (table `todos`)
    └── dto/
        ├── create-todo.dto.ts   # validation à la création
        └── update-todo.dto.ts   # PartialType(CreateTodoDto) pour le PATCH
```

## Modèle de données — table `todos`

| Colonne    | Type          | Détails                              |
|------------|---------------|----------------------------------------|
| `id`       | `int` (auto)  | clé primaire auto-incrémentée         |
| `todo`     | `varchar(255)`| libellé, obligatoire                  |
| `complete` | `boolean`     | terminé ou non, défaut `false`, optionnel à la création |

## Endpoints

| Méthode | URL           | Description                              |
|---------|---------------|-------------------------------------------|
| POST    | `/todos`      | Créer un todo (`{ "todo": "...", "complete": false }`) |
| GET     | `/todos`      | Lister tous les todos                     |
| GET     | `/todos/:id`  | Récupérer un todo par id                  |
| PATCH   | `/todos/:id`  | Mettre à jour un todo (partiel)           |
| DELETE  | `/todos/:id`  | Supprimer un todo                         |

Exemples curl détaillés : voir `README.md`.

## Conventions à respecter

- Imports relatifs internes avec extension `.js` (obligatoire en ESM Node, même en TypeScript) : `import { Todo } from './entities/todo.entity.js';`
- Un DTO de création par ressource (`CreateXxxDto`) avec validations `class-validator`, et un DTO de mise à jour dérivé via `PartialType` (`@nestjs/swagger`, pas `@nestjs/mapped-types`, pour conserver les métadonnées OpenAPI).
- Décorer les entités et DTOs avec `@ApiProperty`/`@ApiPropertyOptional` pour garder le contrat OpenAPI à jour.
- Décorer les contrôleurs avec `@ApiTags`, `@ApiOperation`, `@ApiOkResponse`/`@ApiCreatedResponse`/`@ApiNoContentResponse`/`@ApiNotFoundResponse`.
- `NotFoundException` levée par le service quand une ressource n'existe pas (pas de vérification dans le contrôleur).
- Le `.env` réel (avec les vrais identifiants) n'est jamais commité (`.gitignore`) ; seul `.env.example` sert de modèle.
- Après toute modification des DTOs/entités/contrôleurs impactant l'API publique, régénérer `openapi.json` via `npm run openapi:generate`.
- Le dossier `graphify-out/` (graphe de connaissances généré par l'outil Graphify) est ignoré par git — voir `Graphify.md`.

## Vérifications avant de considérer une tâche terminée

1. `npm run build` passe sans erreur.
2. `npm run test` (et `npm run test:e2e` si la base est accessible) passent.
3. Si un endpoint ou un DTO a changé, `npm run openapi:generate` a été relancé.
4. Le README est mis à jour si le comportement documenté change (endpoints, config, etc.).
