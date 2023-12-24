import Precio from './Precio.js'
import Categoria from './Categoria.js'
import Usuario from './Usuario.js'
import Producto from './Producto.js'
import Pedido from './Pedido.js'

Pedido.belongsTo(Producto, { foreignKey: 'productoId'})
Pedido.belongsTo(Usuario, { foreignKey: 'usuarioId'})

Producto.belongsTo(Precio, { foreignKey: 'precioId' })
Producto.belongsTo(Categoria, { foreignKey: 'categoriaId' })
Producto.belongsTo(Usuario, { foreignKey: 'usuarioId'})

export {
    Precio,
    Categoria,
    Usuario,
    Producto,
    Pedido
}

