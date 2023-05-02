export default (sequelize, DataTypes) => {
  const alias = 'productos'
  const cols = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    descripcion: {
      type: DataTypes.STRING,
      allowNull: false
    },
    precio: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    imgSrc: {
      type: DataTypes.STRING,
      allowNull: false
    },
    isInCart: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }
  const config = {
    tableName: 'productos',
    timestamps: false
  }
  const Productos = sequelize.define(alias, cols, config)
  Productos.associate = models => {}
  return Productos
}
