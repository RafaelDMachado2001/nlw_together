const sqlite3 = require("sqlite3");
const { open } = require("sqlite");

module.exports = () => 
    open({
        // ?-- Define qual o nome do arquivo e onde este arquivo vai ser criado --? //
        filename: './src/database/rocketq.sqlite',
        // !-- 'driver' define qual o banco de dados vai ser utilizado. No caso, sqlite3. Se utilizar outro banco, alterar aqui de acordo com a documentação --! //
        driver: sqlite3.Database
    });