import { Modal } from './modal.js'

const modal = Modal()
const modalTitle = document.querySelector('.modal h2')
const modalDescription = document.querySelector('.modal p');
const modalButton = document.querySelector('.modal button');

// Pega todos os botões com a classe 'check'
const checkButtons = document.querySelectorAll(".actions a.check");
// Abre a modal
checkButtons.forEach(button => {
    // Verifica os botões
    button.addEventListener("click", handleClick)
})

// Pega todos os botões com a classe 'cancel'
const cancelButton = document.querySelector(".button.cancel")
// Fecha a modal com o botão 'cancel'
cancelButton.addEventListener("click", ()=> {
    modal.close()
})

// Pega todos os botões com a classe 'delete'
const deleteButton = document.querySelectorAll('.actions a.delete')
// Abre a modal clicando no botão 'Excluir' das perguntas
deleteButton.forEach(button => {
    button.addEventListener("click", (event) => handleClick(event, false))
})

function handleClick(event, check = true) {
    event.preventDefault()
    const text = check ? "Marcar como lida" : "Excluir"

    modalTitle.innerHTML = `${text} esta pergunta`
    modalDescription.innerHTML = `Tem certeza que deseja ${text.toLowerCase()} esta pergunta?`
    modalButton.innerHTML = `Sim, ${text.toLowerCase()}`
    check ? modalButton.classList.remove("red") : modalButton.classList.add("red")

    // Abrir modal
    modal.open()
}