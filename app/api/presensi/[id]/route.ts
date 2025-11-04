// File: app/api/presensi/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server' // <-- 1. Impor NextRequest
import { hapusRiwayat } from '@/app/lib/kv-store'

/**
 * FUNGSI DELETE: Dipanggil saat user menekan tombol hapus
 */
export async function DELETE(
    request: NextRequest, // <-- 2. Ganti dari 'Request' ke 'NextRequest'
    context: { params: { id: string } } // <-- 3. Ganti cara menerima 'params'
) {
    try {
        const id = context.params.id // <-- 4. Ambil 'id' dari 'context.params'

        // Panggil fungsi untuk menghapus riwayat
        const sukses = await hapusRiwayat(id)

        if (!sukses) {
            return NextResponse.json(
                { message: 'Data tidak ditemukan' },
                { status: 404 }
            )
        }

        return NextResponse.json(
            { message: 'Data berhasil dihapus' },
            { status: 200 }
        )
    } catch (error) {
        return NextResponse.json(
            { message: 'Gagal menghapus data dari KV', error },
            { status: 500 }
        )
    }
}