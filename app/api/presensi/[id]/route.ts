// File: app/api/presensi/[id]/route.ts
import { NextResponse } from 'next/server'
// Impor fungsi hapus
import { hapusRiwayat } from '@/app/lib/kv-store'

/**
 * FUNGSI DELETE: Dipanggil saat user menekan tombol hapus
 */
export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const id = params.id
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