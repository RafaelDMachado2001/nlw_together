const Database = require('./config')

const initDb = {
    async init(){
        const db = await Database()

        await db.exec(`CREATE TABLE rooms (
            id INT PRIMARY KEY,
            pass VARCHAR(255)
        )`);

        await db.exec(`CREATE TABLE questions (
            id INT PRIMARY KEY AUTO_INCREMENT,
            title VARCHAR(255),
            check INT
        )`)
    }
}

initDb.init()

