// File: tailwind.config.ts
import type { Config } from 'tailwindcss'
import forms from '@tailwindcss/forms'

const config: Config = {
    // ---------------------------------------------
    // INI ADALAH BAGIAN YANG DIPERBAIKI (FINAL)
    // Kita beritahu Tailwind secara spesifik file mana yang harus dibaca
    content: [
        './app/layout.tsx',
        './app/page.tsx',
        './app/components/AttendanceClient.tsx',
    ],
    // ---------------------------------------------

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