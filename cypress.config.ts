import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    supportFile: 'cypress/support/e2e.ts',
    videoUploadOnPasses: false,
    video: false,
    defaultCommandTimeout: 50000,
  },
});
