//variables
const peliculas = []
let carrito = []


const contenedorPeliculas = document.getElementById('contenedor-peliculas')
const contenedorCarrito = document.getElementById('carrito-contenedor')
const vaciarCarrito = document.getElementById('vaciar-carrito')
const contadorCarrito = document.getElementById('contadorCarrito')
const precioTotal = document.getElementById('precioTotal')
const botonCarrito = document.getElementById('boton-carrito')
//const botonMostrarCarrito = document.getElementById('carritoMostrar')


//cargar carrito
document.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('carrito')) {
    carrito = JSON.parse(localStorage.getItem('carrito'))
  }
  actualizarCarrito()
})

//FETCH
fetch("peliculaslista.json")
  .then(response => response.json())
  .then(peliculaslista => {
    peliculaslista.forEach(peli => {
      peliculas.push(peli)
      let peliCard = document.createElement('div');
      let { id, nombre, con, año, img, precio, cantidad } = peli
      peliCard.className = ('card')
      peliCard.innerHTML = `
        <h3>${nombre} </br>(${año})</h3>
      <img id="img" src="${img}" class="card-img-top"></img>
      </br>
      <p># ${con}</br>
      Precio: $${precio}</p>
      <br/><button id="agregar${id}" class="boton-agregar">Agregar</button>`

      contenedorPeliculas.append(peliCard);

      //EL boton carrito
      const boton = document.getElementById(`agregar${id}`)
      boton.addEventListener('click', () => {
        agregarAlArrayCarrito(id)
      })

    });
  })




const actualizarCarrito = () => {

  contenedorCarrito.innerHTML = ""

  carrito.forEach((peli) => {
    let { id, nombre, con, año, img, precio, cantidad } = peli
    const div = document.createElement('div')
    div.className = ('productoEnCarrito')
    div.innerHTML = `
    <h5 class="card-title pt-2 text-center text-primary">${nombre}</h5></br>
    <img id="img" src="${img}" class="card-img-top"></img>
    <p>Precio: $${precio} Cantidad: <span id="cantidad">${cantidad}</span></p>
    <button onclick = 'eliminarDelCarrito(${id})' id="botonEliminar">Eliminar</button>
    `

    contenedorCarrito.append(div)

    localStorage.setItem('carrito', JSON.stringify(carrito))

  })
  contadorCarrito.innerHTML = carrito.length
  precioTotal.innerHTML = carrito.reduce((acc, prod) => acc + (prod.precio * prod.cantidad), 0)
}

//vaciar Carrito
vaciarCarrito.addEventListener('click', () => {
  carrito.length = 0
  actualizarCarrito()
})

const agregarAlArrayCarrito = (peliId) => {
  const existe = carrito.find(peli => peli.id === peliId)//antes carrito.some
  const item = peliculas.find((peli) => peli.id === peliId)//antes nombre item y peliculas.find
  existe ?
    existe.cantidad++
    /*actualizarCarrito()
         Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Ya has agregado esta película!',
          footer: 'Puedes verla las veces que quieras'
        })*/
    :
    carrito.push({ ...item })//item en vez de existe//spreadOperator {...item, cantidad++}una propied mas

  console.log(carrito)
  localStorage.setItem('peli', JSON.stringify(carrito))

  actualizarCarrito()
}


const eliminarDelCarrito = (peliId) => {
  const item = carrito.find((peli) => peli.id === peliId)
  const indice = carrito.indexOf(item)
  carrito.splice(indice, 1)
  actualizarCarrito()
}