import { Modal } from './modal.js'

const modal = Modal()

// Pega todos os botões com a classe 'check'
const checkButtons = document.querySelectorAll(".actions a.check");
// Abre a modal
checkButtons.forEach(button => {
    // Verifica os botões
    button.addEventListener("click", event => {
        modal.open()
    })
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
    button.addEventListener("click", event => {
        modal.open()
    })
})