// File: tailwind.config.ts
import type { Config } from 'tailwindcss'
import forms from '@tailwindcss/forms' // <-- 1. IMPORT DI SINI

const config: Config = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                // Tema Telkom
                'telkom-red': '#E60012',
                'telkom-dark': '#212121',
            },
        },
    },
    plugins: [
        forms, // <-- 2. GUNAKAN DI SINI
    ],
}
export default config