// ! Torna a função 'Modal()' exportável - Assim é possível acessar esta função em qualquer outro arquivo
export function Modal() {

    const modalWrapper = document.querySelector('.modal-wrapper');
    function open(){
        // ? Funcionalidade para atribuir a classe 'active' para a modal
        modalWrapper.classList.add("active")
    }

    function close(){
        // ? Funcionalidade para remover a classe 'active' para a modal
        modalWrapper.classList.remove("active")
    }

    return {
        open,
        close
    }
}