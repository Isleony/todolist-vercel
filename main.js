let form = document.querySelector('#form');
let textInput = document.querySelector('#textInput');
let dateInput = document.querySelector('#dateInput');
let textarea = document.querySelector('#textArea');
let msg = document.querySelector('#msg');
let tasks = document.querySelector('#tarefas');
let add = document.querySelector('#adicionar'); // Corrigido o ID

form.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log("Botão clicado!");
    formValidation();
});

let formValidation = () => {
    if (textInput.value === "") {
        console.log("Falha");
        msg.innerHTML = "Tarefa não pode estar em branco";
    } else {
        console.log("Sucesso");
        msg.innerHTML = "";
        acceptData();
        
        // Fecha o modal corretamente
        let modal = document.querySelector("#formModal"); 
        let bsModal = bootstrap.Modal.getInstance(modal); 
        bsModal.hide();
    }
}

// Inicializa o array de tarefas
let data = [];

// Carregar dados do localStorage ao iniciar a página
window.addEventListener("load", () => {
    data = JSON.parse(localStorage.getItem("data")) || [];
    createTasks();
});

let acceptData = () => {
    // Recarrega os dados antes de adicionar uma nova tarefa
    data = JSON.parse(localStorage.getItem("data")) || [];

    data.push({
        text: textInput.value,
        date: dateInput.value,
        description: textarea.value
    });
    
    localStorage.setItem("data", JSON.stringify(data));
    console.log(data);
    createTasks();
}

let createTasks = () => {   
    tasks.innerHTML = "";  // Corrigido: Limpa corretamente o conteúdo de tarefas antes de adicionar novas

    data.map((x, y) => {
        return (tasks.innerHTML += `
            <div id="${y}">
            <span class="fw-bold">${x.text}</span>  
            <span class="small text-secondary">${x.date}</span>
            <p>${x.description}</p>

            <span class="options">
            <i onClick="editTask(this)" data-bs-toggle="modal" data-bs-target="#formModal" class="fas fa-edit"></i>
            <i onClick="deleteTask(this); createTasks()" class="fas fa-trash-alt"></i>
            </span>
            </div>
        `);
    });
    
    resetForm();
}

let resetForm = () => {
    textInput.value = "";
    dateInput.value = "";
    textarea.value = "";
}

let deleteTask = (e) => {
    e.parentElement.parentElement.remove();
    data.splice(e.parentElement.parentElement.id, 1);
    localStorage.setItem("data", JSON.stringify(data));
    console.log(data);
}

// Corrigido: Agora também atualiza a descrição ao editar, sem excluir a tarefa
let editTask = (e) => {
    let selectedTask = e.parentElement.parentElement;
    textInput.value = selectedTask.children[0].innerHTML;
    dateInput.value = selectedTask.children[1].innerHTML;
    textarea.value = selectedTask.children[2].innerHTML;
}

// (e) é o elemento que vai ser usado.

// É uma propriedade do JavaScript usada para acessar ou modificar o conteúdo HTML dentro de um elemento.
// <span class="fw-bold">${x.text}</span>: O texto armazenado em x.text será exibido dentro de um <span>, e a classe "fw-bold" aplica o estilo de negrito ao texto.
// span -> Texto de única linha.
// p -> Mais de uma linha -> textArea.
// options -> Ícones aqui.
// localStorage.setItem("data", JSON.stringify(data)): Aqui, os dados armazenados na variável data são convertidos em uma string JSON usando JSON.stringify(data) e, em seguida, são armazenados no localStorage com a chave "data". O localStorage permite que os dados sejam salvos no navegador de forma persistente, ou seja, mesmo que a página seja recarregada, os dados continuarão armazenados.
// console.log(data): Isso imprime o conteúdo da variável data no console do navegador, ajudando a visualizar os dados que estão sendo armazenados.
