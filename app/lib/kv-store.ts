// File: app/lib/kv-store.ts
import { kv } from '@vercel/kv'

// Tipe data untuk Presensi
export interface Presensi {
    id: string
    nama: string
    waktu: string
}

// Kunci unik untuk database KV kita
// Semua data riwayat akan disimpan di bawah satu kunci ini
const RIWAYAT_KEY = 'riwayat_presensi_telkom'

/**
 * Mengambil SEMUA riwayat presensi dari Vercel KV.
 * Diurutkan dari yang terbaru.
 */
export async function getSemuaRiwayat(): Promise<Presensi[]> {
    // Ambil data dari KV. Jika tidak ada (null), kembalikan array kosong
    const riwayat = await kv.get<Presensi[]>(RIWAYAT_KEY)
    return riwayat || []
}

/**
 * Menambah satu data presensi baru.
 */
export async function tambahRiwayat(nama: string): Promise<Presensi> {
    const dataBaru: Presensi = {
        id: crypto.randomUUID(), // Buat ID unik
        nama: nama,
        waktu: new Date().toISOString(),
    }

    // 1. Ambil data lama
    const riwayatLama = await getSemuaRiwayat()

    // 2. Tambah data baru ke data lama (data baru di paling atas/depan)
    const riwayatBaru = [dataBaru, ...riwayatLama]

    // 3. Simpan kembali semua data ke KV
    await kv.set(RIWAYAT_KEY, riwayatBaru)

    return dataBaru
}

/**
 * Menghapus satu data presensi berdasarkan ID.
 */
export async function hapusRiwayat(id: string): Promise<boolean> {
    // 1. Ambil data lama
    const riwayatLama = await getSemuaRiwayat()

    // 2. Filter data, buang data yang ID-nya cocok
    const riwayatBaru = riwayatLama.filter((p) => p.id !== id)

    // 3. Cek apakah ada yang terhapus
    if (riwayatLama.length === riwayatBaru.length) {
        return false // Gagal (data tidak ditemukan)
    }

    // 4. Simpan array yang sudah difilter
    await kv.set(RIWAYAT_KEY, riwayatBaru)
    return true // Sukses
}