import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    base: process.env.GITHUB_PAGES
        ? "TodoApp"
        : "./",
    VITE_API_URL: "https://clumsyg.github.io/TodoApp/"
})
