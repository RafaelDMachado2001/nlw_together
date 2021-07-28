const Database = require('../database/config')

module.exports = {
    async index(req, res) {
        const db = await Database()
        // * Busca e armazena as variáveis da sala * //
        const roomId = req.params.room // ?-- ID da sala --? //
        const questionId = req.params.question // ?-- ID da questão --? //
        const action = req.params.action // ?-- Ação realizada pelos botões em 'actions' no HTML --? //
        const password = req.body.password // ?-- Senha de administrador da sala - Utilizada para excluir ou marcar como lida uma questão --? //
    
        // ?-- Busca a sala --? //
        const verifyRoom = await db.get(`SELECT * FROM rooms WHERE id = ${roomId}`) // ?-- Retorna todas as questões que estão criadas na sala com o ID buscado --? //
        if(verifyRoom.pass === password){ // !-- Verifica se a senha de administrador da sala está correta
            if(action == "delete"){ // ! Verifica qual a ação do botão
                await db.run(`DELETE FROM questions WHERE id = ${questionId}`) // ! Exclui a pergunta
            } else if(action == "check"){
                await db.run(`UPDATE questions SET read = 1 WHERE id = ${questionId}`) // ! Marca a questão como lida
            }
            res.redirect(`/room/${roomId}`) // Redireciona para a sala com o ID especificado
        } else {
            res.render('passincorret', {roomId: roomId}) // Redireciona para a página com o alerta de que a senha está incorreta
        }
        
        await db.close() // ?-- Fecha a conexão com o banco de dados (Boas práticas) --? //
    },

    // * CRIA A QUESTÃO * //
    async create(req, res) {
        const db = await Database() // Faz a comunicação com o BD
        const question = req.body.question // ? Busca o ID da questão
        const roomId = req.params.room // ? Busca o ID da sala

        await db.run(`INSERT INTO questions (title, read, room) VALUES ("${question}", 0, ${roomId})`) // ! Faz o cadastro da questão dentro do banco de dados

        await db.close() // ? Fecha a conexão com o banco de dados (Boas práticas)

        res.redirect(`/room/${roomId}`) // ? Redireciona para a página após finalizar o cadastro da questão
    }
}