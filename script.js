//Definición de constantes y variables que usaremos
const fecha = document.querySelector('#fecha')
const input = document.querySelector('#input')
const botonAñadir = document.querySelector('#añadir')
const lista = document.querySelector('#lista')

const check = 'fa-check-circle'
const uncheck = 'fa-circle'
const lineThrough = 'line-through'
let id
//Array que usaremos para almacenar la información
let LIST

//Para que aparezca la fecha
const FECHA = new Date()
fecha.innerHTML = FECHA.toLocaleDateString('es-ES', {weekday:'long', month:'long', day:'numeric', year:'numeric'})

//Función principal para añadir nuestras tareas
function agregarActividad(actividad, id, realizado, eliminado) {
    if(eliminado) {return}
    const REALIZADO = realizado ? check : uncheck
    const LINE = realizado ? lineThrough : ''
    const elemento = ` <li>
                         <i class="far ${REALIZADO}" data="realizado" id="${id}" ></i>
                         <p class="text ${LINE}">${actividad}</p>
                         <i class="fas fa-trash de" data="eliminado" id="${id}"></i>
                       </li>
                      `
    lista.insertAdjacentHTML("beforeend", elemento)                  
}

//Para marcar las  actividades realizadas
function actividadRealizada(element) {
    element.classList.toggle('check')
    element.classList.toggle('uncheck')
    element.parentNode.querySelector('.text').classList.toggle(lineThrough) 
    LIST[element.id].realizado = LIST[element.id].realizado ?false :true           
    
}

//Para eliminar actividades
function actividadEliminada(element) {
    element.parentNode.parentNode.removeChild(element.parentNode)
    LIST[element.id].eliminado = true
}

//Funcionalidad al clickar en el botón de añadir tarea
botonAñadir.addEventListener('click', () => {
    const actividad = input.value 
    if(actividad) {
        agregarActividad(actividad, id, false, false)
        LIST.push({
            nombre: actividad,
            id: id,
            realizado: false,
            eliminado: false
        })

    }
    localStorage.setItem('TODO', JSON.stringify(LIST))
    input.value = ''
    id++
})

//Añadir actividades con pulsar enter
document.addEventListener('keyup', function(event) {
    if(event.key === 'Enter'){
        const actividad = input.value 
        if(actividad){
            agregarActividad(actividad, id, false, false)
            LIST.push({
                nombre: actividad,
                id: id,
                realizado: false,
                eliminado: false
            })
    
        }
        localStorage.setItem('TODO', JSON.stringify(LIST))
        input.value = ''
        id++
    }
})

lista.addEventListener('click', function(event) {
    const element = event.target
    const elementData = element.attributes.data.value

    if(elementData === 'realizado'){
        actividadRealizada(element)
    } else if (elementData === 'eliminado') {
        actividadEliminada(element)
    }
    localStorage.setItem('TODO', JSON.stringify(LIST))
})


let data = localStorage.getItem('TODO')
if(data) {
    LIST = JSON.parse(data)
    id = LIST.length
    cargarLista(LIST)
}else{
    LIST = []
    id = 0
}
function cargarLista(DATA){
    DATA.forEach(function(i){
        agregarActividad(i.nombre, i.id, i.realizado, i.eliminado)
    })
}

