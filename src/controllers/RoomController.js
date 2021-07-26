module.exports = {
    create(req, res) {
        let roomId = 1234567
        

        res.redirect(`/room/${roomId}`)
    }
}