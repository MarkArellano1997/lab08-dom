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