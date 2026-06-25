// Criando o servidor com express
const express = require('express');
const exphbs = require('express-handlebars');
const app = express();

// Chamando o path para localizar os diretórios internos
const path = require('path');

// Chamando o sequelize para realizar a busca
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

// Importando os jobs
const Job = require('./models/Job');

// Chamando o 'corpo' da requisição
const bodyParser = require('body-parser');

// Chamando o banco de dados
const db = require('./db/connection');

// Definindo a porta
const PORT = 3001;

// "Escutando" a porta
app.listen(PORT, function() {
    console.log(`O Express está rodando na porta ${PORT}`);
});

// body parser
app.use(bodyParser.urlencoded({ extended: false }));

// ----- handle bars ----- //
// Definindo onde estão as views
app.set('views', path.join(__dirname, 'views'));
// Definindo o arquivo principal do layout
app.engine('handlebars', exphbs.engine({defaultLayout: 'main'}));
// Dizendo ao express qual framework para visualização das views
app.set('view engine', 'handlebars');

// static folder
app.use(express.static(path.join(__dirname, 'public')));

// db connection
db
    .authenticate()
    .then(() => {
        console.log("Conectou ao banco com sucesso");
    })
    .catch(err => {
        console.log("Ocorreu um erro ao conectar", err);
    });

// Trazendo os jobs
app.get('/', (req, res) => {

    let search = req.query.job;
    let query = '%'+search+'%';

    if(!search) {
        Job.findAll({order: [
            ['createdAt', 'DESC']
        ]})
        .then(jobs => {
            res.render("index", {
                jobs
            });
        })
        .catch(err => console.log(err));
    } else {
        Job.findAll({
            where: {title: {[Op.like]: query}},
            order: [
            ['createdAt', 'DESC']
        ]})
        .then(jobs => {
            console.log(search);

            res.render("index", {
                jobs, search
            });
        })
        .catch(err => console.log(err));
    }
    
});

// Rotas jobs
app.use('/jobs', require('./routes/jobs'));