const express = require('express');
// Objeto de rotas do express
const router = express.Router();
// Importando o model
const Job = require('../models/Job');

// Rota de teste
router.get('/test', (req, res) => {
    res.send('Deu certo');
});

// Detalhe da vaga
router.get('/view/:id', (req, res) => Job.findOne({
    where: {id: req.params.id}
}).then(job => {
    res.render('view', {
        job
    });
}).catch(err => console.log(err)));

// Form da rota de envio
router.get('/add', (req, res) => {
    res.render('add');
});

// Adicionando o job via POST
router.post('/add', (req, res) => {
    // Recebendo os dados necessários para adicionar ao banco através do 'corpo' da requisição
    let {title, salary, company, description, email, new_job} = req.body;

    // Inserir dados no sistema
    Job.create({
        title,
        description,
        salary,
        company,
        email,
        new_job
    })
    .then(() => res.redirect('/'))
    .catch(err => console.log(err));
});

module.exports = router;
