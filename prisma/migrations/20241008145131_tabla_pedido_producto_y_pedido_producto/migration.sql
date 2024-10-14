/*
  Warnings:

  - You are about to drop the column `cantidad` on the `pedido` table. All the data in the column will be lost.
  - You are about to drop the column `id_producto` on the `pedido` table. All the data in the column will be lost.
  - Added the required column `descuentos` to the `Pedido` table without a default value. This is not possible if the table is not empty.
  - Added the required column `recargos` to the `Pedido` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `pedido` DROP COLUMN `cantidad`,
    DROP COLUMN `id_producto`,
    ADD COLUMN `descuentos` DOUBLE NOT NULL,
    ADD COLUMN `recargos` DOUBLE NOT NULL;

-- CreateTable
CREATE TABLE `PedidoProducto` (
    `id_pedido` INTEGER NOT NULL,
    `id_producto` INTEGER NOT NULL,
    `cantidad` INTEGER NOT NULL,

    PRIMARY KEY (`id_pedido`, `id_producto`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Pedido` ADD CONSTRAINT `Pedido_id_usuario_fkey` FOREIGN KEY (`id_usuario`) REFERENCES `Usuario`(`id_usuario`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PedidoProducto` ADD CONSTRAINT `PedidoProducto_id_pedido_fkey` FOREIGN KEY (`id_pedido`) REFERENCES `Pedido`(`id_pedido`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PedidoProducto` ADD CONSTRAINT `PedidoProducto_id_producto_fkey` FOREIGN KEY (`id_producto`) REFERENCES `Producto`(`id_producto`) ON DELETE RESTRICT ON UPDATE CASCADE;
