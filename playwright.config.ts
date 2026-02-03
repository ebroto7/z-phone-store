import { defineConfig } from '@playwright/test';

export default defineConfig({
  // Carpeta donde estarán los tests
  testDir: './e2e',

  // URL base de la app (Next.js en desarrollo)
  use: {
    baseURL: 'http://localhost:3000',
  },

  // Arrancar el servidor antes de los tests
  webServer: {
    command: 'pnpm dev',
    url: 'http://localhost:3000',
    reuseExistingServer: true,
  },
});
