# Graph Report - copilot-nestjs  (2026-09-21)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 193 nodes · 278 edges · 12 communities
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 6 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `a1a57387`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Community 0
- Community 1
- Community 2
- Community 3
- Community 4
- Community 5
- Community 6
- Community 7
- Community 8
- Community 9
- Community 10
- Community 11

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 19 edges
2. `Todo` - 18 edges
3. `scripts` - 15 edges
4. `TodosService` - 11 edges
5. `TodosController` - 10 edges
6. `CreateTodoDto` - 10 edges
7. `@nestjs/common` - 9 edges
8. `AppService` - 7 edges
9. `AppController` - 6 edges
10. `@nestjs/swagger` - 6 edges

## Surprising Connections (you probably didn't know these)
- None detected - all connections are within the same source files.

## Import Cycles
- None detected.

## Communities (12 total, 0 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.10
Nodes (24): ApiCreatedResponse, ApiNoContentResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiTags, Body (+16 more)

### Community 1 - "Community 1"
Cohesion: 0.07
Nodes (29): author, description, license, name, private, type, version, class-transformer (+21 more)

### Community 2 - "Community 2"
Cohesion: 0.16
Nodes (15): IsNotEmpty, IsString, MaxLength, @nestjs/common, @nestjs/core, @nestjs/swagger, @nestjs/typeorm, typeorm (+7 more)

### Community 3 - "Community 3"
Cohesion: 0.10
Nodes (19): compilerOptions, allowSyntheticDefaultImports, declaration, emitDecoratorMetadata, esModuleInterop, experimentalDecorators, incremental, isolatedModules (+11 more)

### Community 4 - "Community 4"
Cohesion: 0.12
Nodes (16): devDependencies, @nestjs/cli, @nestjs/mau, @nestjs/schematics, @nestjs/testing, oxlint, prettier, source-map-support (+8 more)

### Community 5 - "Community 5"
Cohesion: 0.13
Nodes (15): scripts, build, deploy, format, lint, openapi:generate, start, start:debug (+7 more)

### Community 6 - "Community 6"
Cohesion: 0.15
Nodes (13): dependencies, class-transformer, class-validator, @nestjs/common, @nestjs/config, @nestjs/core, @nestjs/platform-express, @nestjs/swagger (+5 more)

### Community 7 - "Community 7"
Cohesion: 0.29
Nodes (5): AppController, Controller, Get, AppService, Injectable

### Community 8 - "Community 8"
Cohesion: 0.29
Nodes (6): env, node, rules, @typescript-eslint/no-explicit-any, @typescript-eslint/no-floating-promises, $schema

### Community 9 - "Community 9"
Cohesion: 0.29
Nodes (6): ./tsconfig.json, compilerOptions, rootDir, exclude, extends, include

### Community 10 - "Community 10"
Cohesion: 0.33
Nodes (5): collection, compilerOptions, deleteOutDir, $schema, sourceRoot

### Community 11 - "Community 11"
Cohesion: 0.40
Nodes (3): ref_node_child_process, ref_node_fs, server

## Knowledge Gaps
- **96 isolated node(s):** `author`, `description`, `license`, `name`, `private` (+91 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 124 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Todo` connect `Community 0` to `Community 2`?**
  _High betweenness centrality (0.117) - this node is a cross-community bridge._
- **Why does `devDependencies` connect `Community 4` to `Community 1`?**
  _High betweenness centrality (0.114) - this node is a cross-community bridge._
- **Why does `@nestjs/common` connect `Community 2` to `Community 1`, `Community 7`?**
  _High betweenness centrality (0.110) - this node is a cross-community bridge._
- **What connects `author`, `description`, `license` to the rest of the system?**
  _96 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.10252100840336134 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.06628787878787878 - nodes in this community are weakly interconnected._
- **Should `Community 3` be split into smaller, more focused modules?**
  _Cohesion score 0.1 - nodes in this community are weakly interconnected._