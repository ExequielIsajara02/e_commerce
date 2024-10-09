export type PedidoData = {
    id_usuario: number;
    id_producto: number;
    cantidad: number;
    fecha: Date;
    metodo_pago: string;
    estado: string;
    precio_final: number;
};

export type ProductoData = {
    id_producto: number,
    nombre: string
    descripcion: string
    imagen: string
    precio: number
    cantidad: number
  };

export type UsuarioData = {
<<<<<<< HEAD
    id_usuario: number | null;
    nombre: string | null;
    apellido: string | null;
    correo: string | null;
    telefono: string | null;
    direccion: string | null;
    localidad: string | null;
=======
    id_usuario: number
    nombre: string
    apellido: string
    correo: string
    telefono: string
    direccion: string
    localidad: string
>>>>>>> master
};

export type CartItemType = {
    id_producto: number;
    nombre: string;
    descripcion: string; 
    imagen: string; 
    precio: number;
    cantidad: number;
}
  