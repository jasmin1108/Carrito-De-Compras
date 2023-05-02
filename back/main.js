import express from 'express'
import productsController from './controllers/productsController.js'
import cartController from './controllers/cartController.js'

const PORT = process.env.PORT || 3000
const app = express()

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.get('/products', productsController.list) // lista todos los productos
app.get('/cart', cartController.list) // lista los productos que están en el carrito
app.get('/cart/:id', cartController.add) // agrega un producto al carrito
app.delete('/cart/:id', cartController.delete) // elimina un producto del carrito

app.listen(PORT, () => console.log(`Servidor activo en el puerto ${PORT}`))

function initDb () {
  // curl http://localhost:3000/cart
  import('./database/models/index.js')
    .then(async db => {
      await db.default.sequelize.sync({ force: true })
      return db.default
    })
    .then(db =>
      db.productos.bulkCreate([
        {
          nombre: 'Producto 1',
          descripcion: 'Descripción del producto 1',
          precio: 100,
          imgSrc: 'https://picsum.photos/200/300',
          isInCart: false
        },
        {
          nombre: 'Producto 2',
          descripcion: 'Descripción del producto 2',
          precio: 200,
          imgSrc: 'https://picsum.photos/200/300',
          isInCart: true
        },
        {
          nombre: 'Producto 3',
          descripcion: 'Descripción del producto 3',
          precio: 300,
          imgSrc: 'https://picsum.photos/200/300',
          isInCart: true
        }
      ])
    )
}

initDb()
