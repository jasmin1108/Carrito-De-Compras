import db from '../database/models/index.js'

export default {
  list: async (req, res) => {
    const productsInCart = await db.productos.findAll({
      where: { isInCart: true },
      attributes: { exclude: ['isInCart'] }
    })
    return res.send(productsInCart)
  },
  add: async (req, res) => {
    const { id } = req.params
    await db.productos.update({ isInCart: true }, { where: { id } })
    return res.sendStatus(204)
  },
  delete: async (req, res) => {
    const { id } = req.params
    await db.productos.update({ isInCart: false }, { where: { id } })
    return res.sendStatus(204)
  }
}
