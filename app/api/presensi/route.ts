// File: app/api/presensi/route.ts
import { NextResponse } from 'next/server'
// Impor fungsi baru kita dari kv-store
import { getSemuaRiwayat, tambahRiwayat } from '@/app/lib/kv-store'

/**
 * FUNGSI GET: Dipanggil saat frontend me-load data
 */
export async function GET() {
    try {
        const dataTerkini = await getSemuaRiwayat()
        return NextResponse.json(dataTerkini)
    } catch (error) {
        return NextResponse.json(
            { message: 'Gagal mengambil data dari KV', error },
            { status: 500 }
        )
    }
}

/**
 * FUNGSI POST: Dipanggil saat user submit form
 */
export async function POST(request: Request) {
    try {
        const { nama } = await request.json()

        if (!nama) {
            return NextResponse.json(
                { message: 'Nama tidak boleh kosong' },
                { status: 400 }
            )
        }

        // Panggil fungsi untuk menambah riwayat
        const dataBaru = await tambahRiwayat(nama)

        return NextResponse.json(dataBaru, { status: 201 })
    } catch (error) {
        return NextResponse.json(
            { message: 'Gagal menyimpan data ke KV', error },
            { status: 500 }
        )
    }
}