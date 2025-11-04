// File: app/page.tsx
import AttendanceClient from '@/app/components/AttendanceClient' // Komponen interaktif
import Image from 'next/image'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-8 md:p-12">
      <div className="z-10 w-full max-w-4xl items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-700 bg-gray-800/30 p-4 backdrop-blur-2xl lg:static lg:w-auto lg:rounded-xl lg:border lg:border-gray-700 lg:bg-gray-800 lg:p-4">
          Aplikasi Presensi Siswa
        </p>
        <div className="fixed bottom-0 left-0 flex h-24 w-full items-end justify-center bg-gradient-to-t from-black via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          {/* Logo bisa diganti URL logo Telkom */}
          <span className="font-bold text-lg text-telkom-red">
            TELKOM SCHOOLS
          </span>
        </div>
      </div>

      <div className="mt-16 w-full max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold text-center">
          Sistem Absensi Kehadiran
        </h1>
        <p className="mt-4 text-center text-lg text-gray-400">
          Silakan masukkan nama Anda untuk mencatat kehadiran hari ini.
        </p>

        {/* Komponen Client (Interaktif) 
          Semua logika form & list ada di sini
        */}
        <AttendanceClient />
      </div>

      <footer className="mt-16 text-center text-gray-500 text-sm">
        Prototipe Aplikasi Presensi © 2025.
      </footer>
    </main>
  )
}