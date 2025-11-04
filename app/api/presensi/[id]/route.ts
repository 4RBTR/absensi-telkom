// File: app/api/presensi/[id]/route.ts
// INI ADALAH KODE YANG SUDAH DIPERBAIKI
import { NextRequest, NextResponse } from 'next/server'
import { hapusRiwayat } from '@/app/lib/kv-store'

export async function DELETE(
    request: NextRequest, // Ini sudah benar
    context: { params: { id: string } } // Ini sudah benar
) {
    try {
        const id = context.params.id // Ini sudah benar

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