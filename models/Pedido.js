import { DataTypes } from 'sequelize'
import db from '../config/db.js'

const Pedido =  db.define('pedidos', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
})

export default Pedido