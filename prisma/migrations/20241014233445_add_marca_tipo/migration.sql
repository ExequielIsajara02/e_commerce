/*
  Warnings:

  - You are about to drop the `pedidoproducto` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `pedidoproducto` DROP FOREIGN KEY `PedidoProducto_id_pedido_fkey`;

-- DropForeignKey
ALTER TABLE `pedidoproducto` DROP FOREIGN KEY `PedidoProducto_id_producto_fkey`;

-- DropTable
DROP TABLE `pedidoproducto`;
