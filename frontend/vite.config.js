import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import obfuscator from 'vite-plugin-javascript-obfuscator';

export default defineConfig({
  plugins: [
    react(),
    obfuscator({
      // Options de l'obfuscateur
      compact: true,
      controlFlowFlattening: true,
      deadCodeInjection: true,
      debugProtection: true,
      disableConsoleOutput: true,
      rotateStringArray: true,
      stringArray: true,
      stringArrayEncoding: ['base64'], // Encodage en base64 pour les chaînes
      stringArrayThreshold: 0.75
    })
  ],
  build: {
    sourcemap: false // Ne pas inclure de source maps pour plus de sécurité
  },
  css: {
    modules: {
      localsConvention: "camelCase",
    }
  }
});
