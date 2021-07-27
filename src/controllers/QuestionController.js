module.exports = {
    index(req, res){
        // Variáveis da questão
        const roomId = req.params.room
        const questionId = req.params.question
        const action = req.params.action
        const password = req.body.password
    
        console.log(`room = ${roomId}, questionID = ${questionId}, action = ${action}, password = ${password}`)
    }
}