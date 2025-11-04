// File: app/api/presensi/[id]/route.ts
// INI ADALAH KODE YANG SUDAH DIPERBAIKI (FINAL)
import { NextRequest, NextResponse } from 'next/server'
import { hapusRiwayat } from '@/app/lib/kv-store'

export async function DELETE(
    request: NextRequest,
    context: { params: Promise<{ id: string }> } // <-- 1. Ini sekarang adalah 'Promise'
) {
    try {
        const { id } = await context.params // <-- 2. Kita harus 'await' untuk dapat datanya

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