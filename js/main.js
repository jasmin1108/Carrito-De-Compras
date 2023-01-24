// variables
const carrito = document.querySelector('#carrito')
const contenedorCarrito = document.querySelector('#lista-carrito tbody')
const listaZapato = document.querySelector('#lista-zapatos')
const vaciarCarrito = document.querySelector('#vaciar-carrito')
let articulosCarrito = []

cargarEventListeners()
function cargarEventListeners() {
    // cuando agregas un zapato presionando"agregar al carrito"
    listaZapato.addEventListener('click', agregarZapato)
    // elimina cursos del carrito
    carrito.addEventListener('click', eliminarProducto)

    // vaciar carrito

    vaciarCarrito.addEventListener('click', () => {
        articulosCarrito=[] //resetiamos el arreglo
        limpiarHtml()//eliminamos todo del HTML 
        
    })
}


//funciones 
function agregarZapato(e) {
    e.preventDefault()
    if (e.target.classList.contains('agregar-carrito')) {
        const productoSeleccionado = (e.target.parentElement.parentElement)
        leerDatos(productoSeleccionado)
    }
}

// elimiar un producto del carrito

function eliminarProducto(e){
    console.log(e.target.classList)
    if(e.target.classList.contains('borrar-producto')){
        const productoId = e.target.getAttribute('data-id')
        // elimina del arreglo de articulosCarrito por el data-Id
        articulosCarrito = articulosCarrito.filter(producto => producto.id !== productoId)
        console.log(articulosCarrito)
        carritoHtml()//
    }
}

// del contenido HTML al que dimos click y extraer la inf. del zapato

function leerDatos(producto) {
    // console.log(producto)

    // crear un objeto con el contenido del curso actual
    const infoProducto = {
        imagen: producto.querySelector('img').src,
        nombre: producto.querySelector('h4').textContent,
        precio: producto.querySelector('.precio').textContent,
        id: producto.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }
    // revisar si un elemento existe en el carrito
    const existe = articulosCarrito.some(producto => producto.id === infoProducto.id)
    if(existe){
        // actualizamos la cantidad
        const productos = articulosCarrito.map(producto => {
            if(producto.id === infoProducto.id){
                producto.cantidad++
                return producto
            }else {
                return producto
            }
            
        })
        articulosCarrito= [...productos]
    }else {
        // agregamos el curso al carrito
        // agregar elemento al arreglo de carrito
        articulosCarrito = [...articulosCarrito, infoProducto]
        
    }
    console.log(articulosCarrito)
    

    carritoHtml()
}

// muestra el carrito de compra en el HTMl

function carritoHtml() {
    // limpiar HTML
    limpiarHtml()
    articulosCarrito.forEach(producto => {
        const {imagen, nombre, precio, cantidad, id}= producto
        const row = document.createElement('tr')
        row.innerHTML = `
        <td><img src="${imagen}" width="60"></td>
        <td>${nombre} </td>
        <td> ${precio}  </td>
        <td> ${cantidad}  </td>
        <td> 
        <a href="#" class="borrar-producto" data-id="${id}"> X </a>
        </td>
        `
        // agregar el HTML del carrito en el tbody
        contenedorCarrito.appendChild(row)
    })
}
 
// eliminar los prodctos del tbody
function limpiarHtml(){
    // contenedorCarrito.innerHTML=''
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}


