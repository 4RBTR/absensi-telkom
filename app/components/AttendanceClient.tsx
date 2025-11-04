// File: app/components/AttendanceClient.tsx
'use client'

import { useState, FormEvent } from 'react'

// Tipe data untuk Presensi
export interface Presensi {
    id: string
    nama: string
    waktu: string
}

// Data awal (dummy)
const dataAwal: Presensi[] = [
    {
        id: '1',
        nama: 'Budi Santoso (Contoh)',
        waktu: new Date('2025-11-04T08:00:00Z').toISOString(),
    },
    {
        id: '2',
        nama: 'Ani Yuliani (Contoh)',
        waktu: new Date('2025-11-04T08:01:00Z').toISOString(),
    },
]

// --- Komponen Ikon (masih sama) ---
const IconCheck = () => (
    <svg
        xmlns="http://www.w.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-5 h-5 mr-2" // <-- Styling ini akan berfungsi sekarang
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
    </svg>
)

const IconTrash = () => (
    <svg
        xmlns="http://www.w.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-5 h-5" // <-- Styling ini akan berfungsi sekarang
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12.5_0c-.342.052-.682.107-1.022.166m1.022-.165L5.821 19.673a2.25 2.25 0 002.244 2.077H15.935a2.25 2.25 0 002.244-2.077L19.228 5.79m-14.456 0A48.105 48.105 0 017.03 5.313"
        />
    </svg>
)
// -------------------------------------

export default function AttendanceClient() {
    const [nama, setNama] = useState('')
    // Data riwayat sekarang disimpan di 'state', dimulai dengan data awal
    const [riwayat, setRiwayat] = useState<Presensi[]>(dataAwal)
    const [error, setError] = useState<string | null>(null)

    // Fungsi submit (TANPA API)
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        if (!nama) {
            setError('Nama tidak boleh kosong.')
            return
        }
        setError(null)

        // Buat data baru
        const dataBaru: Presensi = {
            id: crypto.randomUUID(), // ID acak
            nama: nama,
            waktu: new Date().toISOString(),
        }

        // Tambahkan data baru ke 'state' (data baru di atas)
        setRiwayat([dataBaru, ...riwayat])
        setNama('') // Kosongkan form
    }

    // Fungsi hapus (TANPA API)
    const handleDelete = async (id: string) => {
        if (!confirm('Apakah Anda yakin ingin menghapus riwayat ini?')) {
            return
        }
        // Filter 'state' untuk menghapus data dengan ID yang cocok
        setRiwayat(riwayat.filter((p) => p.id !== id))
    }

    // Fungsi format waktu (masih sama)
    const formatWaktu = (waktuISO: string) => {
        return new Date(waktuISO).toLocaleString('id-ID', {
            dateStyle: 'medium',
            timeStyle: 'short',
        })
    }

    // Tampilan (JSX) tidak berubah sama sekali
    return (
        <div className="mt-12">
            {/* Bagian Form Presensi */}
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 shadow-lg">
                <form onSubmit={handleSubmit}>
                    <label
                        htmlFor="nama"
                        className="block text-sm font-medium text-gray-300"
                    >
                        Nama Lengkap Siswa
                    </label>
                    <div className="mt-2 flex flex-col sm:flex-row gap-2">
                        <input
                            type="text"
                            id="nama"
                            value={nama}
                            onChange={(e) => setNama(e.target.value)}
                            className="block w-full rounded-md border-0 bg-white/5 py-2 px-3 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-telkom-red sm:text-sm sm:leading-6"
                            placeholder="Contoh: Budi Santoso"
                        />
                        <button
                            type="submit"
                            className="flex items-center justify-center rounded-md bg-telkom-red px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-telkom-red"
                        >
                            <IconCheck />
                            Catat Kehadiran
                        </button>
                    </div>
                    {error && <p className="mt-2 text-sm text-red-400">{error}</p>}
                </form>
            </div>

            {/* Bagian Riwayat Presensi */}
            <div className="mt-12">
                <h2 className="text-2xl font-semibold mb-4">Riwayat Presensi</h2>
                <div className="bg-gray-800 border border-gray-700 rounded-lg shadow-lg overflow-hidden">
                    {riwayat.length === 0 ? (
                        <p className="p-6 text-center text-gray-400">
                            Belum ada riwayat presensi.
                        </p>
                    ) : (
                        <ul role="list" className="divide-y divide-gray-700">
                            {riwayat.map((p) => (
                                <li
                                    key={p.id}
                                    className="flex items-center justify-between gap-x-6 p-4 sm:p-6 hover:bg-gray-700/50 transition-colors"
                                >
                                    <div className="min-w-0">
                                        <p className="text-md font-semibold leading-6 text-white">
                                            {p.nama}
                                        </p>
                                        <p className="mt-1 truncate text-xs leading-5 text-gray-400">
                                            ID: {p.id}
                                        </p>
                                    </div>
                                    <div className="flex flex-col items-end sm:flex-row sm:items-center gap-4">
                                        <p className="text-sm leading-6 text-gray-300">
                                            {formatWaktu(p.waktu)}
                                        </p>
                                        <button
                                            onClick={() => handleDelete(p.id)}
                                            className="rounded-full bg-gray-700 p-2 text-gray-400 hover:text-white hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-500"
                                            aria-label="Hapus"
                                        >
                                            <IconTrash />
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    )
}