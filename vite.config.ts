/*eslint-disable*/
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// @ts-ignore
import path from "path";

export default defineConfig({
  base: "/todo-react-ts/",
  plugins: [
    react()
  ],
  resolve: {
    alias: {
      // @ts-ignore
      "@": path.resolve(__dirname, './src')
    }
  }
})