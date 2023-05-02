import db from '../database/models/index.js'

export default {
  list: async (req, res) => {
    res.send(await db.productos.findAll({ attributes: { exclude: ['isInCart'] } }))
  }
}
