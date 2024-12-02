let ataqueJugador
let ataqueOponente
let vidasJugador   = 3
let vidasOponente  = 3

function iniciarJuego(){
    
    let sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
    sectionSeleccionarAtaque.style.display = 'none'
    let sectionReiniciar = document.getElementById('reiniciar')
    sectionReiniciar.style.display = 'none'
    let botonMascotaJugador = document.getElementById('boton-mascotas')
    botonMascotaJugador.addEventListener('click',selecionarMascotaJugador)
    let botonFuego = document.getElementById('boton-fuego')
    botonFuego.addEventListener('click',ataqueFuego)
    let botonAgua = document.getElementById('boton-agua')
    botonAgua.addEventListener('click',ataqueAgua)
    let botonTierra = document.getElementById('boton-tierra')
    botonTierra.addEventListener('click',ataqueTierra)
    let botonReiniciar = document.getElementById('boton-reiniciar')
    botonReiniciar.addEventListener('click',reiniciarJuego)
    document.body.style.backgroundImage = 'url("./assets/fondo.jpg")'; 
    
    canbioFondoEsenario(0)
}

function selecionarMascotaJugador(){
    let sectionSeleccionarMascota = document.getElementById('seleccionar-mascota')
    sectionSeleccionarMascota.style.display = 'none' 
    let sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
    sectionSeleccionarAtaque.style.display = 'flex' 
    
    let inputRatigueya = document.getElementById('ratigueya')
    let inpuHipodoge = document.getElementById('hipodoge')
    let inputCaipego = document.getElementById('capipego')
    let spanMascotaJugador = document.getElementById('mascota-jugador')
    let mascotaTurno
 
    if (inputRatigueya.checked){
        spanMascotaJugador.innerHTML = 'Ratigueya'
        mascotaTurno = 1
    } else if(inpuHipodoge.checked){
        spanMascotaJugador.innerHTML = 'Hipodoge' 
        mascotaTurno = 2
    } else if(inputCaipego.checked){
        spanMascotaJugador.innerHTML = 'Capipego'
        mascotaTurno= 3
    }else {
        alert('Selecciona una Mascota')
        reiniciarJuego()        
    }
    selecionarMascotaOponente()
    canbioFondoEsenario(1)
    document.getElementById("img-jugador").src=imagenCombate(mascotaTurno);

}
function selecionarMascotaOponente(){
    let mascotaAleatorio = aleatorio(1,3)
    let spanMascotaOponente = document.getElementById('mascota-oponente')
 
    if(mascotaAleatorio == 1){
        spanMascotaOponente.innerHTML = 'Ratigueya'
    }else if (mascotaAleatorio == 2){
        spanMascotaOponente.innerHTML = 'Hipodoge'
    }else {
        spanMascotaOponente.innerHTML = 'Capipego'
    }

    document.getElementById("img-oponente").src=imagenCombate(mascotaAleatorio);
}

function ataqueFuego(){
    ataqueJugador = 'Fuego'
    ataqueAleatoreoOponete()
}
function ataqueAgua(){
    ataqueJugador = 'Agua'
    ataqueAleatoreoOponete()
}
function ataqueTierra(){
    ataqueJugador = 'Tierra'
    ataqueAleatoreoOponete()
}
function ataqueAleatoreoOponete(){
    let ataqueAleatorio = aleatorio(1,3)
    
    if (ataqueAleatorio == 1){
        ataqueOponente = 'Fuego'
    }else if (ataqueAleatorio == 2){
        ataqueOponente = 'Agua'
    }else {
        ataqueOponente = 'Tierra '
    }
    conbate()
}
function conbate(){
    let spanVidasJugador = document.getElementById('vidas-jugador')
    let spanVidasOponenete = document.getElementById('vidas-oponente')
    
    if (ataqueJugador == ataqueOponente){
        crearMensaje("EMPATE")
    } else if (ataqueJugador == 'Fuego' && ataqueOponente == 'Tierra' ){
        crearMensaje("GANASTE")
        vidasOponente--
        spanVidasOponenete.innerHTML = vidasOponente    
    } else if (ataqueJugador == 'Agua' && ataqueOponente == 'Fuego' ){
        crearMensaje("GANASTE")
        vidasOponente--
        spanVidasOponenete.innerHTML = vidasOponente    
    } else if (ataqueJugador == 'Tierra' && ataqueOponente == 'Agua' ){
        crearMensaje("GANASTE")
        vidasOponente--
        spanVidasOponenete.innerHTML = vidasOponente    
    }else {
        crearMensaje("PERDISTE")
        vidasJugador--
        spanVidasJugador.innerHTML = vidasJugador    
    }
    revisarVidas()
}
 function revisarVidas(){
    if (vidasOponente == 0){
        crearMensajeFinal('🥳¡VENCISTE A TU OPONENTE!🥳') 
    }else if (vidasJugador == 0){
        crearMensajeFinal('🤯Tu Oponente te vencio🤯')        
    }
 }
function crearMensaje(partida){
    let resultadoEncuentro = document.getElementById('resultado-encuentro')
    resultadoEncuentro.innerHTML = partida

    let resultadoAtaqueJugador = document.getElementById('ataque-jugador')
    resultadoAtaqueJugador.innerHTML = ataqueJugador
    
    let resultadoAtaqueOponente = document.getElementById('ataque-oponente')
    resultadoAtaqueOponente.innerHTML = ataqueOponente
}
function crearMensajeFinal(resultadoFinal){
    let sectionMensajes = document.getElementById('mensajes-resultado')
    let resultadoEncuentro = document.getElementById('resultado-encuentro')
    let parrafo = document.createElement('p')
    resultadoEncuentro.innerHTML = resultadoFinal
    sectionMensajes.appendChild(parrafo)

    let botonFuego = document.getElementById('boton-fuego')
    botonFuego.disabled = true
    let botonAgua = document.getElementById('boton-agua')
    botonAgua.disabled = true
    let botonTierra = document.getElementById('boton-tierra')
    botonTierra.disabled = true
    let sectionReiniciar = document.getElementById('reiniciar')
    sectionReiniciar.style.display = 'flex'
}

function reiniciarJuego(){
    location.reload()
}

function canbioFondoEsenario(opcion){
    let imageFondo = []
    let opcionAleatorea
    imageFondo [0] = './assets/fondo.png'
    imageFondo [1] = './assets/escenario_cuadrilatero_1.png'
    imageFondo [2] = './assets/escenario_cuadrilatero_2.png'
    imageFondo [3] = './assets/escenario_cuadrilatero_3.png'
    imageFondo [4] = './assets/escenario_cuadrilatero_4.png'
    opcionAleatorea = aleatorio(1, 4)
     if (opcion == 1){
       document.body.style.backgroundImage = 'url("'+imageFondo [opcionAleatorea]+'")'; 
     }else{
        document.body.style.backgroundImage = 'url("'+imageFondo [0]+'")'; 
    }
}

function imagenCombate(opcionImagen){
    let urlImage = []
    let respuetaImg
    urlImage [0] = './assets/ratigueya.png'
    urlImage [1] = './assets/hipodoge.png'
    urlImage [2] = './assets/capipego.png'
    if (opcionImagen == 1){
        respuetaImg = urlImage [0]
    }else if (opcionImagen == 2){
        respuetaImg = urlImage [1]
    }else{
        respuetaImg = urlImage [2]
    }
    return respuetaImg
}

function aleatorio(min, max){
    return Math.floor(Math.random()*(max - min + 1 )+min)
}

window.addEventListener('load',iniciarJuego)

