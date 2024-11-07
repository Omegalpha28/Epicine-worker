// vite.config.js
import { defineConfig } from "file:///app/node_modules/vite/dist/node/index.js";
import react from "file:///app/node_modules/@vitejs/plugin-react/dist/index.mjs";
import obfuscator from "file:///app/node_modules/vite-plugin-javascript-obfuscator/dist/index.cjs.js";
var vite_config_default = defineConfig({
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
      stringArrayEncoding: ["base64"],
      // Encodage en base64 pour les chaînes
      stringArrayThreshold: 0.75
    })
  ],
  build: {
    sourcemap: false
    // Ne pas inclure de source maps pour plus de sécurité
  },
  css: {
    modules: {
      localsConvention: "camelCase"
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvYXBwXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvYXBwL3ZpdGUuY29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9hcHAvdml0ZS5jb25maWcuanNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCc7XG5pbXBvcnQgb2JmdXNjYXRvciBmcm9tICd2aXRlLXBsdWdpbi1qYXZhc2NyaXB0LW9iZnVzY2F0b3InO1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBwbHVnaW5zOiBbXG4gICAgcmVhY3QoKSxcbiAgICBvYmZ1c2NhdG9yKHtcbiAgICAgIC8vIE9wdGlvbnMgZGUgbCdvYmZ1c2NhdGV1clxuICAgICAgY29tcGFjdDogdHJ1ZSxcbiAgICAgIGNvbnRyb2xGbG93RmxhdHRlbmluZzogdHJ1ZSxcbiAgICAgIGRlYWRDb2RlSW5qZWN0aW9uOiB0cnVlLFxuICAgICAgZGVidWdQcm90ZWN0aW9uOiB0cnVlLFxuICAgICAgZGlzYWJsZUNvbnNvbGVPdXRwdXQ6IHRydWUsXG4gICAgICByb3RhdGVTdHJpbmdBcnJheTogdHJ1ZSxcbiAgICAgIHN0cmluZ0FycmF5OiB0cnVlLFxuICAgICAgc3RyaW5nQXJyYXlFbmNvZGluZzogWydiYXNlNjQnXSwgLy8gRW5jb2RhZ2UgZW4gYmFzZTY0IHBvdXIgbGVzIGNoYVx1MDBFRW5lc1xuICAgICAgc3RyaW5nQXJyYXlUaHJlc2hvbGQ6IDAuNzVcbiAgICB9KVxuICBdLFxuICBidWlsZDoge1xuICAgIHNvdXJjZW1hcDogZmFsc2UgLy8gTmUgcGFzIGluY2x1cmUgZGUgc291cmNlIG1hcHMgcG91ciBwbHVzIGRlIHNcdTAwRTljdXJpdFx1MDBFOVxuICB9LFxuICBjc3M6IHtcbiAgICBtb2R1bGVzOiB7XG4gICAgICBsb2NhbHNDb252ZW50aW9uOiBcImNhbWVsQ2FzZVwiLFxuICAgIH1cbiAgfVxufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQThMLFNBQVMsb0JBQW9CO0FBQzNOLE9BQU8sV0FBVztBQUNsQixPQUFPLGdCQUFnQjtBQUV2QixJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFDUCxNQUFNO0FBQUEsSUFDTixXQUFXO0FBQUE7QUFBQSxNQUVULFNBQVM7QUFBQSxNQUNULHVCQUF1QjtBQUFBLE1BQ3ZCLG1CQUFtQjtBQUFBLE1BQ25CLGlCQUFpQjtBQUFBLE1BQ2pCLHNCQUFzQjtBQUFBLE1BQ3RCLG1CQUFtQjtBQUFBLE1BQ25CLGFBQWE7QUFBQSxNQUNiLHFCQUFxQixDQUFDLFFBQVE7QUFBQTtBQUFBLE1BQzlCLHNCQUFzQjtBQUFBLElBQ3hCLENBQUM7QUFBQSxFQUNIO0FBQUEsRUFDQSxPQUFPO0FBQUEsSUFDTCxXQUFXO0FBQUE7QUFBQSxFQUNiO0FBQUEsRUFDQSxLQUFLO0FBQUEsSUFDSCxTQUFTO0FBQUEsTUFDUCxrQkFBa0I7QUFBQSxJQUNwQjtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
