const Database = require('../database/config')

module.exports = {
    async index(req, res) {
        const db = await Database()
        // Variáveis da questão
        const roomId = req.params.room
        const questionId = req.params.question
        const action = req.params.action
        const password = req.body.password
    
        const verifyRoom = await db.get(`SELECT * FROM rooms WHERE id = ${roomId}`)
        if(verifyRoom.pass === password){
            if(action == "delete"){
                await db.run(`DELETE FROM questions WHERE id = ${questionId}`)
            } else if(action == "check"){
                await db.run(`UPDATE questions SET read = 1 WHERE id = ${questionId}`)
            }
            res.redirect(`/room/${roomId}`)
        } else {
            res.render('passincorret', {roomId: roomId})
        }

        await db.close()
    },

    async create(req, res) {
        const db = await Database()
        const question = req.body.question
        const roomId = req.params.room

        await db.run(`INSERT INTO questions (title, read, room) VALUES ("${question}", 0, ${roomId})`)

        await db.close()

        res.redirect(`/room/${roomId}`)
    }
}