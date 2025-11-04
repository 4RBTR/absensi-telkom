// File: app/components/AttendanceClient.tsx
'use client' // Tandai sebagai Client Component

import { useState, useEffect, FormEvent } from 'react'
// Impor tipe data Presensi
import type { Presensi } from '@/app/lib/kv-store'

// Komponen untuk ikon (menggunakan SVG)
const IconCheck = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-5 h-5 mr-2"
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
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-5 h-5"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12.5_0c-.342.052-.682.107-1.022.166m1.022-.165L5.821 19.673a2.25 2.25 0 002.244 2.077H15.935a2.25 2.25 0 002.244-2.077L19.228 5.79m-14.456 0A48.105 48.105 0 017.03 5.313"
        />
    </svg>
)

export default function AttendanceClient() {
    // State untuk menyimpan nama di form
    const [nama, setNama] = useState('')
    // State untuk menyimpan daftar riwayat presensi
    const [riwayat, setRiwayat] = useState<Presensi[]>([])
    // State untuk loading
    const [isLoading, setIsLoading] = useState(false)
    const [isFetching, setIsFetching] = useState(true)
    // State untuk pesan error
    const [error, setError] = useState<string | null>(null)

    // Fungsi untuk mengambil data riwayat dari API
    const fetchRiwayat = async () => {
        setIsFetching(true)
        try {
            const res = await fetch('/api/presensi') // Panggil API GET
            if (!res.ok) throw new Error('Gagal memuat data')
            const data = (await res.json()) as Presensi[]
            setRiwayat(data)
        } catch (err) {
            setError('Gagal mengambil data riwayat.')
        } finally {
            setIsFetching(false)
        }
    }

    // Ambil data saat komponen pertama kali dimuat
    useEffect(() => {
        fetchRiwayat()
    }, [])

    // Fungsi untuk menangani submit form (Presensi)
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        if (!nama) {
            setError('Nama tidak boleh kosong.')
            return
        }

        setIsLoading(true)
        setError(null)

        try {
            const res = await fetch('/api/presensi', { // Panggil API POST
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nama }),
            })

            if (!res.ok) {
                throw new Error('Gagal melakukan presensi.')
            }

            setNama('') // Kosongkan form
            await fetchRiwayat() // Ambil ulang data riwayat agar update
        } catch (err) {
            setError((err as Error).message)
        } finally {
            setIsLoading(false)
        }
    }

    // Fungsi untuk menghapus data presensi
    const handleDelete = async (id: string) => {
        // Konfirmasi dulu
        if (!confirm('Apakah Anda yakin ingin menghapus riwayat ini?')) {
            return
        }

        try {
            const res = await fetch(`/api/presensi/${id}`, { // Panggil API DELETE
                method: 'DELETE',
            })

            if (!res.ok) {
                throw new Error('Gagal menghapus data.')
            }

            await fetchRiwayat() // Ambil ulang data
        } catch (err) {
            setError((err as Error).message)
        }
    }

    // Fungsi untuk memformat tanggal
    const formatWaktu = (waktuISO: string) => {
        return new Date(waktuISO).toLocaleString('id-ID', {
            dateStyle: 'medium',
            timeStyle: 'short',
        })
    }

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
                            disabled={isLoading}
                            className="block w-full rounded-md border-0 bg-white/5 py-2 px-3 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-telkom-red sm:text-sm sm:leading-6 disabled:opacity-50"
                            placeholder="Contoh: Budi Santoso"
                        />
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="flex items-center justify-center rounded-md bg-telkom-red px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-telkom-red disabled:bg-gray-600 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                'Memproses...'
                            ) : (
                                <>
                                    <IconCheck />
                                    Catat Kehadiran
                                </>
                            )}
                        </button>
                    </div>
                    {error && <p className="mt-2 text-sm text-red-400">{error}</p>}
                </form>
            </div>

            {/* Bagian Riwayat Presensi */}
            <div className="mt-12">
                <h2 className="text-2xl font-semibold mb-4">Riwayat Presensi</h2>
                <div className="bg-gray-800 border border-gray-700 rounded-lg shadow-lg overflow-hidden">
                    {isFetching ? (
                        <p className="p-6 text-center text-gray-400">Memuat riwayat...</p>
                    ) : riwayat.length === 0 ? (
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