-- CreateTable
CREATE TABLE `Producto` (
    `id_producto` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NULL,
    `descripcion` VARCHAR(191) NULL,
    `imagen` VARCHAR(191) NULL,
    `precio` DOUBLE NULL,
    `cantidad` INTEGER NULL,
    `marca` VARCHAR(191) NULL,
    `tipo` VARCHAR(191) NULL,

    PRIMARY KEY (`id_producto`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Pedido` (
    `id_pedido` INTEGER NOT NULL AUTO_INCREMENT,
    `id_usuario` INTEGER NOT NULL,
    `fecha` DATETIME(3) NOT NULL,
    `metodo_pago` VARCHAR(191) NOT NULL,
    `estado` VARCHAR(191) NOT NULL,
    `precio_final` DOUBLE NOT NULL,
    `recargos` DOUBLE NOT NULL,
    `descuentos` DOUBLE NOT NULL,

    PRIMARY KEY (`id_pedido`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Usuario` (
    `id_usuario` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NULL,
    `apellido` VARCHAR(191) NULL,
    `correo` VARCHAR(191) NULL,
    `clave` VARCHAR(191) NULL,
    `telefono` VARCHAR(191) NULL,
    `direccion` VARCHAR(191) NULL,
    `localidad` VARCHAR(191) NULL,
    `cuentaVerificada` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `Usuario_correo_key`(`correo`),
    PRIMARY KEY (`id_usuario`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Pedido` ADD CONSTRAINT `Pedido_id_usuario_fkey` FOREIGN KEY (`id_usuario`) REFERENCES `Usuario`(`id_usuario`) ON DELETE RESTRICT ON UPDATE CASCADE;
