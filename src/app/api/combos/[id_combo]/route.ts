import { NextResponse } from 'next/server';
import { editarCombo, eliminarCombo } from '../../../../../utils/combos';

export async function DELETE(request: Request) {
    const url = new URL(request.url);
    const id = url.pathname.split('/').pop();
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

export async function PUT(request:Request) {
    const url = new URL(request.url);
    const id = url.pathname.split('/').pop();
    console.log("ID recibido en UPDATE:", id);
    try {
        const data = await request.json();
        console.log("Datos EDICION PUT",data)
        await editarCombo(Number(id), data);
        return NextResponse.json({ message: 'Combo listo para editar exitosamente' }, { status: 200 });
    } catch (error) {
        console.error("Error al editar el combo en API:", error);
        return NextResponse.json({ message: 'Error al eliminar el combo' }, { status: 500 });
    }
}