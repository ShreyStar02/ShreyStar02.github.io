import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// User site (shreystar02.github.io) is served from the domain root, so base = '/'.
export default defineConfig({
    base: '/',
    plugins: [react()],
    server: {
        host: true, // listen on all interfaces so the dev tunnel can reach it
        hmr: { clientPort: 443 }, // route HMR websocket over the HTTPS dev tunnel
    },
});
