# Tarea: Mi componente interactivo

## Componente elegido
Registro de tareas interactivo donde el usuario puede agregar tareas con prioridad, marcarlas como completadas o pendientes y eliminarlas dinámicamente de la lista sin recargar la página.

## Codigo principal
```js
class TareaItem {
    constructor(titulo, prioridad) {
        this.titulo = titulo;
        this.prioridad = prioridad || "Normal";
        this.completada = false;
    }

    alternarEstado() {
        this.completada = !this.completada;
    }

    resumen() {
        const estado = this.completada ? "[Hecho]" : "[Pendiente]";
        return `${estado} ${this.titulo} (${this.prioridad})`;
    }
}

const formTarea = document.querySelector("#formTarea");
const inputTarea = document.querySelector("#inputTarea");
const inputPrioridad = document.querySelector("#inputPrioridad");
const listaTareas = document.querySelector("#listaTareas");
const spanPendientes = document.querySelector("#pendientes");
const btnLimpiarHechas = document.querySelector("#btnLimpiarHechas")

const tareas = [
    new TareaItem("Repasar DOM y eventos", "Alta"),
    new TareaItem("Subir lab08 a GitHub Pages", "Media")
];

function actualizarPendientes() {
    const totalPendientes = tareas.filter((t) => !t.completada).length;
    spanPendientes.textContent = totalPendientes;
}

function renderizarTareas() {
    listaTareas.innerHTML = "";

    tareas.forEach((tarea, indice) => {
        const li = document.createElement("li");

        const texto = document.createElement("span");
        texto.textContent = tarea.resumen();
        if (tarea.completada) {
            texto.classList.add("completada");
        }

        const btnMarcar = document.createElement("button");
        btnMarcar.type = "button";
        btnMarcar.textContent = tarea.completada ? "Desmarcar" : "Marcar";
        btnMarcar.addEventListener("click", () => {
            tarea.alternarEstado();
            renderizarTareas();
        });

        const btnBorrar = document.createElement("button");
        btnBorrar.type = "button";
        btnBorrar.textContent = "Borrar";
        btnBorrar.addEventListener("click", () => {
            tareas.splice(indice, 1);
            renderizarTareas();
        });

        li.appendChild(texto);
        li.appendChild(btnMarcar);
        li.appendChild(btnBorrar);
        listaTareas.appendChild(li);
    });

    actualizarPendientes();
}

formTarea.addEventListener("submit", (evento) => {
    evento.preventDefault();
    const tituloLimpio = inputTarea.value.trim();
    const prioridadLimpia = inputPrioridad.value.trim();

    if (tituloLimpio === "") {
        return;
    }

    const nuevaTarea = new TareaItem(tituloLimpio, prioridadLimpia);
    tareas.push(nuevaTarea);
    inputTarea.value = "";
    inputPrioridad.value = "";
    renderizarTareas();
});

btnLimpiarHechas.addEventListener("click", ()=>{
    tareas = tareas.filter(tarea=>!tarea.completada);
    renderizarTareas();
})

renderizarTareas();
```

## Pruebas realizadas

| Accion | Resultado esperado | Cumple (Si/No) |
|--------|--------------------|----------------|
| Enviar formulario con nueva tarea y prioridad | Se crea el objeto TareaItem, aparece en la lista sin recargar y aumenta el contador de pendientes | Si |
| Hacer clic en Marcar sobre una tarea | Cambia su estado con alternarEstado(), tacha el texto y disminuye el contador de pendientes | Si |
| Hacer clic en Borrar sobre una tarea | Elimina el elemento del arreglo y lo quita del DOM inmediatamente | Si |
| Hacer clic en Limpiar hechas con tareas completadas | Filtra las tareas completadas con filter(), actualiza tareas y redibuja la lista dejando solo las pendientes | Si |

## Por que disene asi mi clase
Elegí los atributos `titulo`, `prioridad` y `completada` porque representan la información esencial de cada tarea y permiten controlar si sigue pendiente o ya fue realizada. Asimismo, definí los métodos `alternarEstado()` y `resumen()` para encapsular el cambio de estado y el formato de texto que se muestra en pantalla.
