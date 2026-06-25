// Chamando o sequelize e conectando ao banco de dados
const Sequelize = require('sequelize');
const db = require('../db/connection');

// Criando o objeto com o que seriam as tabelas no banco
const Job = db.define('job', {
    title: {
        type: Sequelize.STRING,
    },
    description: {
        type: Sequelize.STRING,
    },
    salary: {
        type: Sequelize.STRING,
    },
    company: {
        type: Sequelize.STRING,
    },
    email: {
        type: Sequelize.STRING,
    },
    new_job: {
        type: Sequelize.INTEGER,
    }
});

module.exports = Job