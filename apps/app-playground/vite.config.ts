import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { viteCommonjs } from '@originjs/vite-plugin-commonjs';

export default defineConfig({
  server: {
    port: 5174,
  },
  plugins: [tsconfigPaths(), viteCommonjs(), react()],
});