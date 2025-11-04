// File: tailwind.config.ts
import type { Config } from 'tailwindcss'
import forms from '@tailwindcss/forms'

const config: Config = {
    // INI ADALAH PERBAIKAN UNTUK TAMPILAN
    content: [
        './app/**/*.{js,ts,jsx,tsx,mdx}', // Ini akan membaca SEMUA file di dalam folder 'app'
    ],
    // ---------------------------------
    theme: {
        extend: {
            colors: {
                'telkom-red': '#E60012',
                'telkom-dark': '#212121',
            },
        },
    },
    plugins: [
        forms,
    ],
}
export default config