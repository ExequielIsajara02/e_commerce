-- CreateTable
CREATE TABLE `Producto` (
    `id_producto` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `descripcion` VARCHAR(191) NOT NULL,
    `imagen` VARCHAR(191) NOT NULL,
    `precio` DOUBLE NOT NULL,
    `cantidad` INTEGER NOT NULL,
    `marca` VARCHAR(191) NOT NULL,
    `tipo` VARCHAR(191) NOT NULL,

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
CREATE TABLE `PedidoProducto` (
    `id_pedido` INTEGER NOT NULL,
    `id_producto` INTEGER NOT NULL,
    `cantidad` INTEGER NOT NULL,

    PRIMARY KEY (`id_pedido`, `id_producto`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Usuario` (
    `id_usuario` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `apellido` VARCHAR(191) NOT NULL,
    `correo` VARCHAR(191) NOT NULL,
    `telefono` VARCHAR(191) NOT NULL,
    `direccion` VARCHAR(191) NOT NULL,
    `localidad` VARCHAR(191) NOT NULL,
    `cuentaVerificada` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id_usuario`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Descuento` (
    `id_descuento` INTEGER NOT NULL AUTO_INCREMENT,
    `codigo` VARCHAR(191) NOT NULL,
    `porcentaje` DOUBLE NOT NULL,
    `fechaInicio` DATETIME(3) NOT NULL,
    `fechaFin` DATETIME(3) NOT NULL,
    `activo` BOOLEAN NOT NULL DEFAULT true,
    `creadoEn` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Descuento_codigo_key`(`codigo`),
    PRIMARY KEY (`id_descuento`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_DescuentosAplicables` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_DescuentosAplicables_AB_unique`(`A`, `B`),
    INDEX `_DescuentosAplicables_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Pedido` ADD CONSTRAINT `Pedido_id_usuario_fkey` FOREIGN KEY (`id_usuario`) REFERENCES `Usuario`(`id_usuario`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PedidoProducto` ADD CONSTRAINT `PedidoProducto_id_pedido_fkey` FOREIGN KEY (`id_pedido`) REFERENCES `Pedido`(`id_pedido`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_DescuentosAplicables` ADD CONSTRAINT `_DescuentosAplicables_A_fkey` FOREIGN KEY (`A`) REFERENCES `Descuento`(`id_descuento`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_DescuentosAplicables` ADD CONSTRAINT `_DescuentosAplicables_B_fkey` FOREIGN KEY (`B`) REFERENCES `Producto`(`id_producto`) ON DELETE CASCADE ON UPDATE CASCADE;
