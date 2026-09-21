#!/usr/bin/env node
/**
 * Génère le contrat OpenAPI v3 (openapi.json) en démarrant temporairement
 * l'application compilée (dist/main.js), en récupérant le document exposé
 * sur /api-json, puis en arrêtant le serveur.
 *
 * Usage: npm run openapi:generate
 * Prérequis: `npm run build` et une base PostgreSQL accessible (voir README).
 */
import { spawn } from 'node:child_process';
import { writeFileSync } from 'node:fs';

const PORT = process.env.OPENAPI_GENERATE_PORT ?? '3010';
const url = `http://localhost:${PORT}/api-json`;

async function waitForServer(maxAttempts = 30, delayMs = 500) {
  for (let attempt = 0; attempt < maxAttempts; attempt += 1) {
    try {
      const res = await fetch(url);
      if (res.ok) return res;
    } catch {
      // pas encore prêt
    }
    await new Promise((resolve) => setTimeout(resolve, delayMs));
  }
  throw new Error("Le serveur n'a pas répondu à temps.");
}

const server = spawn('node', ['dist/main.js'], {
  env: { ...process.env, PORT },
  stdio: ['ignore', 'pipe', 'pipe'],
});

let serverOutput = '';
server.stdout.on('data', (chunk) => {
  serverOutput += chunk.toString();
});
server.stderr.on('data', (chunk) => {
  serverOutput += chunk.toString();
});

try {
  const res = await waitForServer();
  const document = await res.json();
  writeFileSync('./openapi.json', JSON.stringify(document, null, 2));
  console.log('Contrat OpenAPI généré dans ./openapi.json');
} catch (err) {
  console.error(serverOutput);
  console.error(err.message);
  process.exitCode = 1;
} finally {
  server.kill();
}
