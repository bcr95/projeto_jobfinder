// Chamando o sequelize
const Sequelize = require('sequelize');

// Criando uma instância
const sequelize = new Sequelize({
    // dialect: Qual banco será utilizado
    dialect: 'sqlite',
    // storage: Onde está o banco
    storage: './db/app.db'
});

// Exportando a variável para conexão com o banco
module.exports = sequelize