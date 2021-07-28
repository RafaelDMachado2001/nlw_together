// Variável para acessar o banco de dados
const Database = require("../database/config");

// 'module.exports' torna todo o trecho de código subsequente exportável e acessível nos demais arquivos do projeto
module.exports = {
    // 'async' é o parâmetro necessário para tornar a função 'paciente'. Ele funciona em conjunto com o parâmetro 'awai' dentro do código, que tem a função de ordenar a execução do código. Ou seja, quando tiver o 'awai' antes do parâmetro, o Javascript irá executar completamente aquele trecho antes de passar para a próxima linha, evitando erros de inicialização já que estamos utilizando funções para enviar informações para o BD
    async create(req, res) {
        const db = await Database();
        // 'Pega' a senha de administrador cadastrada para criar a sala
        const pass = req.body.password;
        let roomId;
        let isRoom = true

        while(isRoom){
            // Laço que cria randômicamente o número para a sala criada
                for(var i = 0; i  < 6; i++){
                    i == 0 ? roomId = Math.floor(Math.random() * 10).toString() : roomId += Math.floor(Math.random() * 10).toString();
                };

            // Verifica se o número da sala já existe
            const roomsExistIds = await db.all(`SELECT id FROM rooms`)
            isRoom = roomsExistIds.some(roomExistId => roomExistId === roomId)
            
            if(!isRoom){
                // Faz a inserção da sala dentro do BD
                await db.run(`INSERT INTO rooms (
                    id,
                    pass
                ) VALUES (
                    ${parseInt(roomId)},
                    ${pass}
                )`);    
            }
        }
        
        // Fecha o banco de dados
        await db.close();
        // Redireciona o usuário para a sala com o ID criado
        res.redirect(`/room/${roomId}`);
    }, 

    // Função para criar a sala com o ID dinâmico
    async open(req, res){
        const db = await Database();
        // Coleta o número da sala pela URL
        const roomId = req.params.room
        const questions = await db.all(`SELECT * FROM questions WHERE room = ${roomId} and read = 0`)
        const questionsRead = await db.all(`SELECT * FROM questions WHERE room = ${roomId} and read = 1`)
        let isNoQuestions
        if(questions.length == 0){
            if(questionsRead.length == 0){
                isNoQuestions = true
            }
        }

        db.close()
        // Renderiza a sala já com o número dinâmico criado
        res.render("room", {roomId: roomId, questions: questions, questionsRead: questionsRead, isNoQuestions: isNoQuestions})
    },

    // Função para entrar em uma sala já criada
    enter(req, res) {
        const roomId = req.body.roomId

        // Redireciona o usuário para a página existente
        res.redirect(`/room/${roomId}`)
    }

}