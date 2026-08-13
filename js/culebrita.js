let tablero
let pincel
let tamanoCuadro = 20
let cuadrosPorLado = 20
let culebra
let direccion
let comida
let puntaje = 0
let juegoActivo = false
let idReloj


function iniciarJuego() {
    let pantallaJuego = document.getElementById('pantalla-juego')
    pantallaJuego.style.display = 'none'

    let seccionReiniciar = document.getElementById('reiniciar')
    seccionReiniciar.style.display = 'none'

    tablero = document.getElementById('tablero')
    pincel = tablero.getContext('2d')

    let botonJugar = document.getElementById('boton-jugar')
    botonJugar.addEventListener('click', empezarPartida)

    let botonArriba = document.getElementById('boton-arriba')
    botonArriba.addEventListener('click', irArriba)

    let botonAbajo = document.getElementById('boton-abajo')
    botonAbajo.addEventListener('click', irAbajo)

    let botonIzquierda = document.getElementById('boton-izquierda')
    botonIzquierda.addEventListener('click', irIzquierda)

    let botonDerecha = document.getElementById('boton-derecha')
    botonDerecha.addEventListener('click', irDerecha)

    let botonReiniciar = document.getElementById('boton-reiniciar')
    botonReiniciar.addEventListener('click', reiniciarJuego)

    window.addEventListener('keydown', leerTeclado)
}

function empezarPartida() {
    let pantallaInicio = document.getElementById('pantalla-inicio')
    pantallaInicio.style.display = 'none'
    let pantallaJuego = document.getElementById('pantalla-juego')
    pantallaJuego.style.display = 'flex'

    culebra = [
        { x: 10, y: 10 },
        { x: 9, y: 10 },
        { x: 8, y: 10 }
    ]

    direccion = 'derecha'
    puntaje = 0
    juegoActivo = true
    document.getElementById('puntaje').innerHTML = 'Puntos: ' + puntaje
    document.getElementById('resultado-encuentro').innerHTML = '!🐉! A comer !🐉!'

    colocarComida()

    if (idReloj) {
        clearInterval(idReloj)
    }

    idReloj = setInterval(jugarTurno, 150)
}

function irArriba() {
    cambiarDireccion('arriba')
}

function irAbajo() {
    cambiarDireccion('abajo')
}

function irIzquierda() {
    cambiarDireccion('izquierda')
}

function irDerecha() {
    cambiarDireccion('derecha')
}

function leerTeclado(evento) {
    if (evento.key == 'ArrowUp' || evento.key == 'ArrowDown' || evento.key == 'ArrowLeft' || evento.key == 'ArrowRight') {
        evento.preventDefault()
    }

    if (evento.key == 'ArrowUp') {
        irArriba()
    } else if (evento.key == 'ArrowDown') {
        irAbajo()
    } else if (evento.key == 'ArrowLeft') {
        irIzquierda()
    } else if (evento.key == 'ArrowRight') {
        irDerecha()
    }
}

function cambiarDireccion(nuevaDireccion) {
    if (nuevaDireccion == 'arriba' && direccion == 'abajo') {
        return
    }
    if (nuevaDireccion == 'abajo' && direccion == 'arriba') {
        return
    }
    if (nuevaDireccion == 'izquierda' && direccion == 'derecha') {
        return
    }
    if (nuevaDireccion == 'derecha' && direccion == 'izquierda') {
        return
    }
    direccion = nuevaDireccion
}

function jugarTurno() {
    if (juegoActivo == false) {
        return
    }

    moverCulebra()

    if (revisarChoque() == true) {
        perder()
        return
    }

    if (culebra[0].x == comida.x && culebra[0].y == comida.y) {
        puntaje = puntaje + 1
        document.getElementById('puntaje').innerHTML = 'Puntos: ' + puntaje
        colocarComida()
    } else {
        culebra.pop()
    }

    dibujar()
}

function moverCulebra() {
    let cabeza = culebra[0]
    let nuevaCabeza = { x: cabeza.x, y: cabeza.y }

    if (direccion == 'arriba') {
        nuevaCabeza.y = nuevaCabeza.y - 1
    } else if (direccion == 'abajo') {
        nuevaCabeza.y = nuevaCabeza.y + 1
    } else if (direccion == 'izquierda') {
        nuevaCabeza.x = nuevaCabeza.x - 1
    } else if (direccion == 'derecha') {
        nuevaCabeza.x = nuevaCabeza.x + 1
    }

    culebra.unshift(nuevaCabeza)
}

function revisarChoque() {
    let cabeza = culebra[0]

    if (cabeza.x < 0 || cabeza.x >= cuadrosPorLado || cabeza.y < 0 || cabeza.y >= cuadrosPorLado) {
        return true
    }

    let i = 1
    while (i < culebra.length) {
        if (cabeza.x == culebra[i].x && cabeza.y == culebra[i].y) {
            return true
        }
        i = i + 1
    }

    return false
}

function perder() {
    juegoActivo = false
    clearInterval(idReloj)
    crearMensajeFinal('🤯 Te chocaste. Puntos: ' + puntaje)
}

function crearMensajeFinal(texto) {
    let resultadoEncuentro = document.getElementById('resultado-encuentro')
    resultadoEncuentro.innerHTML = texto

    let seccionReiniciar = document.getElementById('reiniciar')
    seccionReiniciar.style.display = 'flex'
}

function reiniciarJuego() {
    location.reload()
}


function colocarComida() {
    comida = {
        x: aleatorio(0, cuadrosPorLado - 1),
        y: aleatorio(0, cuadrosPorLado - 1)
    }

    let i = 0
    while (i < culebra.length) {
        if (comida.x == culebra[i].x && comida.y == culebra[i].y) {
            colocarComida()
            return
        }
        i = i + 1
    }
}

function dibujar() {
    pincel.clearRect(0, 0, tablero.width, tablero.height)

    // PASO 2 — Comida (sí se pinta: fillRect de un cuadro).
    pincel.fillStyle = '#B31312'
    pincel.fillRect(
        comida.x * tamanoCuadro,
        comida.y * tamanoCuadro,
        tamanoCuadro - 1,
        tamanoCuadro - 1
    )

    // PASO 3 — Culebra: cada eslabón es fillRect (dibujar), nunca clearRect.
    let i = 0
    while (i < culebra.length) {
        if (i == 0) {
            pincel.fillStyle = '#f3d908'
        } else {
            pincel.fillStyle = '#1b4332'
        }
        pincel.fillRect(
            culebra[i].x * tamanoCuadro,
            culebra[i].y * tamanoCuadro,
            tamanoCuadro - 1,
            tamanoCuadro - 1
        )
        i = i + 1
    }
}

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

window.addEventListener('load', iniciarJuego)
