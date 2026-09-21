import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    globals: true,
    root: './',
    include: ['**/*.e2e-spec.ts'],
    // Les suites e2e partagent une même base PostgreSQL (synchronize TypeORM) ;
    // on désactive le parallélisme entre fichiers pour éviter les races de schéma.
    fileParallelism: false,
  },
});
