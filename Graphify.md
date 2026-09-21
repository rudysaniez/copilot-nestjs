# Graphify

Source officielle : [Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify) (package PyPI : `graphifyy`)

## Qu'est-ce que c'est ?

Graphify est un outil open source (CLI + skill pour assistants IA) qui transforme une base de code (et sa documentation, ses schémas SQL, ses configs, ses PDF, images, vidéos...) en un **graphe de connaissances** interrogeable. Plutôt que de laisser un assistant de code (Claude Code, Cursor, Codex, Gemini CLI, GitHub Copilot, etc.) `grep`-er/relire des fichiers à chaque question, celui-ci interroge directement le graphe.

En pratique, on tape `/graphify .` dans son assistant IA, qui analyse tout le projet et produit :

```
graphify-out/
├── graph.html       # graphe interactif à ouvrir dans un navigateur (clic, filtre, recherche)
├── GRAPH_REPORT.md  # synthèse : concepts clés, connexions surprenantes, questions suggérées
└── graph.json       # le graphe complet, réinterrogeable sans jamais relire les fichiers sources
```

## À quoi ça sert (utilité)

- **Remplacer le grep/la lecture de fichiers par des requêtes sur un graphe.** L'assistant IA obtient une carte structurée du code au lieu de re-parcourir des fichiers à chaque question, ce qui économise du contexte/des tokens et accélère les réponses.
- **Analyse de code 100 % locale et déterministe.** Le parsing du code se fait via AST (tree-sitter, ~40 langages), sans LLM et sans rien envoyer à l'extérieur. Seule l'analyse sémantique optionnelle des docs/PDF/images/vidéos appelle un modèle (au choix : local via Ollama, ou API type OpenAI/Anthropic/Gemini/Azure/Bedrock).
- **Chaque lien est justifié et traçable.** Chaque relation (`calls`, `imports`, `inherits`, `mixes_in`, etc.) est taguée `EXTRACTED` (lue explicitement dans le code) ou `INFERRED` (déduite par résolution), pour distinguer le certain du déduit.
- **Ce n'est pas un index vectoriel.** Pas d'embeddings ni de vector store : un vrai graphe que l'on traverse (voisins, chemins, sous-graphes), pas une recherche par similarité approximative.
- **Détection de "god nodes" et de communautés.** Identifie les concepts les plus connectés et découpe le graphe en sous-systèmes (algorithme de Leiden), avec des libellés générés sans LLM.
- **Va au-delà du code.** Peut aussi intégrer la documentation, les PDF, images et vidéos/audio dans le même graphe, ainsi que des commentaires `# NOTE:`/`# WHY:` et des références ADR/RFC comme nœuds à part entière.
- **Requêtes en langage naturel.** Commandes comme `graphify query "<question>"`, `graphify path A B` (plus court chemin entre deux concepts) ou `graphify explain "<concept>"` pour interroger le graphe sans relire le code source.
- **Intégration large avec les assistants IA.** Skill officiel pour Claude Code, Cursor, Codex, Gemini CLI, GitHub Copilot CLI/VS Code, Aider, OpenCode, Trae, Kiro, Amp, et plus de 20 plateformes au total ; disponible aussi via un serveur MCP.
- **Mise à jour incrémentale.** Le graphe peut être rafraîchi à partir des diffs git plutôt que de tout ré-extraire à chaque fois.

## Exemple d'usage

```bash
# Installation du CLI
uv tool install graphifyy      # ou : pipx install graphifyy

# Enregistrement du skill auprès de l'assistant IA
graphify install
```

Puis, dans l'assistant IA :

```
/graphify .
```

Requêtes possibles une fois le graphe construit :

```text
$ graphify explain "APIRouter"
Node: APIRouter
  Source:    routing.py L2210
  Community: 2
  Degree:    47

Connections (47):
  --> RequestValidationError [uses] [INFERRED]
  --> Dependant [uses] [INFERRED]
  --> .get() [method] [EXTRACTED]
  <-- __init__.py [imports] [EXTRACTED]
  ...

$ graphify path "FastAPI" "ModelField"
Shortest path (3 hops):
  FastAPI --uses--> DefaultPlaceholder <--references-- get_request_handler() --references--> ModelField
```

## Benchmarks (annoncés par le projet)

| Benchmark | Métrique | graphify | Autres solutions |
|---|---|---|---|
| LOCOMO (n=300) | recall@10 | **0.497** | mem0 0.048, supermemory 0.149 |
| LOCOMO (n=300) | précision QA | 45.3% | supermemory 49.7%, mem0 27.3% |
| LongMemEval-S (n=50) | précision QA | **76%** | équivalent à un RAG dense classique |
| Construction du graphe | Crédits LLM utilisés | **0** | facturation par token pour la plupart des systèmes concurrents |

## Prérequis

- Python 3.10+
- `uv` (recommandé) ou `pipx` pour installer le package

## Liens utiles

- Dépôt GitHub : https://github.com/Graphify-Labs/graphify
- Package PyPI officiel : `graphifyy` (attention, `graphify` seul sur PyPI n'est pas affilié)
- Site : https://graphify.com / accès anticipé plateforme : https://app.graphify.com
