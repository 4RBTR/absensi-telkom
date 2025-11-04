// File: tailwind.config.ts
import type { Config } from 'tailwindcss'
import forms from '@tailwindcss/forms'

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

                // Perubahan palsu untuk paksa clear cache Vercel
                'dummy-color': '#123456',
            },
        },
    },
    plugins: [
        forms,
    ],
}
export default config