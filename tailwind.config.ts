// File: tailwind.config.ts
import type { Config } from 'tailwindcss'
import forms from '@tailwindcss/forms'

const config: Config = {
    // INI BAGIAN YANG DIPERBAIKI
    content: [
        './app/components/**/*.{js,ts,jsx,tsx,mdx}', // Menemukan AttendanceClient.tsx
        './app/**/*.{js,ts,jsx,tsx,mdx}', // Menemukan page.tsx dan layout.tsx
    ],
    // -------------------------
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