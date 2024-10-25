import { NextResponse } from 'next/server';
import { eliminarCombo } from '../../../../../utils/combos';

export async function DELETE(request: Request) {
    const url = new URL(request.url);
    const id = url.pathname.split('/').pop(); // Obtén el último segmento de la URL como ID
    console.log("ID recibido en DELETE:", id);

    if (!id) {
        return NextResponse.json({ message: 'ID no proporcionado' }, { status: 400 });
    }

    try {
        await eliminarCombo(Number(id));
        return NextResponse.json({ message: 'Combo eliminado exitosamente' }, { status: 200 });
    } catch (error) {
        console.error("Error al eliminar combo:", error);
        return NextResponse.json({ message: 'Error al eliminar el combo' }, { status: 500 });
    }
}
