//carregando modulos
const fs = require('fs');
const express = require('express');
const path = require('path');
const router = express.Router();

//Acessa os arquivos da pasta de chat do neoo
router.get('/imagens/:file', function (req, res) {
    const { file } = req.params

    const caminho = path.resolve(__dirname, '..', 'fileView', 'img');

    // Envia o arquivo solicitado
    res.sendFile(path.resolve(caminho, file), (err) => {
        if (err) {
            console.error(err);
            res.status(404).send('Arquivo não encontrado');
        }
    });
})

//exporta o router
module.exports = router;