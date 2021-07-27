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
            const roomsExist = await db.all(`SELECT id FROM rooms`)
            let isRoom = roomsExist.some(roomExistID => roomExist === roomId)
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
    }
};