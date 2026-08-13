let ataqueJugador
let ataqueOponente
let mascotaJugador = 0
let mascotaOponente = 0
let vidasTotal   = 7
let vidasJugador   = vidasTotal
let vidasOponente  = vidasTotal

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
    let botonAyuda = document.getElementById('boton-ayuda')
    botonAyuda.addEventListener('click', mostrarOcultarAyuda)
    let guiaMokepon = document.getElementById('guia-mokepon')
    guiaMokepon.style.display = 'none'
    document.body.style.backgroundImage = 'url("../assets/fondo.jpg")'; 
    
    canbioFondoEsenario(0)
}

function mostrarOcultarAyuda(){
    let guiaMokepon = document.getElementById('guia-mokepon')
    if (guiaMokepon.style.display == 'none'){
        guiaMokepon.style.display = 'block'
    } else {
        guiaMokepon.style.display = 'none'
    }
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
    
    if (inputRatigueya.checked){
        spanMascotaJugador.innerHTML = 'Ratigueya'
        mascotaJugador = 1
    } else if(inpuHipodoge.checked){
        spanMascotaJugador.innerHTML = 'Hipodoge' 
        mascotaJugador = 2
    } else if(inputCaipego.checked){
        spanMascotaJugador.innerHTML = 'Capipego'
        mascotaJugador = 3
    }else {
        alert('Selecciona una Mascota')
        reiniciarJuego()        
    }

    selecionarMascotaOponente()
    canbioFondoEsenario(1)
    document.getElementById("img-jugador").src=imagenCombate(mascotaJugador);
    document.getElementById('vidas-jugador').innerHTML = pintarVidas(vidasJugador)
    document.getElementById('vidas-oponente').innerHTML = pintarVidas(vidasOponente)

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
    mascotaOponente = mascotaAleatorio
    document.getElementById("img-oponente").src=imagenCombatePc(mascotaAleatorio);
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
        ataqueOponente = 'Tierra'
    }
    conbate()
}

function conbate(){
    let spanVidasJugador = document.getElementById('vidas-jugador')
    let spanVidasOponenete = document.getElementById('vidas-oponente')
    
    if (ataqueJugador == ataqueOponente){
        crearMensaje("EMPATE")
        vidasJugador--
        vidasOponente--
        spanVidasJugador.innerHTML = pintarVidas(vidasJugador)
        spanVidasOponenete.innerHTML = pintarVidas(vidasOponente)
    } else if (ataqueJugador == 'Fuego' && ataqueOponente == 'Tierra' ){
        crearMensaje("GANASTE")
        vidasOponente--
        spanVidasOponenete.innerHTML = pintarVidas(vidasOponente)
    } else if (ataqueJugador == 'Agua' && ataqueOponente == 'Fuego' ){
        crearMensaje("GANASTE")
        vidasOponente--
        spanVidasOponenete.innerHTML = pintarVidas(vidasOponente)
    } else if (ataqueJugador == 'Tierra' && ataqueOponente == 'Agua' ){
        crearMensaje("GANASTE")
        vidasOponente--
        spanVidasOponenete.innerHTML = pintarVidas(vidasOponente)
    }else {
        crearMensaje("PERDISTE")
        vidasJugador--
        spanVidasJugador.innerHTML = pintarVidas(vidasJugador)
    }
    revisarVidas()
}
function revisarVidas(){
    if (vidasJugador == 0 && vidasOponente == 0){
        document.getElementById('img-oponente').src = imagenFueraPc(mascotaOponente)
        document.getElementById('img-jugador').src = imagenFuera(mascotaJugador)
        crearMensajeFinal('🫣¡¡CHOQUE DE TITANES!!🫣') 
    }else if (vidasOponente == 0){
        document.getElementById('img-oponente').src = imagenFueraPc(mascotaOponente)
        crearMensajeFinal('🥳¡VENCISTE A TU OPONENTE!🥳') 
    }else if (vidasJugador == 0){
        document.getElementById('img-jugador').src = imagenFuera(mascotaJugador)
        crearMensajeFinal('-🤯-Tu Oponente te vencio-🤯-')
    }
}
function crearMensaje(partida){
    let resultadoEncuentro = document.getElementById('resultado-encuentro')
    resultadoEncuentro.innerHTML = partida

    let resultadoAtaqueJugador = document.getElementById('ataque-jugador')
    resultadoAtaqueJugador.innerHTML = ataqueJugador
    
    let resultadoAtaqueOponente = document.getElementById('ataque-oponente')
    resultadoAtaqueOponente.innerHTML = ataqueOponente

    let lista = document.getElementById('historial-ataques')
    let linea = document.createElement('p')
    
    linea.innerHTML = ataqueJugador + ' vs ' + ataqueOponente
    lista.appendChild(linea)
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
    imageFondo [0] = '../assets/fondo.png'
    imageFondo [1] = '../assets/escenario_cuadrilatero_1.png'
    imageFondo [2] = '../assets/escenario_cuadrilatero_2.png'
    imageFondo [3] = '../assets/escenario_cuadrilatero_3.png'
    imageFondo [4] = '../assets/escenario_cuadrilatero_4.png'
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
    urlImage [0] = '../assets/ratigueya.png'
    urlImage [1] = '../assets/hipodoge.png'
    urlImage [2] = '../assets/capipego.png'
    if (opcionImagen == 1){
        respuetaImg = urlImage [0] 
    }else if (opcionImagen == 2){
        respuetaImg = urlImage [1]
    }else{
        respuetaImg = urlImage [2]
    }
    return respuetaImg
}

function imagenFuera(opcionImagen){
    let urlImage = []
    let respuetaImg
    urlImage [0] = '../assets/ratigueya_out.png'
    urlImage [1] = '../assets/hipodoge_out.png'
    urlImage [2] = '../assets/capipego_out.png'
    if (opcionImagen == 1){
        respuetaImg = urlImage [0] 
    }else if (opcionImagen == 2){
        respuetaImg = urlImage [1]
    }else{
        respuetaImg = urlImage [2]
    }
    return respuetaImg
}

function imagenCombatePc(opcionImagen){
    let urlImage = []
    let respuetaImg
    urlImage [0] = '../assets/ratigueya_dark.png'
    urlImage [1] = '../assets/hipodoge_dark.png'
    urlImage [2] = '../assets/capipego_dark.png'
    if (opcionImagen == 1){
        respuetaImg = urlImage [0] 
    }else if (opcionImagen == 2){
        respuetaImg = urlImage [1]
    }else{
        respuetaImg = urlImage [2]
    }
    return respuetaImg
}

function imagenFueraPc(opcionImagen){
    let urlImage = []
    let respuetaImg
    urlImage [0] = '../assets/ratigueya_dark_out.png'
    urlImage [1] = '../assets/hipodoge_dark_out.png'
    urlImage [2] = '../assets/capipego_dark_out.png'
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

function pintarVidas(cantidad) {
    let corazones = ''
    let calaveras = ''
    let i = 0
    while (i < cantidad) {
        corazones = corazones + '❤️'
        i++
    }
    while (i < vidasTotal) {
        calaveras = calaveras + '💀'
        i++
    }
    return calaveras + corazones
}

window.addEventListener('load',iniciarJuego)

