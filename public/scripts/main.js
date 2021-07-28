// ?-- Importa a função 'Modal' de dentro do arquivo 'modal.js' --? //
import { Modal } from './modal.js'

const modal = Modal();
const modalTitle = document.querySelector('.modal h2');
const modalDescription = document.querySelector('.modal p');
const modalButton = document.querySelector('.modal button');

// ?-- Pega todos os botões com a classe 'check' --? //
const checkButtons = document.querySelectorAll(".actions a.check");

checkButtons.forEach(button => { // ?-- Abre a modal --? //
    // Verifica os botões
    button.addEventListener("click", handleClick);
})

// Pega todos os botões com a classe 'cancel'
const cancelButton = document.querySelector(".button.cancel");
// Fecha a modal com o botão 'cancel'
cancelButton.addEventListener("click", ()=> {
    modal.close();
})

// Pega todos os botões com a classe 'delete'
const deleteButton = document.querySelectorAll('.actions a.delete');
// Abre a modal clicando no botão 'Excluir' das perguntas
deleteButton.forEach(button => {
    button.addEventListener("click", (event) => handleClick(event, false));
});

function handleClick(event, check = true) {
    // ?-- Antes de abrir a modal, verifica qual botão foi clicado --? //
    event.preventDefault()
    const text = check ? "Marcar como lida" : "Excluir"
    const slug = check ? "check" : "delete"
    const roomId = document.querySelector("#room-id").dataset.id
    const questionId = event.target.dataset.id

    // Monta a URL com os dados do formulário da modal para excluir ou marcar a pergunta como lida //
    const form = document.querySelector(".modal form")
    form.setAttribute("action", `/question/${roomId}/${questionId}/${slug}`)

    modalTitle.innerHTML = `${text} esta pergunta`
    modalDescription.innerHTML = `Tem certeza que deseja ${text.toLowerCase()} esta pergunta?`
    modalButton.innerHTML = `Sim, ${text.toLowerCase()}`
    check ? modalButton.classList.remove("red") : modalButton.classList.add("red")

    // ! Abre a modal //
    modal.open()
}